import axios from "axios";
import {
  BackendError,
  BadRequestError,
  InternalServiceError,
  NetworkError,
} from "../errors";

const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status !== undefined) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(
            new BadRequestError(error.message, { cause: error })
          );
        case 500:
          return Promise.reject(
            new InternalServiceError(error.message, { cause: error })
          );
        default:
          return Promise.reject(
            new BackendError(error.message, { cause: error })
          );
      }
    } else {
      return Promise.reject(new NetworkError(error.message, { cause: error }));
    }
  }
);

export default instance;
