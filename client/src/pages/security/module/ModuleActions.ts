import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addData, deleteData, fetchAll, retreiveData, updateData } from "Services/axios/request";
import { IModuleResponse } from "./IModule";
import { IAction } from "Components/field/IForm";

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

export type IModuleInput = {
  name: string, description: string, is_active: boolean
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

// useQuery implementation for add module request
export const useModuleMutation = (action: IAction, id?: string, formData?: Record<string, unknown>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      switch (action) {
        case 'create':
          return addModule(formData as IModuleInput);
        case 'update':
          return updateModule(id!, formData as IModuleInput);
        case 'delete':
          return deleteModule(id!);
        case 'retrieve':
          return retrieveModule(id!);
        default:
          throw new Error(`${action} is not registered in useModuleMutation`);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-all-modules'] })
  })
}