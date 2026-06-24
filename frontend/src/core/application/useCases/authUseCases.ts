import { httpClient, setToken, removeToken } from "../../../adapters/infrastructure/httpClient"
import { type RegisterData } from "../store/authReducer"

export interface AuthResponse {
    email: string
    token?: string
    user_id?: string
}

export interface OnboardingData {
    email: string
    nivel: string
    areas: string[]
    objetivos: string[]
}

export async function registerUser(data: RegisterData): Promise<{ error: string | null }> {
    const { error } = await httpClient.post<RegisterData>("/api/register", data)
    return { error }
}

export async function submitOnboarding(data: OnboardingData): Promise<{ error: string | null }> {
    const { error } = await httpClient.post("/api/onboarding", data)
    return { error }
}

export async function login(email: string, password: string): Promise<{ data: AuthResponse | null; error: string | null }> {
    const { data, error } = await httpClient.post<AuthResponse>("/api/login", { email, password })
    
    if (data?.token) {
        setToken(data.token)
    }
    
    if (data?.user_id) {
        localStorage.setItem("user_id", data.user_id)
    }
    
    return { data: data ?? null, error }
}

export async function logout(): Promise<void> {
    removeToken()
    localStorage.removeItem("user_id")
}