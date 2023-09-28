"use client";

import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";

const searchClient = algoliasearch("", "");

export default function App() {
  return (
    <div className="flex justify-center w-full">
      <div>
        <InstantSearch
          searchClient={searchClient}
          indexName="book"
          insights={true}
        >
          <SearchBox />
          <Hits
            hitComponent={(hit: any) => {
              console.log(hit);
              return (
                <>
                  <p className="text-red">{hit.hit.book_name}</p>
                  <p className="text-red">{hit.hit.author}</p>
                </>
              );
            }}
          />
        </InstantSearch>
      </div>
    </div>
  );
}
