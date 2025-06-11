import { ColumnDef } from "@tanstack/react-table";
import { ITableConfig } from "Components/datatable/IDatatable";
import { DataTable } from "Components/datatable/Table";
import { FormGroup } from "Components/field/FormGroup";
import { IAction, IBaseFormGroupField } from "Components/field/IForm";

import { ConfirmDialog } from "Components/modal/confirm/Confirm";
import { Dialog } from "Components/modal/dialog/Dialog";
import moment from "moment";
<<<<<<< HEAD
=======
import { moduleSchema } from "Pages/security/module/ModuleSchema";
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
import { useEffect, useState } from "react";
import {
  IConfirmDialogContent,
  ConfirmDialogContext,
} from "Services/contexts/ConfirmDialogContext";
import { useDialogContext } from "Services/contexts/DialogContext";
import { FormContext } from "Services/contexts/FormContext";
import { DynamicObject } from "Utils/globalInterface";
import {
  useGetAllTask,
  getAllTaskKey,
  addTask,
  updateTask,
  deleteTask,
  retrieveTask,
<<<<<<< HEAD
} from "./TaskActions";
import { ITaskInput } from "./ITask";
import { Icon } from "Components/icon/Icon";
import { TaskSchema } from "./TaskSchema";
=======
} from "./TaskAction";
import { ITaskInput } from "./ITask";
import { Icon } from "Components/icon/Icon";
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb

// ColumnsDef: for react-table column display
const columnDef: ColumnDef<DynamicObject, string>[] = [
  {
    accessorKey: "name", // key
    header: "Name", // header name
    cell: (info: { getValue: () => string }) => info.getValue(),
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: (info: { getValue: () => string }) => {
      const active = !!info.getValue() === true;
      return (
        <div
          className={`badge min-w-[50px] xs:min-w-[150px] justify-start ${
            active ? "badge-success" : "badge-soft badge-error"
          }`}
        >
          {active ? (
            <>
              <Icon icon="toggle-right" classNames="" />
              <span className="md:block hidden text-nowrap">Active</span>
            </>
          ) : (
            <>
              <Icon icon="toggle-left" classNames="text-nowrap" />
              <span className="md:block hidden text-nowrap">Not Active</span>
            </>
          )}
        </div>
      );
    },
    enableSorting: true,
    sortUndefined: -1,
    sortDescFirst: false,
    enableGlobalFilter: false,
  },
<<<<<<< HEAD
=======
  // {
  //   accessorKey: "description", // key
  //   header: "Description", // header name
  //   cell: (info: { getValue: () => string }) => info.getValue(),
  //   enableSorting: true,
  //   sortUndefined: -1,
  //   sortDescFirst: false,
  // },
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
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

// Config for the datatable view
const config: ITableConfig = {
<<<<<<< HEAD
  module: "Task",
=======
  module: "task",
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
  serverSide: false,
  permissions: {
    search: {
      isAllowed: true,
      placeholder: "Search",
    },
    add: {
      isAllowed: true,
      placeholder: "Add Task",
<<<<<<< HEAD
      popover: "Add new Task?",
=======
      popover: "Add new Task",
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
    },
    delete: {
      isAllowed: true,
      placeholder: "Delete",
      popover: "Delete this Task?",
    },
    update: {
      isAllowed: true,
      placeholder: "Edit",
      popover: "Update this Task?",
    },
  },
};

const formGroupFields: IBaseFormGroupField[] = [
  {
    name: "active",
    className: "flex flex-row w-full text-left content-center",
    label: {
      className: "w-full justify-end",
      value: "Is Actve?",
    },
    field: {
      type: "checkbox",
      className: "flex dirc checkbox",
<<<<<<< HEAD
      placeholder: "Toggle this to turn on/off this Task",
=======
      placeholder: "Toggle this to turn on/off this module",
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
    },
    error: {
      className: "text-left",
    },
  },
  {
    name: "name",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Name",
    },
    field: {
      type: "text",
      className: "input w-full",
      placeholder: "Input the Task name",
    },
  },
  {
    name: "description",
    className: "my-2",
    label: {
      className: "w-full",
      value: "Description",
    },
    field: {
      type: "textarea",
      placeholder: "Input the Task description",
      className: "h-40 w-full",
    },
  },
];

export const Task = () => {
  const { data, isFetching, isLoading, error } = useGetAllTask();
  const { dialog } = useDialogContext();
  const [confirmDialog, setConfirmDialog] = useState<IConfirmDialogContent>({
    open: false,
    module: "Task",
  });

  const [form, setForm] = useState({
<<<<<<< HEAD
    url: "/management/employee-type",
=======
    url: "/modules",
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
    fetchQueryKey: getAllTaskKey,
    action: "create" as IAction, // defaults to create
    onAddFn: (data: DynamicObject) =>
      addTask(data as ITaskInput),
    onUpdateFn: (id: string, data: DynamicObject) =>
      updateTask(id, data as ITaskInput),
    onDeleteFn: (id: string) => deleteTask(id),
    onRetrieveFn: (id: string) => retrieveTask(id),
  });

  const [record, setRecord] = useState(data);

  useEffect(() => {
    setRecord(() => (error ? [] : data));
<<<<<<< HEAD
    // show toast in the future...
  }, [data, error]);
=======
    //show toast in the future...
  }, [data,])
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb

  return (
    <>
      <FormContext.Provider value={{ form, setForm }}>
        <ConfirmDialogContext.Provider
          value={{ confirmDialog, setConfirmDialog }}
        >
          <ConfirmDialog />
          <Dialog>
            <FormGroup
              formFields={formGroupFields}
<<<<<<< HEAD
              schema={TaskSchema}
              moduleName="Task"
=======
              schema={moduleSchema}
              moduleName="Task" 
>>>>>>> 8aec6545caadd374f375925b6a6ab3413277fddb
              data={dialog.data}
            />
          </Dialog>

          <DataTable
            data={record ?? []}
            columnDef={columnDef}
            config={config}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </ConfirmDialogContext.Provider>
      </FormContext.Provider>
    </>
  );
};
