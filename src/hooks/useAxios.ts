/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

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
};