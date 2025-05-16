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

type IChangeDataRequest = {
  url: string;
  data?: DynamicObject
}
export const addData = ({ url, data }: IChangeDataRequest) => {
  try {
    return request.post(`${url}`, data)
      .catch((error) => { throw error.response.data })
  } catch {
    throw new Error()
  }
}

export const updateData = ({ url, data }: IChangeDataRequest) => {
  try {
    return request.put(url, data)
      .catch((error) => { throw error.response.data })
  } catch {
    throw new Error()
  }
}

export const deleteData = ({ url }: IChangeDataRequest) => {
  try {
    return request.delete(url)
      .catch((error) => { throw error.response.data })
  } catch {
    throw new Error()
  }
}

export const retreiveData = ({ url }: IChangeDataRequest) => {
  try {
    return request.put(url, { active: true })
      .catch((error) => { throw error.response.data })
  } catch {
    throw new Error()
  }
}