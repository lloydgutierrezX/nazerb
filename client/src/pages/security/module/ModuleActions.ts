import { addData, deleteData, fetchAll, retreiveData, updateData } from "Services/axios/request";

const url = '/modules';

export const getAllModules =
  async () => await fetchAll({ url });

export type IModuleDataChangeRequest = {
  id?: string;
  data?: { name: string, description: string, is_active: boolean };
}
export const addModule =
  async ({ data }: IModuleDataChangeRequest) => await addData({ url, data });

export const updateModule =
  async ({ id, data }: IModuleDataChangeRequest) => await updateData({ url: `${url}/${id}`, data });

export const deleteModule =
  async ({ id }: IModuleDataChangeRequest) => await deleteData({ url: `${url}/${id}` });

export const retrieveModule =
  async ({ id }: IModuleDataChangeRequest) => await retreiveData({ url: `${url}/${id}` });