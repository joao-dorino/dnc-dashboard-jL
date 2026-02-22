/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000, // ⏱️ 10 segundos
});

export const usePost = <T, P>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const postData = async (payload: P, config?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        ...config,
      });

      setData(response.data);
    } catch (err: any) {
      setError(err?.response?.status ?? 500);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};


export const useGet = <T>( endpoint: string, config?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({
        url: endpoint,
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${Cookies.get('Authorization')}`,
         ...config?.headers,
        },
        ...config,
      });

      setData(response.data);
    } catch (err: any) {
      setError(err?.response?.status ?? 500);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  getData()
}, [])


  return { data, loading, error, getData };
};
