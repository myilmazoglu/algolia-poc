"use client";

import algoliasearch from "algoliasearch/lite";
import { useState } from "react";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import Hit from "./hit";
import EmptyQueryBoundary from "./empty";

const searchClient = algoliasearch("", "");

//for customization refer to -> https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/

export default function App() {
  return (
    <div className="flex justify-center w-full h-[100vh] ">
      <div className="w-[500px] h-[100px] bg-slate-100 p-2 flex flex-col justify-center">
        <InstantSearch
          searchClient={searchClient}
          indexName="book"
          insights={true}
        >
          <SearchBox
            placeholder="Book name"
            classNames={{
              form: "flex justify-center  ",
              input: "border border-slate-200 w-full p-2 ",
            }}
            queryHook={(query, search) => {
              search(query);
            }}
            resetIconComponent={() => {
              return null;
            }}
            submitIconComponent={() => {
              return null;
            }}
          />

          <EmptyQueryBoundary fallback={null}>
            <Hits
              className="absolute top-[70px] overflow-auto h-80"
              hitComponent={(hit: any) => {
                return <Hit hit={hit}></Hit>;
              }}
            />
          </EmptyQueryBoundary>
        </InstantSearch>
      </div>
    </div>
  );
}
