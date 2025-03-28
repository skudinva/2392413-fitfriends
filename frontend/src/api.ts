/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { isValidDetailErrorData, isValidErrorData, token } from './utils';

const BACKEND_URL = 'http://localhost:3000';
const REQUEST_TIMEOUT = 5000;

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token.get()}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      toast.dismiss();

      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 401:
            break;
          case 403:
            toast.warn('Доступ запрещен');
            break;
          default:
            if (
              error.response &&
              isValidDetailErrorData(error.response.data) &&
              'detailMessage' in error.response.data
            ) {
              const { detailMessage } = error.response.data;

              toast.warn(
                Array.isArray(detailMessage)
                  ? detailMessage.join()
                  : String(detailMessage)
              );
            } else if (
              error.response &&
              isValidErrorData(error.response.data)
            ) {
              toast.warn(
                error.response.data.error || error.response.statusText
              );
            } else {
              toast.warn(error.message);
            }
        }
      } else {
        toast.warn(error.message);
      }

      return Promise.reject(error);
    }
  );

  return api;
}
