import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatGPT: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<Message[]>([]);
  const [copyStatus, setCopyStatus] = useState<string>("copy");

  useEffect(() => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'ru-RU';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    setRecognition(recognition);
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const handleMessageSubmit = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);

    const newUserMessage: Message = { text: inputText, sender: 'user' };
    setHistory(prevHistory => [...prevHistory, newUserMessage]);
    setInputText('');


    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt: history?.length ? `answer: ${history.slice(-1).map(message => message.text).join('\n')}. my comment: ${inputText}` : inputText,
        max_tokens: 1000,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const botResponse = data.choices[0].text.trim();
      const newBotMessage: Message = { text: botResponse, sender: 'bot' };
      setHistory(prevHistory => [...prevHistory, newBotMessage]);
    } else {
      console.error('Ошибка получения ответа от OpenAI API');
    }
    setIsLoading(false);
  };

  const handleCopy = (text: string) => {
    setCopyStatus("copied!")
    navigator.clipboard.writeText(text)
    setTimeout(() => {
      setCopyStatus("copy")
    }, 1000)
  }

  return (
    <div className="col-span-12 pb-5 pt-7.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6 flex flex-col justify-between">
      <h4 className="mb-6 px-5 sm:px-7.5 text-xl font-semibold text-black dark:text-white">
        your openai
      </h4>

      <div className="px-5 sm:px-7.5">
        {!!history?.length && <div className="flex-1 flex flex-col overflow-y-auto py-2 gap-4 max-h-[500px]">
          {history.map((message, index) => (
            <div key={index} className={`w-full flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <p className={`relative group block w-auto max-w-[80%] rounded-md overflow-auto p-3 ${message.sender === 'user' ? 'bg-black text-white' : 'bg-[#f0f4f6] text-[#04072b]'}`}>
                {message.text}
                <button className="absolute p-1 rounded-md top-1 right-1 text-xs hidden group-hover:flex items-center text-black gap-1 focus:outline-none bg-[#ffffffdb]" onClick={() => handleCopy(message.text)}>
                  <svg width="40" height="44" viewBox="0 0 40 44" fill="none" className='w-3 h-3'>
                    <path d="M8 19.6666C8 14.0098 8 11.1813 9.75736 9.42399C11.5147 7.66663 14.3431 7.66663 20 7.66663H26C31.6568 7.66663 34.4852 7.66663 36.2426 9.42399C38 11.1813 38 14.0098 38 19.6666V29.6666C38 35.3234 38 38.1518 36.2426 39.9092C34.4852 41.6666 31.6568 41.6666 26 41.6666H20C14.3431 41.6666 11.5147 41.6666 9.75736 39.9092C8 38.1518 8 35.3234 8 29.6666V19.6666Z" stroke="#1C274C" strokeWidth="3" />
                    <path d="M8 35.6666C4.6863 35.6666 2 32.9804 2 29.6666V17.6666C2 10.1241 2 6.35293 4.34314 4.00977C6.6863 1.66663 10.4575 1.66663 18 1.66663H26C29.3138 1.66663 32 4.35293 32 7.66663" stroke="#1C274C" strokeWidth="3" />
                  </svg>
                  {copyStatus}
                </button>
              </p>
            </div>
          ))}
        </div>}
        <div className="flex items-center gap-2 pt-3">
          <TextField
            label="message chatgpt…"
            className="resize-none w-full"
            multiline
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex flex-col gap-1 justify-between">
            <button
              onClick={startListening}
              className={`w-9 h-9 p-2 flex items-center justify-center ${isListening ? 'bg-red' : 'bg-green-500'} text-white rounded-full hover:bg-red-600`}
            >
              {isListening ?
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M16.668 31.6667C24.9522 31.6667 31.668 24.951 31.668 16.6667C31.668 8.38242 24.9522 1.66669 16.668 1.66669C8.3837 1.66669 1.66797 8.38242 1.66797 16.6667C1.66797 24.951 8.3837 31.6667 16.668 31.6667Z" stroke="white" strokeWidth="3" />
                  <path d="M10.668 16.6667C10.668 13.8383 10.668 12.424 11.5467 11.5454C12.4253 10.6667 13.8396 10.6667 16.668 10.6667C19.4964 10.6667 20.9106 10.6667 21.7893 11.5454C22.668 12.424 22.668 13.8383 22.668 16.6667C22.668 19.4951 22.668 20.9093 21.7893 21.788C20.9106 22.6667 19.4964 22.6667 16.668 22.6667C13.8396 22.6667 12.4253 22.6667 11.5467 21.788C10.668 20.9093 10.668 19.4951 10.668 16.6667Z" stroke="white" strokeWidth="3" />
                </svg> :
                <svg width="23" height="30" viewBox="0 0 23 30" fill="none">
                  <path d="M22.4694 13.7755C22.4694 13.0836 21.9122 12.5265 21.2204 12.5265C20.5286 12.5265 19.9714 13.0836 19.9714 13.7755C19.9714 18.0612 16.0531 21.5449 11.2347 21.5449C6.41633 21.5449 2.49796 18.0612 2.49796 13.7755C2.49796 13.0836 1.94082 12.5265 1.24898 12.5265C0.557143 12.5265 0 13.0836 0 13.7755C0 19.053 4.37755 23.4122 9.98571 23.9816V27.502H8.54082C7.84898 27.502 7.29184 28.0591 7.29184 28.751C7.29184 29.4428 7.84898 30 8.54082 30H13.9286C14.6204 30 15.1775 29.4428 15.1775 28.751C15.1775 28.0591 14.6204 27.502 13.9286 27.502H12.4837V23.9816C18.0918 23.4122 22.4694 19.053 22.4694 13.7755Z" fill="white" />
                  <path d="M11.237 19.1327C14.3594 19.1327 16.888 16.6041 16.888 13.4816V5.65102C16.888 2.52857 14.3594 0 11.237 0C8.11451 0 5.58594 2.52857 5.58594 5.65102V13.4816C5.58594 16.6041 8.11451 19.1327 11.237 19.1327ZM8.03492 5.65102C8.03492 3.88776 9.47369 2.44898 11.237 2.44898C13.0002 2.44898 14.439 3.88776 14.439 5.65102V13.4816C14.439 15.2449 13.0002 16.6837 11.237 16.6837C9.47369 16.6837 8.03492 15.2449 8.03492 13.4816V5.65102Z" fill="white" />
                </svg>}
            </button>
            <button
              onClick={handleMessageSubmit}
              className={`w-9 h-9 p-2 flex items-center justify-center bg-black text-white rounded-md hover:bg-black ${isLoading ? 'cursor-not-allowed pointer-events-none opacity-70' : ''}`}
            >
              {isLoading ? <div className="animate-spin h-5 w-5 rounded-full border-4 border-solid border-white border-t-transparent"></div> :
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M14.4664 19.8375L31.9786 2.33167M14.9642 20.6247L18.9351 28.5667C19.8948 30.4859 20.3745 31.4455 20.979 31.7028C21.5036 31.9262 22.1032 31.8856 22.5931 31.594C23.1576 31.2579 23.5042 30.2425 24.1976 28.2118L31.7004 6.23918C32.3047 4.46984 32.6067 3.58516 32.4 2.99992C32.22 2.4908 31.8196 2.09032 31.3106 1.91044C30.7252 1.70368 29.8406 2.00577 28.0712 2.60993L6.09849 10.1128C4.06785 10.8062 3.05252 11.1529 2.71641 11.7174C2.42473 12.2072 2.38431 12.8068 2.60762 13.3313C2.86495 13.9358 3.82457 14.4157 5.7438 15.3752L13.6857 19.3463C14.002 19.5044 14.1601 19.5834 14.297 19.689C14.4187 19.7828 14.5277 19.8918 14.6213 20.0133C14.7271 20.1503 14.8061 20.3085 14.9642 20.6247Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;