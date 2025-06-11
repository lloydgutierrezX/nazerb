import { useQuery } from "@tanstack/react-query";
import { IRequestParams, fetchAll, addData, updateData, deleteData, retreiveData } from "Services/axios/request";
import { IBenefitInput, IBenefitResponse } from "./IBenefit";

const url = '/management/benefit';
export const getAllEmployeeBenefitKey = 'get-all-modules';
// get all modules request
const getAllEmployeeBenefit =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all modules useQuery implementation
export const useGetAllEmployeeBenefit = (config?: IRequestParams) => {
  return useQuery<IBenefitResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllEmployeeBenefit(url, config);
      return response?.data ?? [];
    },
    queryKey: [getAllEmployeeBenefitKey]
  })
}

// add module request
export const addEmployeeBenefit =
  async (data: IBenefitInput) => await addData({ url, data });

export const updateEmployeeBenefit =
  async (id: string, data: IBenefitInput) => await updateData({ url: `${url}/${id}`, data });

export const deleteEmployeeBenefit =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrieveEmployeeBenefit =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });