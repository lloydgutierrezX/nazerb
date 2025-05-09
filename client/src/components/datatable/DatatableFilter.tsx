import { Row } from "@tanstack/react-table";
import { IData } from "../../pages/IData";
import { Search } from "../fields/search/Search";
import { SearchContext } from "../../services/context/search/SearchContext";

export const DatatableFilter = (props: {
  filterRowModel: () => {
    rows: Row<IData>[];
  };
  setGlobalFilter: (value: string) => void;
  searchPlaceholder?: string;
}) => {
  const providerValue = {
    placeholder: props.searchPlaceholder || "Search here...",
    value: "",
    tableGlobalFilter: (value: string) => {
      props.setGlobalFilter(value);
    },
  };

  return (
    <SearchContext.Provider value={providerValue}>
      <div className="flex items-center justify-between py-4 w-1/3">
        <Search />
      </div>
    </SearchContext.Provider>
  );
};
