import { useQuery } from "@tanstack/react-query";
import { IRequestParams, fetchAll, addData, updateData, deleteData, retreiveData } from "Services/axios/request";
import { ITaskInput, ITaskResponse } from "./ITask";

const url = '/management/employee-type';
export const getAllTaskKey = 'get-all-modules';
// get all modules request
const getAllTask =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all modules useQuery implementation
export const useGetAllTask = (config?: IRequestParams) => {
  return useQuery<ITaskResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllTask(url, config);
      return response?.data ?? [];
    },
    queryKey: [getAllTaskKey]
  })
}

// add module request
export const addTask =
  async (data: ITaskInput) => await addData({ url, data });

export const updateTask =
  async (id: string, data: ITaskInput) => await updateData({ url: `${url}/${id}`, data });

export const deleteTask =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrieveTask =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });