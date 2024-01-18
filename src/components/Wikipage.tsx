import React from "react";
import Logo from "./Icons/Logo";
import Searchbar from "./Searchbar";
import { IWikipageProps } from "./IWikipage.props";

export default function Wikipage({ onSearch }: IWikipageProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full">
        <div>
          <Logo size="large" className="justify-center" />
        </div>
        <div className="w-full flex justify-center">
            <div className="w-2/3 md:w-1/2">
                <Searchbar onSubmit={onSearch} />
                <p className="text-sm text-gray-500 mt-2">
                    Search for anything on the wiki
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
