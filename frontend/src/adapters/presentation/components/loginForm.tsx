import { useState } from "react"
import { useAuth } from "../context/AuthContext"

interface LoginFormProps {
    setRegister: (value: boolean) => void
}

const LoginForm = ({ setRegister }: LoginFormProps) => {
    const { state, dispatch } = useAuth()

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError("") // limpiar error al escribir
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const { registerData } = state

        // Verificar si hay datos de registro guardados
        if (!registerData) {
            setError("No hay cuenta registrada. Por favor, regístrate primero.")
            return
        }

        // Comparar credenciales con los datos temporales guardados
        const emailMatch = formData.email === registerData.email
        const passwordMatch = formData.password === registerData.password

        if (!emailMatch || !passwordMatch) {
            setError("Email o contraseña incorrectos.")
            return
        }

        // Credenciales correctas → autenticar
        dispatch({ type: "LOGIN", payload: { email: formData.email } })
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f2f2f2] px-4 py-8">
            <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl flex shadow-lg overflow-hidden items-center justify-center flex-col">

                <div className="w-full px-6 pt-8 pb-2 text-center">
                    <h1 className="font-bold text-2xl sm:text-3xl">App Bit</h1>
                    <p className="text-gray-500 text-sm sm:text-base mt-1">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full px-6 sm:px-10 py-6">

                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email <span aria-required="true" className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition"
                        required
                    />

                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Contraseña <span aria-required="true" className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition"
                        required
                    />

                    {/* Mensaje de error */}
                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="bg-[#00BFFF] hover:bg-[#009FDF] text-white rounded-lg p-2.5 mt-2 font-semibold text-sm sm:text-base transition-colors w-full"
                    >
                        Iniciar sesión
                    </button>

                    <span className="text-center text-sm text-gray-600 pb-4">
                        ¿No tienes una cuenta?{" "}
                        <button
                            type="button"
                            className="text-[#00BFFF] font-medium hover:underline"
                            onClick={() => setRegister(true)}
                        >
                            Regístrate
                        </button>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default LoginForm