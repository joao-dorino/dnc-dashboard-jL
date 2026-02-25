/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react' // O professor só importou useState na imagem
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// 🚀 Instância criada direto no arquivo como no curso
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

export const usePost = <T, P>(endpoint: string) => { 
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const postData = async (payload: P) => {
    setLoading(true);
    setError(null);

    // Se você usa o código fake, o TS reclama que não usa o 'endpoint'.
    // Para resolver, simulamos o uso dele no console ou usamos a chamada real.
    console.log(`Chamando endpoint: ${endpoint}`); 

    setTimeout(() => {
      const body = payload as any;

      if (
        body.email === "admin@email.com" &&
        body.password === "12345678"
      ) {
        setData({ jwt_token: "fake-token" } as T);
      } else {
        setError(401);
      }

      setLoading(false);
    }, 1000);
  };

  return { data, loading, error, postData };
};

export const useGet = <T>(endpoint: string, config?: AxiosRequestConfig) => {
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
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return { data, loading, error, getData };
};