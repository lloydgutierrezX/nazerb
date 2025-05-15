import { addData, fetchAll, updateData } from "Services/axios/request";

export const getAllModules =
  async () => await fetchAll({ url: '/modules' });

export type IModulePostRequest = {
  url: string;
  data: { name: string, is_active: boolean }
}
export const addModule =
  async ({ url, data }: IModulePostRequest) => await addData({ url, data });

export const updateModule =
  async ({ url, data }: IModulePostRequest) => await updateData({ url, data });