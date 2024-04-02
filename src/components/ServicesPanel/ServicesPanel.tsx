import React, { useState, Fragment, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ScheduleEventByGCal from './ScheduleEventByGCal';
import SendMessageByGmail from './SendMessageByGmail';

const users = [
  { name: 'Olga Vasylieva', address: "vasylieva@gmail.com" },
  { name: 'Stefan Vasylieva', address: "stefan.vv@gmail.com" },
  { name: 'Stef Vasylieva', address: "vas.stef@gmail.com" },
  { name: 'Olga Vasylieva', address: "vasylieva@gmail.com" },
  { name: 'Stefan Vasylieva', address: "stefan.vv@gmail.com" },
];

const ServicesPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('');

  const changeTab = useCallback((val: string) => {
    setActiveTab(val)
  }, [])

  return (
    <div className="pb-5 pt-7.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full xl:w-1/2 flex flex-col justify-between">
      <h4 className="mb-6 px-5 sm:px-7.5 text-xl font-semibold text-black dark:text-white">
        services
      </h4>
      <div className="px-5 sm:px-7.5">
        <ul className='flex flex-col gap-3'>
          <li className='flex flex-col gap-4 p-4 border rounded-lg border-black'>
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="flex items-center gap-4">
                <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.42969 27.1836V13.3164L0.421875 7.16406V24.2539C0.421875 26.207 1.39844 27.1836 3.35156 27.1836" fill="#4285F4" />
                  <path d="M8.03906 13.2188L18 20.7383L27.9609 13.2188V3.64844L18 11.168L8.03906 3.64844" fill="#EA4335" />
                  <path d="M27.5703 27.1836V13.3164L35.5781 7.16406V24.2539C35.5781 26.207 34.6016 27.1836 32.6484 27.1836" fill="#34A853" />
                  <path d="M0.421875 7.35935L8.42969 13.5117V3.94138L5.5 1.69529C2.86328 -0.355491 0.421875 1.69529 0.421875 4.23435" fill="#C5221F" />
                  <path d="M35.5781 7.35935L27.5703 13.5117V3.94138L30.5 1.69529C33.1367 -0.355491 35.5781 1.69529 35.5781 4.23435" fill="#FBBC04" />
                </svg>
                <span className='text-xl font-normal'>gmail</span>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                    actions
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-[150px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        <button onClick={() => changeTab("sendMessage")} className='flex w-full items-center gap-2  p-2 text-sm'>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M7.06557 9.24179L15.2379 1.07242M7.29787 9.60917L9.15096 13.3154C9.5988 14.211 9.82269 14.6589 10.1048 14.779C10.3496 14.8832 10.6294 14.8643 10.858 14.7282C11.1214 14.5713 11.2832 14.0975 11.6068 13.1498L15.1081 2.89593C15.3901 2.07024 15.531 1.65738 15.4346 1.38427C15.3506 1.14668 15.1637 0.959791 14.9262 0.87585C14.653 0.77936 14.2402 0.920335 13.4145 1.20228L3.16055 4.70362C2.21291 5.02721 1.73909 5.189 1.58224 5.45241C1.44612 5.68101 1.42726 5.96084 1.53147 6.20559C1.65156 6.48767 2.09938 6.71164 2.99502 7.1594L6.70124 9.01257C6.84885 9.08637 6.92265 9.12322 6.98652 9.1725C7.0433 9.21628 7.09417 9.26714 7.13786 9.32384C7.18722 9.38779 7.22408 9.46159 7.29787 9.60917Z" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          send message
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button onClick={() => changeTab("")} className='flex w-full items-center gap-2  p-2 text-sm'>
                          hide
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className={`${activeTab === 'sendMessage' ? "block" : "hidden"}`}>
              <SendMessageByGmail />
            </div>
          </li>
          <li className='flex flex-col gap-4 p-4 border rounded-lg border-black'>
            <div className="w-full flex items-center gap-3 justify-between">
              <div className="flex items-center gap-4">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M22.8949 7.10522H7.10547V22.8947H22.8949V7.10522Z" fill="white" />
                  <path d="M22.8945 30L29.9998 22.8947L26.4472 22.2886L22.8945 22.8947L22.2461 26.1443L22.8945 30Z" fill="#EA4335" />
                  <path d="M0 22.8947V27.6316C0 28.9401 1.05987 30 2.36842 30H7.10526L7.83479 26.4473L7.10526 22.8947L3.23428 22.2886L0 22.8947Z" fill="#188038" />
                  <path d="M29.9998 7.10526V2.36842C29.9998 1.05987 28.9399 0 27.6314 0H22.8945C22.4622 1.76201 22.2461 3.05872 22.2461 3.89012C22.2461 4.72152 22.4622 5.79324 22.8945 7.10526C24.466 7.55525 25.6502 7.78025 26.4472 7.78025C27.2441 7.78025 28.4284 7.55525 29.9998 7.10526Z" fill="#1967D2" />
                  <path d="M29.9998 7.10522H22.8945V22.8947H29.9998V7.10522Z" fill="#FBBC04" />
                  <path d="M22.8949 22.8948H7.10547V30H22.8949V22.8948Z" fill="#34A853" />
                  <path d="M22.8947 0H2.36842C1.05987 0 0 1.05987 0 2.36842V22.8947H7.10526V7.10526H22.8947V0Z" fill="#4285F4" />
                  <path d="M10.3428 19.354C9.75267 18.9553 9.34412 18.3731 9.12109 17.6033L10.4908 17.0389C10.6152 17.5126 10.8323 17.8797 11.1421 18.1402C11.45 18.4007 11.825 18.529 12.2632 18.529C12.7112 18.529 13.0961 18.3928 13.4178 18.1205C13.7395 17.8481 13.9014 17.5007 13.9014 17.0803C13.9014 16.6501 13.7316 16.2987 13.3921 16.0264C13.0527 15.754 12.6264 15.6178 12.1171 15.6178H11.3257V14.2619H12.0362C12.4744 14.2619 12.8435 14.1435 13.1435 13.9066C13.4435 13.6698 13.5935 13.3461 13.5935 12.9336C13.5935 12.5665 13.4593 12.2744 13.1908 12.0553C12.9224 11.8362 12.5829 11.7257 12.1704 11.7257C11.7678 11.7257 11.4481 11.8323 11.2112 12.0474C10.9745 12.2631 10.7966 12.5355 10.6941 12.8389L9.3382 12.2744C9.5178 11.7652 9.84741 11.3152 10.331 10.9264C10.8145 10.5376 11.4323 10.3422 12.1823 10.3422C12.7369 10.3422 13.2362 10.4487 13.6783 10.6639C14.1204 10.879 14.4678 11.177 14.7185 11.556C14.9691 11.9369 15.0935 12.3632 15.0935 12.8369C15.0935 13.3205 14.977 13.729 14.7441 14.0645C14.5112 14.4001 14.225 14.6566 13.8856 14.8362V14.9172C14.3239 15.0979 14.7047 15.3947 14.9869 15.7757C15.2731 16.1606 15.4171 16.6205 15.4171 17.1573C15.4171 17.6941 15.281 18.1737 15.0086 18.5941C14.7362 19.0145 14.3593 19.3461 13.8816 19.5869C13.402 19.8277 12.8632 19.9501 12.2652 19.9501C11.5724 19.952 10.9329 19.7527 10.3428 19.354ZM18.7566 12.5566L17.2527 13.6441L16.5007 12.5033L19.1987 10.5573H20.2329V19.7369H18.7566V12.5566Z" fill="#4285F4" />
                </svg>
                <span className='text-xl font-normal'>google calendar</span>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                    actions
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-[150px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        <button onClick={() => changeTab("scheduleEvent")} className='flex w-full items-center gap-2  p-2 text-sm'>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M4.55556 7.22222H13.4444M4.55556 10.7778H9M4.55556 1V2.77778M13.4444 1V2.77778M3.84444 17H14.1556C15.1512 17 15.6491 17 16.0293 16.8062C16.3638 16.6358 16.6358 16.3638 16.8062 16.0293C17 15.6491 17 15.1512 17 14.1556V5.62222C17 4.62657 17 4.12875 16.8062 3.74846C16.6358 3.41395 16.3638 3.14198 16.0293 2.97155C15.6491 2.77778 15.1512 2.77778 14.1556 2.77778H3.84444C2.8488 2.77778 2.35097 2.77778 1.97068 2.97155C1.63617 3.14198 1.3642 3.41395 1.19377 3.74846C1 4.12875 1 4.62657 1 5.62222V14.1556C1 15.1512 1 15.6491 1.19377 16.0293C1.3642 16.3638 1.63617 16.6358 1.97068 16.8062C2.35097 17 2.84879 17 3.84444 17Z" stroke="#64748B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          schedule event
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button onClick={() => changeTab("")} className='flex w-full items-center gap-2  p-2 text-sm'>
                          hide
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className={`${activeTab === 'scheduleEvent' ? "block" : "hidden"}`}>
              <ScheduleEventByGCal />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ServicesPanel;