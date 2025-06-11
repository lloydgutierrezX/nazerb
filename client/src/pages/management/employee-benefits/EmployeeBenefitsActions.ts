import { useQuery } from "@tanstack/react-query";
import { IRequestParams, fetchAll, addData, updateData, deleteData, retreiveData } from "Services/axios/request";
import { IEmployeeBenefitsInput, IEmployeeBenefitsResponse } from "./IEmployeeBenefits";

const url = '/management/employee-benefits';
export const getAllEmployeeBenefitsKey = 'get-all-modules';
// get all modules request
const getAllEmployeeBenefits =
  async (url: string, config?: IRequestParams) => await fetchAll(url, config);

// get all modules useQuery implementation
export const useGetAllEmployeeBenefits = (config?: IRequestParams) => {
  return useQuery<IEmployeeBenefitsResponse[], unknown>({
    queryFn: async () => {
      const response = await getAllEmployeeBenefits(url, config);
      return response?.data ?? [];
    },
    queryKey: [getAllEmployeeBenefitsKey]
  })
}

// add module request
export const addEmployeeBenefits =
  async (data: IEmployeeBenefitsInput) => await addData({ url, data });

export const updateEmployeeBenefits =
  async (id: string, data: IEmployeeBenefitsInput) => await updateData({ url: `${url}/${id}`, data });

export const deleteEmployeeBenefits =
  async (id: string) => await deleteData({ url: `${url}/${id}` });

export const retrieveEmployeeBenefits =
  async (id: string) => await retreiveData({ url: `${url}/${id}` });