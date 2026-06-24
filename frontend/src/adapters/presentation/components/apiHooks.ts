import { type FC } from "react"
import httpClient from "../../infrastructure/httpClient"

interface HttpProviderProps {
  children: React.ReactNode
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export const useGetApi = <T = unknown>(endpoint: string) => {
  const fetchData = async (): Promise<T | null> => {
    const res = await httpClient.get<T>(endpoint)
    return res.data
  }
  return { fetchData }
}

export const usePostApi = <T = unknown>() => {
  const createData = async (endpoint: string, body: unknown): Promise<T | null> => {
    const res = await httpClient.post<T>(endpoint, body)
    if (res.error) throw new Error(res.error)
    return res.data
  }
  return { createData }
}

export const usePutApi = <T = unknown>() => {
  const updateData = async (endpoint: string, body: unknown): Promise<T | null> => {
    const res = await httpClient.put<T>(endpoint, body)
    if (res.error) throw new Error(res.error)
    return res.data
  }
  return { updateData }
}

export const useDeleteApi = <T = unknown>() => {
  const deleteData = async (endpoint: string): Promise<T | null> => {
    const res = await httpClient.delete<T>(endpoint)
    if (res.error) throw new Error(res.error)
    return res.data
  }
  return { deleteData }
}

export const apiConfig = {
  baseUrl: API_BASE_URL,
  usersEndpoint: "/users",
  loginEndpoint: "/login",
}

export default apiConfig