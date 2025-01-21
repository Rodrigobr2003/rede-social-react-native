import React, { createContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchResults: any[];
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
  searchBar: any;
  setSearchBar: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchBar, setSearchBar] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <SearchContext.Provider
      value={{ searchResults, setSearchResults, searchBar, setSearchBar }}
    >
      {children}
    </SearchContext.Provider>
  );
};
