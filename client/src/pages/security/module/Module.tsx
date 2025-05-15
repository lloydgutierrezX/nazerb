import { ColumnDef } from "@tanstack/react-table";

import { IData } from "Pages/IData";

import { DataTable } from "Components/datatable/DataTable";
import { ITableConfig } from "Components/datatable/IDatatable";
import { Dialog } from "Components/modal/dialog/Dialog";
import { Form, IFormField } from "Components/field/Form";
import { moduleSchema } from "./ModuleSchema";

import moment from "moment";
import {
  addModule,
  getAllModules,
  IModulePostRequest,
  updateModule,
} from "./ModuleActions";
import { useQuery } from "@tanstack/react-query";
import { useDialogContext } from "Services/contexts/DialogContext";

// Columns
const columnDef: ColumnDef<IData, string>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info: { getValue: () => string }) => info.getValue(),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: (info: { getValue: () => string }) =>
      moment(info.getValue()).format("MMM DD, YYYY"),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: (info: { getValue: () => string }) =>
      moment(info.getValue()).format("MMM DD, YYYY"),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
    enableGlobalFilter: false,
  },
];

const config: ITableConfig = {
  module: "module",
  serverSide: false,
  permissions: {
    search: {
      isAllowed: true,
      placeholder: "Search",
    },
    add: {
      isAllowed: true,
      placeholder: "Add module",
      popover: "Add new module",
    },
    delete: {
      isAllowed: true,
      placeholder: "Delete",
      popover: "Delete this module?",
    },
    update: {
      isAllowed: true,
      placeholder: "Edit",
      popover: "Update this module?",
    },
  },
  filters: {
    date: [
      {
        name: "created_at",
        placeholder: "Date Created",
      },
      {
        name: "updated_at",
        placeholder: "Last Update",
      },
    ],
  },
};

const formFields: IFormField[] = [
  {
    type: "toggle",
    placeholder: "Toggle this to turn on/off this module",
    name: "active",
    value: true,
    className: "justify-end",
    containerClassName: "flex flex-row gap-2",
    defaultChecked: true,
    label: "Is Actve?",
    labelClassName: "w-full justify-end",
  },
  {
    type: "text",
    placeholder: "Input the module name",
    name: "name",
    label: "Module Name",
    labelClassName: "w-full",
    value: "",
    className: "",
  },
];

export const Module = () => {
  const { data, isFetching, refetch } = useQuery({
    queryFn: getAllModules,
    queryKey: ["getModules"],
  });

  const { dialog } = useDialogContext();

  return (
    <>
      <Dialog>
        <Form
          formFields={formFields}
          schema={moduleSchema}
          moduleName="Module"
          apiUrl="/modules"
          data={dialog.data}
          onAddFn={(url: string, data: unknown) =>
            addModule({ url, data } as IModulePostRequest)
          }
          onUpdateFn={(url: string, data: unknown) =>
            updateModule({ url, data } as IModulePostRequest)
          }
        />
      </Dialog>

      <DataTable
        data={data?.data ?? []}
        columnDef={columnDef}
        config={config}
        isFetching={isFetching}
        refetch={refetch}
      />
    </>
  );
};
