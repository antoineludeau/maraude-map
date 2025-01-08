const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    className="flex items-center justify-center w-8 h-8 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
    aria-label="Close"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export default CloseButton;
