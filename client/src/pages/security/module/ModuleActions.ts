import { useQuery } from "@tanstack/react-query";
import { addData, deleteData, fetchAll, retreiveData, updateData } from "Services/axios/request";
import { IModuleInput, IModuleResponse } from "./IModule";

const url = '/modules';
export const getAllModulesKey = 'get-all-modules';
// get all modules request
const getAllModules =
  async (url: string) => await fetchAll({ url });

// get all modules useQuery implementation
export const useGetAllModules = () => {
  return useQuery<IModuleResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllModules(url);
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