import React from "react";
import { WikiResultProps } from "../types";
import Pagination from "./Paginate";

interface Props {
  result: WikiResultProps["query"]["search"];
  metadata: WikiResultProps["query"]["searchinfo"];
  searchQuery: string;
  setPage: (page: number) => void;
  currentPage: number;
  toggleSideBar: () => void;
}
export default function SearchResults({
  result,
  metadata,
  searchQuery,
  setPage,
  currentPage,
  toggleSideBar
}: Props) {
  const wikiUrl = "https://en.wikipedia.org/wiki?curid=";
  return (
    <div className="w-full overflow-auto">
      <div className="sticky top-0 bg-white z-10 p-3 shadow flex items-center gap-4">
        <button onClick={toggleSideBar} className="block md:hidden">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        Wiki <span className="text-gray-400">/</span> {searchQuery}
      </div>
      <div className="p-3">
        {result.length > 0 && metadata.totalhits > 0 && (
          <Pagination
            perPage={10}
            currentPage={currentPage}
            totalCount={metadata.totalhits}
            setPage={setPage}
          />
        )}
        {result.length > 0 &&
          result.map((info) => {
            return (
              <div className="mt-3 pb-3 border-b border-gray-100">
                <span className="text-green-700">
                  {wikiUrl}
                  {info.pageid}
                </span>
                <h4>
                  <a
                    target="_blank"
                    className="text-xl text-[#0000EE]"
                    href={`${wikiUrl}${info.pageid}`}
                    rel="noreferrer"
                  >
                    {info.title}
                  </a>
                </h4>
                <p className="mt-1">
                  <pre
                    className="word-break"
                    dangerouslySetInnerHTML={{
                      __html: info.snippet,
                    }}
                  />
                </p>
              </div>
            );
          })}
        {result.length <= 0 && <div className="italic">No data available</div>}
      </div>
    </div>
  );
}
