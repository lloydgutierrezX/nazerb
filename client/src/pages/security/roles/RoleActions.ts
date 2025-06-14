import { useQuery } from "@tanstack/react-query";
import { addData, deleteData, fetchAll, retreiveData, updateData } from "Services/axios/request";
import { IRoleResponse, IRoleInput } from "./IRole";

export const url = '/roles';
export const getAllRolesKey = 'get-all-roles';

export const getAllRoles = async (url: string) => await fetchAll(url);

export const useGetAllRoles = () => {
  return useQuery<IRoleResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllRoles(url);
      return response?.data ?? [];
    },
    queryKey: [getAllRolesKey]
  })
}

export const addRole =
  async (data: IRoleInput) => await addData({ url, data });

export const updateRole =
  async (id: string, data: IRoleInput) => await updateData({ url: `${url}/${id}`, data });

export const deleteRole =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrieveRole =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });