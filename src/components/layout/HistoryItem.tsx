import clsx from "clsx";
import React from "react";
import { IHistoryItemProps } from "./props/IHistoryitem.props";


export default function HistoryItem({ text, search, toggleSearch }: IHistoryItemProps) {
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
