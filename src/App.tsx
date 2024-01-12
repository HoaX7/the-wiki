import React, { useState } from "react";
import "./App.css";
import Logo from "./components/Logo";
import Sidebar from "./layout/Sidebar";
import Wikipage from "./components/Wikipage";
import { searchWiki } from "./api";
import SearchResults from "./components/SearchResults";
import { WikiResultProps } from "./types";
import Searchbar from "./components/Searchbar";

function App() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [results, setResults] = useState<WikiResultProps | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [showSearch, setShowSearch] = useState(false)
  const [toggleSideBar, setToggleSideBar] = useState(false)

  const handleSearch = async (text: string, offset = 0) => {
    if (offset <= 0) setCurrentPage(1)
    try {
      setQuery(text);
      const resp = await searchWiki(text, offset);
      setResults(resp);
      if (!showResults) setShowResults(true)
      if (toggleSideBar) setToggleSideBar(false)
    } catch (err) {
      alert("Unknown error occured, please try again");
      console.error("Search error:", err);
    }
    const res = [...searchHistory];
    if (res.length >= 10) {
      res.splice(0, 1);
    }
    const idx = res.findIndex((t) => t === text);
    if (idx < 0) res.push(text);
    setSearchHistory(res);
  };
  return (
    <div className="App h-full">
      {/* <Logo /> */}
      <div className="flex h-full">

      {showSearch && (
            <div className='absolute rounded -translate-x-[50%] left-[50%] z-20 shadow-lg top-40 w-[300px] md:w-[400px]'>
                <Searchbar onSubmit={(text) => {
                    handleSearch(text)
                    setShowSearch(false)
                }} />
            </div>
        )}
        <Sidebar
          history={searchHistory}
          search={query}
          toggleSearch={handleSearch}
          reset={() => {
            setShowResults(false)
            setResults(null)
            setToggleSideBar(false)
          }}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
          toggleSideBar={toggleSideBar}
        />
        {!showResults && (
          <Wikipage
            onSearch={handleSearch}
          />
        )}
        {showResults && (
          <SearchResults
            result={results?.query?.search || []}
            metadata={results?.query?.searchinfo || { totalhits: 0 }}
            searchQuery={query}
            setPage={(page) => {
              setCurrentPage(page)
              handleSearch(query, ((page - 1) * 10))
            }}
            currentPage={currentPage}
            toggleSideBar={() => {
              setToggleSideBar(!toggleSideBar)
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
