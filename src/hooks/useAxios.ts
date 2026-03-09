/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import type { AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"

const USE_MOCK = true

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

/* ================= MOCK INIT ================= */

const initializeMock = () => {
  if (!localStorage.getItem("mockUser")) {
    localStorage.setItem(
      "mockUser",
      JSON.stringify({
        name: "Lucas Santos",
        email: "admin@email.com",
        phone: "(18) 99999-9999",
        password: "12345678",
      })
    )
  }

  if (!localStorage.getItem("mockLeads")) {
    localStorage.setItem("mockLeads", JSON.stringify([]))
  }
}

initializeMock()



export const usePost = <T, P>(endpoint: string, withAuth = false) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const postData = async (payload: P): Promise<T | null> => {
    setLoading(true)
    setError(null)

    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300))

        /* LOGIN */

        if (endpoint === "login") {
          const userString = localStorage.getItem("mockUser")

          if (!userString) {
            setError(401)
            return null
          }

          const user = JSON.parse(userString)
          const body = payload as any

          if (
            body.email === user.email &&
            body.password === user.password
          ) {
            Cookies.set("Authorization", "mock-token", { expires: 1 })

            const result = { jwt_token: "mock-token" } as T

            setData(result)

            return result
          }

          setError(401)
          return null
        }

        /* CREATE PROFILE */

        if (endpoint === "profile/create") {
          const newUser = {
            ...(payload as any),
          }

          localStorage.setItem(
            "mockUser",
            JSON.stringify(newUser)
          )

          setData(newUser as T)

          return newUser as T
        }

        /* CREATE LEAD */

        if (endpoint === "leads/create") {
          const leads = JSON.parse(
            localStorage.getItem("mockLeads") || "[]"
          )

          const newLead = {
            ...(payload as any),
            id: crypto.randomUUID(),
          }

          const updatedLeads = [...leads, newLead]

          localStorage.setItem(
            "mockLeads",
            JSON.stringify(updatedLeads)
          )

          setData(newLead as T)

          return newLead as T
        }
      }

      const response = await axiosInstance.post(endpoint, payload, {
        headers: withAuth
          ? {
              Authorization: `Bearer ${Cookies.get("Authorization")}`,
            }
          : undefined,
      })

      setData(response.data)

      return response.data

    } catch (err: any) {

      setError(err?.response?.status ?? 500)

      return null

    } finally {

      setLoading(false)

    }
  }

  return [data, loading, error, postData] as const
}


export const useGet = <T>(
  endpoint: string,
  config?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const getData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300))

        if (endpoint === "leads") {
          const leads = JSON.parse(
            localStorage.getItem("mockLeads") || "[]"
          )

          setData(leads as T)
        }

        if (endpoint === "profile") {
          const user = JSON.parse(
            localStorage.getItem("mockUser") || "{}"
          )

          setData(user as T)
        }

        return
      }

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
  }, [endpoint, config])

  useEffect(() => {
    getData()
  }, [getData])

  return [data, loading, error, getData] as const
}


export const usePut = <T>(endpoint: string, withAuth = true) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const putData = async (payload: T): Promise<T | null> => {
    setLoading(true)
    setError(null)

    try {
     if (endpoint === "profile") {
  const currentUser = JSON.parse(
    localStorage.getItem("mockUser") || "{}"
  )

  const updatedUser = {
    ...currentUser,
    ...payload
  }

  localStorage.setItem(
    "mockUser",
    JSON.stringify(updatedUser)
  )

  setData(updatedUser)
  return updatedUser
}

      const response = await axiosInstance.put(endpoint, payload, {
        headers: withAuth
          ? {
              Authorization: `Bearer ${Cookies.get("Authorization")}`,
            }
          : undefined,
      })

      setData(response.data)

      return response.data
    } catch (err: any) {
      setError(err?.response?.status ?? 500)
      return null
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, error, putData] as const
}

/* ================= DELETE ================= */

export const useDelete = (endpoint: string) => {
  const [data, setData] = useState<null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)

  const deleteData = async (id?: string) => {
    setLoading(true)
    setError(null)

    try {
      if (USE_MOCK && endpoint === "leads" && id) {
        const leads = JSON.parse(
          localStorage.getItem("mockLeads") || "[]"
        )

        const updatedLeads = leads.filter((l: any) => l.id !== id)

        localStorage.setItem(
          "mockLeads",
          JSON.stringify(updatedLeads)
        )

        setData(null)
      } else {
        await axiosInstance.delete(`${endpoint}/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
        })
      }
    } catch (err: any) {
      setError(err?.response?.status ?? 500)
    } finally {
      setLoading(false)
    }
  }

  return [data, loading, error, deleteData] as const
}