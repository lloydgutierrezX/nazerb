import { useEffect, useState } from "react";
import { useSearhContext } from "../../../services/context/search/SearchContext";
import { useDebounce } from "../../../services/hooks/useDebounce";

export const Search = () => {
  const searchContext = useSearhContext();
  const [searchValue, setSearchValue] = useState(searchContext.value);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    searchContext.tableGlobalFilter?.(debouncedSearchValue);
  }, [debouncedSearchValue, searchContext]);

  return (
    <div className="flex items-center justify-between w-full">
      <input
        type="search"
        placeholder={searchContext.placeholder || "Search here..."}
        onChange={(e) => setSearchValue(e.target.value)}
        className="input input-bordered w-full focus:border-none"
      />
    </div>
  );
};
