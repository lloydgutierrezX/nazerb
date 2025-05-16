import { DynamicObject } from 'Utils/globalInterface';
import { request } from './requestIntercepter';
import { AxiosRequestConfig } from 'axios';

// Get
type IFetchRequest = {
  url: string;
  options?: AxiosRequestConfig<unknown>
}

export const fetchAll = ({ url, options }: IFetchRequest) => {
  try {
    return request.get(url, options)
  } catch (error) {
    console.log(error)
  }
}

type IFetchDataRequest = {
  url: string;
  data: DynamicObject
}
export const addData = ({ url, data }: IFetchDataRequest) => {
  try {
    return request.post(`${url}`, data)
      .catch((error) => { throw error.response.data })
  } catch {
    throw new Error()
  }
}

export const updateData = ({ url, data }: IFetchDataRequest) => {
  try {
    return request.put(`${url}`, data)
      .catch((error) => { throw error.response.data })
  } catch {
    throw new Error()
  }
}