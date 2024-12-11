const OpenButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    className="p-2 rounded-full text-gray-500 bg-white hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
    aria-label="Open"
    onClick={onClick}
  >
     <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
  </button>
);

export default OpenButton;
