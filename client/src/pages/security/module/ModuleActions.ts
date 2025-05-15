import { addData, fetchAll, updateData } from "Services/axios/request";

export const getAllModules = async () => {
  const response = await fetchAll({
    url: '/modules'
  });

  return response;
}

export type IModulePostRequest = {
  url: string;
  data: { name: string, is_active: boolean }
}
export const addModule = async ({ url, data }: IModulePostRequest) => {
  const response = await addData({
    url,
    data
  });

  return response;
}

export const updateModule = async ({ url, data }: IModulePostRequest) => {
  const response = await updateData({ url, data });

  return response;
}