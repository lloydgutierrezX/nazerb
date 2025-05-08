import { HeaderGroup } from "@tanstack/react-table";
import { Icon } from "../icon/Icon";
import { IData } from "../../pages/IData";

export const TableHeader = (props: {
  headerGroups: () => HeaderGroup<IData>[];
}) => {
  return (
    <thead>
      {props.headerGroups().map((headerGroup) => {
        return (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer"
                      : "cursor-default"
                  }
                >
                  <div
                    className="flex items-center text-center gap-1"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <span>
                      {typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                    </span>
                    <div className="flex flex-col items-center">
                      <Icon
                        icon="chevronup"
                        color={`${
                          header.column.getIsSorted() === "asc"
                            ? "#000000"
                            : "#aeaeae"
                        }`}
                        classNames="w-3 h-3"
                      />
                      <Icon
                        icon="chevrondown"
                        color={`${
                          header.column.getIsSorted() === "desc"
                            ? "#000000"
                            : "#aeaeae"
                        }`}
                        classNames="w-3 h-3"
                      />
                    </div>
                  </div>
                </th>
              );
            })}
            <th className="cursor-default text-center">Actions</th>
          </tr>
        );
      })}
    </thead>
  );
};
