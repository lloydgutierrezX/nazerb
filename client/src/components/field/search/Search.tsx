import { useEffect, useState } from "react";
import { useSearhContext } from "Services/contexts/SearchContext";
import { useDebounce } from "Services/hooks/DebounceHooks";

interface ISearch extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  // ... add input attribute here...
}

export const Search: React.FC<ISearch> = ({ ...props }) => {
  const searchContext = useSearhContext();
  const [searchValue, setSearchValue] = useState(searchContext.value);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    searchContext.tableGlobalFilter?.(debouncedSearchValue);
  }, [debouncedSearchValue, searchContext]);

  return (
    <div className="flex items-center justify-between w-full">
      <input
        {...props}
        type="search"
        placeholder={searchContext.placeholder || "Search here..."}
        onChange={(e) => setSearchValue(e.target.value)}
        className="input input-bordered w-full focus:border-none"
      />
    </div>
  );
};
