import React from "react";
import { IResultComponentProps } from "./props/IResultComponent.props";
import sanitize from "sanitize-html";

export default function ResultComponent({ data }: IResultComponentProps) {
  const wikiUrl = "https://en.wikipedia.org/wiki?curid=";

  return (
    <div key={data.pageid} className="mt-3 pb-3 border-b border-gray-100">
      <span className="text-green-700">
        {wikiUrl}
        {data.pageid}
      </span>
      <h4>
        <a
          target="_blank"
          className="text-xl text-[#0000EE]"
          href={`${wikiUrl}${data.pageid}`}
          rel="noreferrer"
        >
          {data.title}
        </a>
      </h4>
        <pre
          className="word-break mt-1"
          dangerouslySetInnerHTML={{
            __html: sanitize(data.snippet),
          }}
        />
    </div>
  );
}
