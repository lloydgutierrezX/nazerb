import { useQuery } from "@tanstack/react-query";
import { IRequestParams, addData, deleteData, fetchAll, retreiveData, updateData } from "Services/axios/request";
import { IPermissionInput, IPermissionResponse } from "./IPermission";

export const url = '/permissions';
export const getAllPermissionsKey = 'get-all-permissions';

const getAllPermissions =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all permission useQuery implementation
export const useGetAllPermissions = (config?: IRequestParams) => {
  return useQuery<IPermissionResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllPermissions(url, config);
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
  async (id: string) => await retreiveData({ url: `${url}/${id}` });