import axios, { AxiosError, type AxiosResponse } from 'axios';
export const axiosResponseBody = (res: AxiosResponse) => res.data;

axios.defaults.baseURL = import.meta.env.VITE_API_URL_NESTJS;

console.log("VITE_API_URL_NESTJS", import.meta.env.VITE_API_URL_NESTJS)


// Middleware Configuration for Axios
// axios.interceptors.request.use((config) => {
//   if (config.url !== import.meta.env.REACT_APP_IP_ADDRESS_LOOKUP) {
//     const token = store.commonStore.token;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const myResponse = error.response as AxiosResponse;
    const modalStateErrors = [];
    if (!myResponse?.status) {
    }

    switch (myResponse.status) {
      case 400:
        break;
      case 401:
        break;
      case 403:
        // if (store.userStore.user) store.userStore.logout();
        break;
      case 404:
        break;
      case 413:
      case 418:  //I am a teapot!
        break;
      case 500:
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);