import React from "react";
import SearchItem from "./searchItem";

type Props = { results: Array<object> };

function Results({ results }: Props) {
  return (
    <div className="flex flex-col space-y-4 pt-4 px-3">
      {results.map((result: any) => {
        return (
          <>
            <SearchItem
              image={result.image}
              name={result.name}
              username={result.username}
              key={result._id}
            />
          </>
        );
      })}
    </div>
  );
}

export default Results;
