import clsx from "clsx";
import React from "react";

interface Props {
  search: string;
  text: string;
  toggleSearch: (text: string) => void;
}
export default function HistoryItem({ text, search, toggleSearch }: Props) {
  return (
    <li
      className={clsx(
        "px-5 py-1 cursor-pointer mt-1 hover:bg-gray-200",
        search === text ? "bg-gray-200" : ""
      )}
      onClick={() => {
        toggleSearch(text);
      }}
      style={{
        wordBreak: "break-all",
      }}
    >
      {text}
    </li>
  );
}
