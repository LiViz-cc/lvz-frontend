import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const getServer = () => {
  const token = localStorage.getItem('lvz-token') ?? '';
  const customedAxios = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers: {
      Authorization: token,
    },
  });
  return customedAxios;
};

export default getServer;
