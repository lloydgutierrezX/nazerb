import { useQuery } from "@tanstack/react-query";
import { IRequestParams, fetchAll, addData, updateData, deleteData, retreiveData } from "Services/axios/request";
import { IPositionInput, IPositionResponse } from "./IPosition";

const url = '/management/employee-type';
export const getAllPositionKey = 'get-all-modules';
// get all modules request
const getAllPosition =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all modules useQuery implementation
export const useGetAllPosition = (config?: IRequestParams) => {
  return useQuery<IPositionResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllPosition(url, config);
      return response?.data ?? [];
    },
    queryKey: [getAllPositionKey]
  })
}

// add module request
export const addPosition =
  async (data: IPositionInput) => await addData({ url, data });

export const updatePosition =
  async (id: string, data: IPositionInput) => await updateData({ url: `${url}/${id}`, data });

export const deletePosition =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrievePosition =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });