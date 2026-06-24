const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>
}

interface ApiResponse<T> {
  data: T | null
  error: string | null
}

const getToken = (): string | null => {
  return localStorage.getItem("token")
}

const setToken = (token: string): void => {
  localStorage.setItem("token", token)
}

const removeToken = (): void => {
  localStorage.removeItem("token")
}

async function request<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`

  const token = getToken()
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        data: null,
        error: errorData.detail || `Error ${response.status}: ${response.statusText}`,
      }
    }

    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Error de red desconocido",
    }
  }
}

export const httpClient = {
  get: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
}

export { getToken, setToken, removeToken }

export default httpClient