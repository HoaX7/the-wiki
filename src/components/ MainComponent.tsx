import { useEffect, useState } from "react";
import { WikiResultProps } from "../types";
import { searchWiki } from "../api";
import Sidebar from "../layout/Sidebar";
import Wikipage from "./Wikipage";
import SearchResults from "./SearchResults";

export default function MainComponent() {
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [results, setResults] = useState<WikiResultProps | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [showSearch, setShowSearch] = useState(false)
    const [toggleSideBar, setToggleSideBar] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem("history")
            if (item) {
                setSearchHistory(JSON.parse(item))
            }
        }
    }, [])
  
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
      localStorage.setItem("history", JSON.stringify(res))
    };

    const reset = () => {
        setShowResults(false)
        setResults(null)
        setToggleSideBar(false)
    }

    const handleSetPage = (page: number) => {
        setCurrentPage(page)
        handleSearch(query, ((page - 1) * 10))
    }
    return (
      <div className="App h-full">
        <div className="flex h-full">
          <Sidebar
            history={searchHistory}
            search={query}
            toggleSearch={handleSearch}
            reset={reset}
            setShowSearch={setShowSearch}
            showSearch={showSearch}
            toggleSideBar={toggleSideBar}
          />
          {showResults ? (
            <SearchResults
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              onSearch={handleSearch}
              result={results?.query?.search || []}
              metadata={results?.query?.searchinfo || { totalhits: 0 }}
              searchQuery={query}
              setPage={handleSetPage}
              currentPage={currentPage}
              toggleSideBar={() => {
                setToggleSideBar(!toggleSideBar)
              }}
            />
          ) : <Wikipage
          onSearch={handleSearch}
        />}
        </div>
      </div>
    );
  }