import { useQuery } from "@tanstack/react-query";
import { IRequestParams, fetchAll, addData, updateData, deleteData, retreiveData } from "Services/axios/request";
import { IBenefitInput, IBenefitResponse } from "./IBenefit";

const url = '/management/benefit';
export const getAllBenefitsKey = 'get-all-modules';
// get all modules request
const getAllBenefits =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all modules useQuery implementation
export const useGetAllBenefits = (config?: IRequestParams) => {
  return useQuery<IBenefitResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllBenefits(url, config);
      return response?.data ?? [];
    },
    queryKey: [getAllBenefitsKey]
  })
}

// add module request
export const addBenefits =
  async (data: IBenefitInput) => await addData({ url, data });

export const updateBenefits =
  async (id: string, data: IBenefitInput) => await updateData({ url: `${url}/${id}`, data });

export const deleteBenefits =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrieveBenefits =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });