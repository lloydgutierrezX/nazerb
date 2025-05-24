import { Row } from "@tanstack/react-table";
import { Search } from "Components/field/search/Search";
import { SearchContext } from "Services/contexts/SearchContext";
import { DynamicObject } from "Utils/globalInterface";

export const DatatableFilter = (props: {
  filterRowModel: () => {
    rows: Row<DynamicObject>[];
  };
  setGlobalFilter: (value: string) => void;
  searchPlaceholder?: string;
  disabled?: boolean;
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
        <Search disabled={props.disabled} />
      </div>
    </SearchContext.Provider>
  );
};
