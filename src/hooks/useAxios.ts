/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import axios from "axios"
import type { AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"

const USE_MOCK = true //  deixe true enquanto não tem backend

// AXIOS INSTANCE (para backend futuro)
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
})

// MOCK DATABASE INIT
const initializeMockDatabase = () => {
  const existingUser = localStorage.getItem("mockUser")

  if (!existingUser) {
    const defaultUser = {
      name: "Lucas Santos",
      email: "admin@email.com",
      phone: "(18) 99999-9999",
      password: "12345678",
    }

    localStorage.setItem("mockUser", JSON.stringify(defaultUser))
  }
}

initializeMockDatabase()


//  POST (LOGIN)
export const usePost = <T, P>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const postData = async (payload: P) => {
    setLoading(true)
    setError(null)

    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const body = payload as any
      const storedUser = JSON.parse(
        localStorage.getItem("mockUser") || "{}"
      )

      if (
        body.email === storedUser.email &&
        body.password === storedUser.password
      ) {
        Cookies.set("Authorization", "mock-token-123", { expires: 1 })

        setData({ jwt_token: "mock-token-123" } as T)
      } else {
        setError(401)
      }

      setLoading(false)
      return
    }

    try {
      const response = await axiosInstance.post(endpoint, payload)
      setData(response.data)
    } catch (err: any) {
      setError(err?.response?.status ?? 500)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, postData }
}

//  GET
export const useGet = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<number | null>(null)

  const getData = async () => {
    setLoading(true)
    setError(null)

    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (endpoint === "profile") {
        const storedUser = JSON.parse(
          localStorage.getItem("mockUser") || "{}"
        )

        setData(storedUser as T)
      }

      setLoading(false)
      return
    }

    try {
      const response = await axiosInstance({
        url: endpoint,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("Authorization")}`,
          ...config?.headers,
        },
        ...config,
      })

      setData(response.data)
    } catch (err: any) {
      setError(err?.response?.status ?? 500)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error, getData }
}

// PUT (Atualizar Perfil)
export const usePut = <T, P>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const putData = async (payload: P) => {
    setLoading(true)
    setError(null)

    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (endpoint === "profile") {
        const storedUser = JSON.parse(
          localStorage.getItem("mockUser") || "{}"
        )

        const updatedUser = {
          ...storedUser,
          ...payload,
        }

        localStorage.setItem(
          "mockUser",
          JSON.stringify(updatedUser)
        )

        setData(updatedUser as T)
      }

      setLoading(false)
      return
    }

    try {
      const response = await axiosInstance.put(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${Cookies.get("Authorization")}`,
        },
      })

      setData(response.data)
    } catch (err: any) {
      setError(err?.response?.status ?? 500)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, putData }
}

//  DELETE (Excluir Conta)
export const useDelete = (endpoint: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const deleteData = async () => {
    setLoading(true)
    setError(null)

    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (endpoint === "profile") {
        localStorage.removeItem("mockUser")
        Cookies.remove("Authorization")
      }

      setLoading(false)
      return
    }

    try {
      await axiosInstance.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${Cookies.get("Authorization")}`,
        },
      })
    } catch (err: any) {
      setError(err?.response?.status ?? 500)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, deleteData }
}