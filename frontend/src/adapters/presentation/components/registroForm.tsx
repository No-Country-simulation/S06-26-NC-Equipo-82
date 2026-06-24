import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import LocationSelector, { type LocationValue } from "./LocationSelector"
import { registerUser } from "../../../core/application/useCases/authUseCases"

interface RegistroFormProps {
    setRegister: (value: boolean) => void
}

const RegistroForm = ({ setRegister }: RegistroFormProps) => {
    const { dispatch } = useAuth()

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        whatsapp: "",
        fechaNacimiento: "",
        genero: "",
    })

    const [location, setLocation] = useState<LocationValue>({
        continente: "",
        pais: "",
        estado: "",
        ciudad: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const fullData = { ...formData, ...location }
        
        const { error: apiError } = await registerUser(fullData)
        
        if (apiError) {
            setError(apiError)
            setLoading(false)
            return
        }
        
        dispatch({ type: "REGISTER_COMPLETE", payload: fullData })
        console.log("✅ Registro completado, redirigiendo a onboarding:", fullData)
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f2f2f2] px-4 py-8">
            <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl flex shadow-lg overflow-hidden items-center justify-center flex-col">

                <div className="w-full px-6 pt-8 pb-2 text-center">
                    <h1 className="font-bold text-2xl sm:text-3xl">App Bit</h1>
                    <p className="text-gray-500 text-sm sm:text-base mt-1">Crea tu cuenta para comenzar</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full px-6 sm:px-10 py-6">

                    {/* ── Nombre ────────────────────────────────────────── */}
                    <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                        Nombre completo <span aria-required="true" className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition"
                        required
                    />

                    {/* ── Email ─────────────────────────────────────────── */}
                    <label htmlFor="reg-email" className="text-sm font-medium text-gray-700">
                        Email <span aria-required="true" className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="reg-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition"
                        required
                    />

                    {/* ── Contraseña ────────────────────────────────────── */}
                    <label htmlFor="reg-password" className="text-sm font-medium text-gray-700">
                        Contraseña <span aria-required="true" className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="reg-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition"
                        required
                    />

                    {/* ── Whatsapp + Fecha (fila en sm+) ────────────────── */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                                Whatsapp <span aria-required="true" className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="whatsapp"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="fechaNacimiento" className="text-sm font-medium text-gray-700">
                                Fecha de nacimiento <span aria-required="true" className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="fechaNacimiento"
                                name="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition"
                                required
                            />
                        </div>
                    </div>

                    {/* ── Género ────────────────────────────────────────── */}
                    <label htmlFor="genero" className="text-sm font-medium text-gray-700">
                        Género <span aria-required="true" className="text-red-500">*</span>
                    </label>
                    <select
                        id="genero"
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition bg-white"
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>

                    {/* ── Ubicación en cascada ──────────────────────────── */}
                    <div className="border-t border-gray-200 pt-3 mt-1">
                        <p className="text-sm font-semibold text-gray-600 mb-3">Ubicación</p>
                        <LocationSelector value={location} onChange={setLocation} />
                    </div>

                    {/* Mensaje de error */}
                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-2">
                            {error}
                        </p>
                    )}

                    {/* ── Submit ────────────────────────────────────────── */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#00BFFF] hover:bg-[#009FDF] text-white rounded-lg p-2.5 mt-2 font-semibold text-sm sm:text-base transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creando cuenta..." : "Crear cuenta"}
                    </button>

                    <span className="text-center text-sm text-gray-600 pb-4">
                        ¿Ya tienes una cuenta?{" "}
                        <button
                            type="button"
                            className="text-[#00BFFF] font-medium hover:underline"
                            onClick={() => setRegister(false)}
                        >
                            Inicia sesión
                        </button>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default RegistroForm