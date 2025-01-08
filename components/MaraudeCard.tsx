import Image from "next/image";
import { Maraude } from "@/types/maraude";

const MaraudeCard = ({
  maraude,
  isCompact,
}: {
  maraude: Maraude;
  isCompact?: boolean;
}) => (
  <div>
    <Image
      className="rounded-t-lg"
      src={maraude.image}
      alt="maraude image preview"
      width={600}
      height={400}
    />
    <div className="p-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {maraude.name}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {maraude.description}
      </p>
      {isCompact && (
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800"
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
      )}
      {!isCompact && (
        <div className="flex flex-col">
          <div>{maraude.date}</div>
          <div>{maraude.mail}</div>
          <div>{maraude.tel}</div>
          <div>{maraude.link}</div>
        </div>
      )}
    </div>
  </div>
);

export default MaraudeCard;
