const AddFloatingButton = () => (
  <button
    className="flex items-center justify-center w-14 h-14 bg-cyan-700 text-white hover:bg-gray-200 rounded-full shadow-xl border-4 border-gray"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  </button>
);

export default AddFloatingButton;
