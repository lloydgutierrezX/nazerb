import { useQuery } from "@tanstack/react-query";
import { IRequestParams, fetchAll, addData, updateData, deleteData, retreiveData } from "Services/axios/request";
import { IEmployeeStatusInput, IEmployeeStatusResponse } from "./IEmployeeStatus";

const url = '/management/employee-status';
export const getAllEmployeeStatusKey = 'get-all-modules';
// get all modules request
const getAllEmployeeStatus =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all modules useQuery implementation
export const useGetAllEmployeeStatus = (config?: IRequestParams) => {
  return useQuery<IEmployeeStatusResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllEmployeeStatus(url, config);
      return response?.data ?? [];
    },
    queryKey: [getAllEmployeeStatusKey]
  })
}

// add module request
export const addEmployeeStatus =
  async (data: IEmployeeStatusInput) => await addData({ url, data });

export const updateEmployeeStatus =
  async (id: string, data: IEmployeeStatusInput) => await updateData({ url: `${url}/${id}`, data });

export const deleteEmployeeStatus =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrieveEmployeeStatus =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });