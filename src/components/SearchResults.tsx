import React, { useCallback } from "react";
import Pagination from "./Paginate";
import Searchbar from "./Searchbar";
import { ISearchResultProps } from "./ISearchResults.props";
import { WindowEvent } from "./Hooks/WindowEvent";

export default function SearchResults({
  result,
  metadata,
  searchQuery,
  setPage,
  currentPage,
  toggleSideBar,
  showSearch,
  setShowSearch,
  onSearch,
}: ISearchResultProps) {
  const wikiUrl = "https://en.wikipedia.org/wiki?curid=";

  const callback = useCallback(() => {
    if (showSearch) setShowSearch(false);
  }, []);

  WindowEvent("mousedown", callback);

  return (
    <div className="w-full overflow-auto relative">
      {showSearch && (
        <div className="absolute rounded -translate-x-[50%] left-[50%] z-20 shadow-lg top-40 w-[300px] md:w-[400px]">
          <Searchbar
            onSubmit={(text) => {
              onSearch(text);
              setShowSearch(false);
            }}
          />
        </div>
      )}
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
