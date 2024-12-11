import { Maraude } from "@/types/maraude";
import CloseButton from "@/components/CloseButton";

import Image from "next/image";
import OpenButton from "@/components/OpenButton";

const MaraudeList = ({
  maraudes,
  menuOpen,
  setMenuOpen,
  selectedMaraudeID,
  onSelect,
  onHover,
  setEditMode,
}: {
  maraudes: Maraude[];
  menuOpen: boolean;
  setMenuOpen: (state: boolean) => void;
  selectedMaraudeID: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  setEditMode: (state: boolean) => void;
}) => {
  return (
    <>
      <div
        className={`absolute top-0 left-0 h-full bg-white shadow-lg transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } w-sm overflow-y-auto z-10`}
      >
        <div className="absolute top-4 right-4">
          <CloseButton onClick={() => setMenuOpen(false)} />
        </div>
        <div className="absolute top-4 right-20 rounded-full bg-gray-200">
          <button className="p-2" onClick={() => setEditMode(true)}>
            Add Maraude
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Maraudes</h2>
          <div>
            {maraudes.map((maraude) => (
              <div
                key={maraude.id}
                className={`max-w-sm bg-white rounded-lg shadow p-2 mb-2 hover:bg-gray-100 ${
                  maraude.id === selectedMaraudeID ? "bg-gray-100" : ""
                }`}
                onClick={() => onSelect(maraude.id)}
                onMouseEnter={() => onHover(maraude.id)}
                onMouseLeave={() => onHover(null)}
              >
                <a href="#">
                  <Image
                    className="rounded-t-lg"
                    src={maraude.image}
                    alt="maraude image preview"
                    width={600}
                    height={400}
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {maraude.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {maraude.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    More Info
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!menuOpen && (
        <div className="absolute top-4 left-4 z-10">
          <OpenButton onClick={() => setMenuOpen(true)} />
        </div>
      )}
    </>
  );
};

export default MaraudeList;
