import React, { useCallback } from "react";
import Pagination from "./Paginate";
import Searchbar from "./Searchbar";
import { ISearchResultProps } from "./ISearchResults.props";
import { WindowEvent } from "./Hooks/WindowEvent";
import ResultComponent from "./ResultComponent";
import MenuIcon from "./Icons/MenuIcon";

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
  const callback = useCallback(() => {
    if (showSearch) setShowSearch(false);
  }, [showSearch]);

  WindowEvent("mousedown", callback);

  const search = (text: string) => {
    onSearch(text);
    setShowSearch(false);
  }

  /**
   * The wiki API only supports up to 1000 pages.
   */
  if (metadata.totalhits > 9999) {
    metadata.totalhits = 9999
  }

  return (
    <div className="w-full overflow-auto relative">
      {showSearch && (
        <div className="absolute rounded -translate-x-[50%] left-[50%] z-20 shadow-lg top-40 w-[300px] md:w-[400px]">
          <Searchbar
            onSubmit={search}
          />
        </div>
      )}
      <div className="sticky top-0 bg-white z-10 p-3 shadow flex items-center gap-4">
        <MenuIcon toggle={toggleSideBar} />
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
            return <ResultComponent key={info.pageid} data={info} />;
          })}
        {result.length <= 0 && <div className="italic">No data available</div>}
      </div>
    </div>
  );
}
