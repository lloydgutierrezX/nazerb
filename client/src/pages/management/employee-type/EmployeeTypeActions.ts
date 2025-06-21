import { useQuery } from "@tanstack/react-query";
import { IRequestParams, fetchAll, addData, updateData, deleteData, retreiveData } from "Services/axios/request";
import { IEmployeeTypeInput, IEmployeeTypeResponse } from "./IEmployeeType";

export const url = '/management/employee-type';
export const getAllEmployeeTypeKey = 'get-all-modules';
// get all modules request
const getAllEmployeeType =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all modules useQuery implementation
export const useGetAllEmployeeType = (config?: IRequestParams) => {
  return useQuery<IEmployeeTypeResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllEmployeeType(url, config);
      return response?.data ?? [];
    },
    queryKey: [getAllEmployeeTypeKey]
  })
}

// add module request
export const addEmployeeType =
  async (data: IEmployeeTypeInput) => await addData({ url, data });

export const updateEmployeeType =
  async (id: string, data: IEmployeeTypeInput) => await updateData({ url: `${url}/${id}`, data });

export const deleteEmployeeType =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrieveEmployeeType =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });