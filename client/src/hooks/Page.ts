import { createContext, useContext } from "react";

export const PageContext = createContext<string | undefined>(undefined);

export function usePageContext() {
  const curPage = useContext(PageContext);

  if (curPage === undefined) {
    throw new Error('usePageContext must be used with a PageContext');
  }

  return curPage;
}