import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api`;

export const request = axios.create({ baseURL });

// TOKEN
request.interceptors.request.use(config => {
  // const authToken = localStorage.getItem('authToken');
  // if (authToken) {
  //   config.headers.Authorization = `Bearer ${authToken}`;
  // }
  return config;
})

// Response
request.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // Handle unauthorized access
      console.log("Unauthorized access");
    } else if (status === 404) {
      // Handle not found errors
      console.log("Post not found");
    } else {
      // Handle other errors
      console.error("An error occurred:", error);
    }

    return Promise.reject(error);
  }
)