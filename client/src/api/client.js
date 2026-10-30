import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 60000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status ?? 0;
    const message =
      err.response?.data?.error?.message ??
      (status === 0
        ? 'Cannot reach the server. Check your connection and try again.'
        : 'Something went wrong');
    return Promise.reject({
      status,
      message,
      details: err.response?.data?.error?.details ?? [],
    });
  },
);
