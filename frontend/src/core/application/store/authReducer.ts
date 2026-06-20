// ── Tipos del dominio ──────────────────────────────────────────────────────────

export interface RegisterData {
    nombre: string
    email: string
    password: string
    whatsapp: string
    fechaNacimiento: string
    genero: string
    continente: string
    pais: string
    estado: string
    ciudad: string
}

export interface AuthState {
    registerData: RegisterData | null
    isAuthenticated: boolean
    isRegistered: boolean
    userEmail: string | null
}

// ── Estado inicial ─────────────────────────────────────────────────────────────

export const initialAuthState: AuthState = {
    registerData: null,
    isAuthenticated: false,
    isRegistered: false,
    userEmail: null,
}

// ── Acciones ───────────────────────────────────────────────────────────────────

export type AuthAction =
    | { type: "SET_REGISTER_DATA"; payload: RegisterData }
    | { type: "REGISTER_COMPLETE"; payload: RegisterData }
    | { type: "LOGIN"; payload: { email: string } }
    | { type: "LOGOUT" }
    | { type: "CLEAR_REGISTER_DATA" }

// ── Reducer ────────────────────────────────────────────────────────────────────

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "SET_REGISTER_DATA":
            return {
                ...state,
                registerData: action.payload,
            }

        case "REGISTER_COMPLETE":
            return {
                ...state,
                registerData: action.payload,
                isRegistered: true,
            }

        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                userEmail: action.payload.email,
            }

        case "LOGOUT":
            return {
                ...initialAuthState,
            }

        case "CLEAR_REGISTER_DATA":
            return {
                ...state,
                registerData: null,
            }

        default:
            return state
    }
}
