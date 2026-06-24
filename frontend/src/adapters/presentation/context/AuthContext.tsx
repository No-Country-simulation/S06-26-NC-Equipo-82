import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react"
import {
    authReducer,
    initialAuthState,
    type AuthState,
    type AuthAction,
} from "../../../core/application/store/authReducer"

interface AuthContextType {
    state: AuthState
    dispatch: React.Dispatch<AuthAction>
}

const AuthContext = createContext<AuthContextType | null>(null)

const getStoredAuth = (): AuthState => {
    const token = localStorage.getItem("token")
    const userEmail = localStorage.getItem("user_id")
    
    if (token && userEmail) {
        return {
            ...initialAuthState,
            isAuthenticated: true,
            userEmail,
        }
    }
    return initialAuthState
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, getStoredAuth())

    useEffect(() => {
        if (state.isAuthenticated && state.userEmail) {
            localStorage.setItem("user_id", state.userEmail)
        } else if (!state.isAuthenticated) {
            localStorage.removeItem("user_id")
        }
    }, [state.isAuthenticated, state.userEmail])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

// ── Hook personalizado ─────────────────────────────────────────────────────────

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe usarse dentro de <AuthProvider>")
    }
    return context
}
