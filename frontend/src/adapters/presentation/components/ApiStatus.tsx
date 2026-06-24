import { useEffect, useState } from "react"
import httpClient from "../../infrastructure/httpClient"

interface ApiResponse {
  message: string
}

const ApiStatus = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true)
      const res = await httpClient.get<ApiResponse>("/")
      if (res.error) {
        setError(res.error)
      } else {
        setData(res.data)
      }
      setLoading(false)
    }
    fetchStatus()
  }, [])

  if (loading) return <div>Verificando conexión...</div>
  if (error) return <div>Error: {error}</div>
  return <div>{data?.message || "API disponible"}</div>
}

export default ApiStatus