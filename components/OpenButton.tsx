import React, { Dispatch, SetStateAction } from 'react';

const OpenButton = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

  return (
    <button
      className="relative group"
      onClick={()=>setOpen(!open)}
    >
      <div
        className={`relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-cyan-700 ring-0 ring-gray-300 ${
          open ? 'ring-4' : 'hover:ring-8'
        } ring-opacity-30 duration-100 shadow-md`}
      >
        <div
          className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden`}
        >
          <div
            className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
              open ? 'translate-x-10' : ''
            }`}
          ></div>
          <div
            className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${
              open ? 'translate-x-10 delay-75' : ''
            }`}
          ></div>
          <div
            className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
              open ? 'translate-x-10 delay-150' : ''
            }`}
          ></div>

          <div
            className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
              open ? 'translate-x-0' : '-translate-x-10'
            } flex w-0 ${open ? 'w-12' : ''}`}
          >
            <div
              className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 ${
                open ? 'rotate-45 delay-300' : 'rotate-0'
              }`}
            ></div>
            <div
              className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 ${
                open ? '-rotate-45 delay-300' : '-rotate-0'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default OpenButton;

