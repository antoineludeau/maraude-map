import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import type { Feature } from "@/types/geometry";

const Search = ({
  setFeature,
}: {
  setFeature: (searchResult: Feature | null) => void;
}) => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Feature[]>([]);
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSelectResult = (searchResult: Feature) => {
    const label = searchResult.properties.label;
    setSearch(label);
    setFeature(searchResult);
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearch("");
    setFeature(null);
    setSearchResults([]);
  };

  useEffect(() => {
    (async () => {
      if (debouncedSearch.length > 3) {
        const params = new URLSearchParams({ q: debouncedSearch }).toString();
        console.log(`https://data.geopf.fr/geocodage/search/?${params}`);
        const responseRaw = await fetch(
          `https://data.geopf.fr/geocodage/search/?${params}`
        );
        const response = await responseRaw.json();
        const features = response.features;
        if (features && features.length > 0) {
          setSearchResults(features);
          return;
        }
      }
      setSearchResults([]);
    })();
  }, [debouncedSearch]);

  return (
    <div className="max-w-md mx-auto z-10 w-[300px]">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="block w-full p-4 ps-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-cyan-500"
          placeholder="Enter an address"
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg">
        {searchResults.map((searchResult, index) => (
          <div
            key={index}
            className="p-2 border border-gray-200 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleSelectResult(searchResult)}
          >
            {searchResult?.properties?.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
