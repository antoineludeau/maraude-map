"use client";

const Loading = () => (
    <svg
      className="w-16 h-16 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle
        className="opacity-75"
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="126.92"
        strokeDashoffset="63.46"
      />
    </svg>
);
export default Loading;
