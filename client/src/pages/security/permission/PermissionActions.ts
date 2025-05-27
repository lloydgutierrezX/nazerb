import { useQuery } from "@tanstack/react-query";
import { addData, deleteData, fetchAll, retreiveData, updateData } from "Services/axios/request";
import { IPermissionInput, IPermissionResponse } from "./IPermission";

export const url = '/permissions';
export const getAllPermissionsKey = 'get-all-permissions';

export const getAllPermissions =
  async () => await fetchAll(url);

// get all permission useQuery implementation
export const useGetAllPermissions = () => {
  return useQuery<IPermissionResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllPermissions();
      return response?.data ?? [];
    },
    queryKey: [getAllPermissionsKey]
  })
}

// permission data requests

export const addPermission =
  async (data: IPermissionInput) => await addData({ url, data });

export const updatePermission =
  async (id: string, data: IPermissionInput) => await updateData({ url: `${url}/${id}`, data });

export const deletePermission =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrievePermission =
  async (id: string) => await retreiveData({ url: `${url}/retrieve/${id}` });