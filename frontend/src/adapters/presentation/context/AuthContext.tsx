import { createContext, useContext, useReducer, type ReactNode } from "react"
import {
    authReducer,
    initialAuthState,
    type AuthState,
    type AuthAction,
} from "../../../core/application/store/authReducer"

// ── Tipos del contexto ─────────────────────────────────────────────────────────

interface AuthContextType {
    state: AuthState
    dispatch: React.Dispatch<AuthAction>
}

// ── Creación del contexto ──────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null)

// ── Provider ───────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState)

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
