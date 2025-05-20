import { DynamicObject } from 'Utils/globalInterface';
import { request } from './requestIntercepter';
import { IPagination } from 'Components/datatable/IDatatable';

// Get
export type IRequestParams = {
  pagination: IPagination;
  query?: string;
};

export const fetchAll = (url: string, params?: IRequestParams) => {
  try {
    const config = params
      ? {
        page: params.pagination.page,
        limit: params.pagination.limit
      }
      : {};

    return request.get(url, {
      params: config
    })
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