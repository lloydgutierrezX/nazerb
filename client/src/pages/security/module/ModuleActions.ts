import { useQuery } from "@tanstack/react-query";
import { addData, deleteData, fetchAll, IRequestParams, retreiveData, updateData } from "Services/axios/request";
import { IModuleInput, IModuleResponse } from "./IModule";

const url = '/modules';
export const getAllModulesKey = 'get-all-modules';
// get all modules request
const getAllModules =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all modules useQuery implementation
export const useGetAllModules = (config?: IRequestParams) => {
  return useQuery<IModuleResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllModules(url, config);
      return response?.data ?? [];
    },
    queryKey: [getAllModulesKey]
  })
}

// add module request
export const addModule =
  async (data: IModuleInput) => await addData({ url, data });

export const updateModule =
  async (id: string, data: IModuleInput) => await updateData({ url: `${url}/${id}`, data });

export const deleteModule =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrieveModule =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });