import clsx from "clsx";
import React, { useState } from "react";
import SearchIcon from "./SearchIcon";

interface Props {
  className?: string;
  onSubmit: (search: string) => void;
}
export default function Searchbar({ className, onSubmit }: Props) {
  const [search, setSearch] = useState("");
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(search);
        setSearch("")
      }}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <SearchIcon />
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Something"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </form>
  );
}
