import axios from "axios";
import { MODULE_BASE_URL } from "./apiUrls";

const REQUEST_TIMEOUT = 2000;

export const request = (module: string, params: { id: number, data:  }) => {
  const base_url = getUrl(module);

}

// Axios request
const axiosIntance = (url: string) => {
  return axios.create({
    baseURL: url,
    timeout: REQUEST_TIMEOUT
  })
};

// returns the base url set on apiUrls.ts
const getUrl = (url: string) => {
  switch (url) {
    case 'module':
      return MODULE_BASE_URL;

    default:
      return null;
  }
}