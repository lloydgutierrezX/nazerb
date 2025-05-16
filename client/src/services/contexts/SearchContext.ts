import { createContext, useContext } from "react";

export const SearchContext = createContext<{
  placeholder: string;
  value: string;
  tableGlobalFilter?: (value: string) => void;
} | undefined>(undefined);

export function useSearhContext() {
  const searchContext = useContext(SearchContext);

  if (searchContext === undefined) {
    throw new Error('useSearhContext must be used with a SearchContext');
  }

  return searchContext;
}