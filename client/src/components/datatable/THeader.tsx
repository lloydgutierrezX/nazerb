import { HeaderGroup } from "@tanstack/react-table";
import { Icon } from "Components/icon/Icon";
import { DynamicObject } from "Utils/globalInterface";

export const DataTableHeader = (props: {
  headerGroups: () => HeaderGroup<DynamicObject>[];
  showLoading: boolean;
}) => {
  return (
    <thead>
      {props.headerGroups().map((headerGroup) => {
        return (
          <tr key={headerGroup.id} className="bg-gray-200">
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer "
                      : "cursor-default "
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
                        icon="chevron-up"
                        color={`${
                          header.column.getIsSorted() === "asc"
                            ? "#000000"
                            : "#aeaeae"
                        }`}
                        classNames="w-3 h-3"
                      />
                      <Icon
                        icon="chevron-down"
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
            <th className="cursor-default text-center w-20">Actions</th>
          </tr>
        );
      })}

      {props.showLoading && (
        <tr>
          <td
            className="table-td-loading"
            colSpan={props.headerGroups()[0].headers.length + 1}
          >
            <div className="loading-line"></div>
          </td>
        </tr>
      )}
    </thead>
  );
};
