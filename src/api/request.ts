import axios, { AxiosRequestConfig } from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const request = (config: AxiosRequestConfig) => {
  const customedAxios = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
  });

  return customedAxios(config);
};

export default request;
