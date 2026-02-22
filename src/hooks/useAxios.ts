/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
=======
import { useState } from "react";
>>>>>>> feat/logout-flow

export const usePost = <T, P>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const postData = async (payload: P) => {
    setLoading(true);
    setError(null);

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
<<<<<<< HEAD
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
=======
};
>>>>>>> feat/logout-flow
