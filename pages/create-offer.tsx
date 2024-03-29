import { useState } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Button } from "@mui/material";
import ReactHtmlParser from 'react-html-parser';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
  box-sizing: border-box;
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default function HomePage() {
    const [openAIResponse, setOpenAIResponse] = useState<string>('');
    const [textareaContent, setTextareaContent] = useState<string>('Generate an offer for the event with Drake with emojis and time milestones');

    const fetchResponse = async () => {
        try {

            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: `${openAIResponse ? `Previous answer: '${openAIResponse}' my comment: '${textareaContent}'` : textareaContent}`,
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from OpenAI API');
            }

            const data = await response.json();
            console.log(data)

            setOpenAIResponse(data.choices[0].text)
        } catch (error) {
            console.error('Error:', error);
            setOpenAIResponse('Error occurred');
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">OpenAI Chat</h1>
            <div className="flex flex-col items-center">
                <Textarea defaultValue="Hi, how are you?" value={textareaContent} aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" onChange={(e) => setTextareaContent(e.target.value)} />
                <Button onClick={fetchResponse} className="bg-blue-500 text-white px-4 py-2 rounded-md">Generate Text</Button>
                <p>{ReactHtmlParser(openAIResponse)}</p>
            </div>
        </main>
    );
}
