import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { submitOnboarding } from "../../../core/application/useCases/authUseCases"

// ── Datos ────────────────────────────────────────────────────────────────────

const NIVELES_TECNICOS = [
    {
        value: "junior",
        label: "Junior",
        desc: "0 – 2 años de experiencia",
        icon: "🌱",
        color: "from-emerald-400 to-green-500",
        border: "border-emerald-400",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
    },
    {
        value: "semi_senior",
        label: "Semi Senior",
        desc: "2 – 5 años de experiencia",
        icon: "⚡",
        color: "from-blue-400 to-cyan-500",
        border: "border-blue-400",
        bg: "bg-blue-50",
        text: "text-blue-700",
    },
    {
        value: "senior",
        label: "Senior",
        desc: "5 – 10 años de experiencia",
        icon: "🔥",
        color: "from-violet-500 to-purple-600",
        border: "border-violet-500",
        bg: "bg-violet-50",
        text: "text-violet-700",
    },
    {
        value: "tech_lead",
        label: "Tech Lead",
        desc: "Liderazgo técnico de equipos",
        icon: "🏆",
        color: "from-amber-400 to-orange-500",
        border: "border-amber-400",
        bg: "bg-amber-50",
        text: "text-amber-700",
    },
]

const AREAS_TECNOLOGIA = [
    { value: "frontend",    label: "Frontend",          icon: "🎨" },
    { value: "backend",     label: "Backend",           icon: "⚙️" },
    { value: "fullstack",   label: "Fullstack",         icon: "🔗" },
    { value: "mobile",      label: "Mobile",            icon: "📱" },
    { value: "devops",      label: "DevOps / Cloud",    icon: "☁️" },
    { value: "data",        label: "Data / BI",         icon: "📊" },
    { value: "ia_ml",       label: "IA / Machine Learning", icon: "🤖" },
    { value: "qa",          label: "QA / Testing",      icon: "🧪" },
    { value: "seguridad",   label: "Ciberseguridad",    icon: "🔒" },
    { value: "ux_ui",       label: "UX / UI Design",    icon: "✏️" },
    { value: "producto",    label: "Product Manager",   icon: "🗂️" },
    { value: "blockchain",  label: "Blockchain / Web3", icon: "🔐" },
]

const OBJETIVOS_LABORALES = [
    {
        value: "buscar_trabajo",
        label: "Buscar trabajo",
        desc: "Quiero encontrar mi próximo empleo en tech",
        icon: "💼",
    },
    {
        value: "estudiar",
        label: "Estudiar y aprender",
        desc: "Me enfoco en aprender nuevas tecnologías",
        icon: "📚",
    },
    {
        value: "cambiar_carrera",
        label: "Cambiar de carrera",
        desc: "Vengo de otra industria y quiero migrar a tech",
        icon: "🔄",
    },
    {
        value: "ascender",
        label: "Ascender profesionalmente",
        desc: "Quiero crecer dentro de mi empresa actual",
        icon: "🚀",
    },
    {
        value: "freelance",
        label: "Trabajo freelance",
        desc: "Busco proyectos independientes o consultoría",
        icon: "🖥️",
    },
    {
        value: "emprender",
        label: "Emprender",
        desc: "Tengo idea de un proyecto propio o startup",
        icon: "💡",
    },
    {
        value: "networking",
        label: "Hacer networking",
        desc: "Quiero conectar con otros profesionales del sector",
        icon: "🤝",
    },
    {
        value: "mentoria",
        label: "Obtener mentoría",
        desc: "Busco guía de alguien con más experiencia",
        icon: "🎓",
    },
]

// ── Steps ────────────────────────────────────────────────────────────────────

const STEPS = [
    { id: 1, label: "Nivel técnico" },
    { id: 2, label: "Área de tech" },
    { id: 3, label: "Objetivos" },
]

// ── Componente ────────────────────────────────────────────────────────────────

const FormularioOnboarding = () => {
    const { state, dispatch } = useAuth()
    const nombre = state.registerData?.nombre?.split(" ")[0] ?? "Usuario"

    const [step, setStep]           = useState(1)
    const [nivel, setNivel]         = useState("")
    const [areas, setAreas]         = useState<string[]>([])
    const [objetivos, setObjetivos] = useState<string[]>([])
    const [loading, setLoading]     = useState(false)
    const [error, setError]         = useState("")

    const toggleArea = (value: string) => {
        setAreas(prev =>
            prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]
        )
    }

    const toggleObjetivo = (value: string) => {
        setObjetivos(prev =>
            prev.includes(value) ? prev.filter(o => o !== value) : [...prev, value]
        )
    }

    const canNext = step === 1
        ? nivel !== ""
        : step === 2
            ? areas.length > 0
            : objetivos.length > 0

    const progress    = (step / STEPS.length) * 100

    const headerTitle = step === 1
        ? `¡Hola, ${nombre}! ¿Cuál es tu nivel técnico?`
        : step === 2
            ? "¿En qué área de tecnología trabajas?"
            : "¿Cuáles son tus objetivos laborales?"

    const handleFinish = async () => {
        setLoading(true)
        setError("")

        const onboardingData = {
            email: state.registerData?.email ?? "",
            nivel,
            areas,
            objetivos,
        }

        const { error: apiError } = await submitOnboarding(onboardingData)

        if (apiError) {
            setError(apiError)
            setLoading(false)
            return
        }

        dispatch({ type: "LOGIN", payload: { email: state.registerData?.email ?? "" } })
        console.log("✅ Onboarding completado:", onboardingData)
    }

    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-slate-100 px-4 py-8">
            <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl shadow-lg overflow-hidden flex flex-col">

                {/* ── Header ──────────────────────────────────────────────── */}
                <div className="bg-gradient-to-r from-[#00BFFF] to-[#0070D8] px-7 pt-7 pb-5 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider opacity-75 mb-1">
                        Paso {step} de {STEPS.length}
                    </p>
                    <h1 className="text-xl font-bold mb-4">
                        {headerTitle}
                    </h1>

                    {/* Barra de progreso */}
                    <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Steps labels */}
                    <div className="flex justify-between mt-2">
                        {STEPS.map(s => (
                            <span
                                key={s.id}
                                className={`text-xs transition-opacity ${
                                    s.id <= step ? "opacity-100 font-semibold" : "opacity-50"
                                }`}
                            >
                                {s.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Contenido ────────────────────────────────────────────── */}
                <div className="px-7 py-6 flex-1">

                    {/* STEP 1 — Nivel técnico */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {NIVELES_TECNICOS.map(n => {
                                const selected = nivel === n.value
                                return (
                                    <button
                                        key={n.value}
                                        onClick={() => setNivel(n.value)}
                                        className={`
                                            relative flex flex-col items-start gap-1 p-4 rounded-xl border-2
                                            text-left transition-all duration-200 group overflow-hidden
                                            ${selected
                                                ? `${n.border} ${n.bg} shadow-md scale-[1.02]`
                                                : "border-gray-200 hover:border-gray-300 hover:shadow-sm hover:scale-[1.01]"
                                            }
                                        `}
                                    >
                                        {/* Gradiente decorativo al seleccionar */}
                                        {selected && (
                                            <div className={`absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br ${n.color} opacity-10 -translate-y-6 translate-x-6`} />
                                        )}

                                        <span className="text-2xl">{n.icon}</span>
                                        <span className={`font-bold text-sm ${selected ? n.text : "text-gray-800"}`}>
                                            {n.label}
                                        </span>
                                        <span className="text-xs text-gray-500 leading-tight">{n.desc}</span>

                                        {selected && (
                                            <span className={`absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br ${n.color} flex items-center justify-center`}>
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    )}

                    {/* STEP 2 — Área de tecnología */}
                    {step === 2 && (
                        <div>
                            <p className="text-xs text-gray-500 mb-3">
                                Selecciona una o más áreas{" "}
                                {areas.length > 0 && (
                                    <span className="font-semibold text-[#00BFFF]">({areas.length} seleccionada{areas.length > 1 ? "s" : ""})</span>
                                )}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {AREAS_TECNOLOGIA.map(a => {
                                    const selected = areas.includes(a.value)
                                    return (
                                        <button
                                            key={a.value}
                                            onClick={() => toggleArea(a.value)}
                                            className={`
                                                flex flex-col items-center gap-1.5 p-3 rounded-xl border-2
                                                text-center transition-all duration-200
                                                ${selected
                                                    ? "border-[#00BFFF] bg-[#e8f9ff] shadow-sm scale-[1.03]"
                                                    : "border-gray-200 hover:border-[#00BFFF]/40 hover:bg-slate-50 hover:scale-[1.01]"
                                                }
                                            `}
                                        >
                                            <span className="text-2xl">{a.icon}</span>
                                            <span className={`text-xs font-semibold leading-tight ${selected ? "text-[#0070D8]" : "text-gray-700"}`}>
                                                {a.label}
                                            </span>
                                            {selected && (
                                                <span className="text-[10px] text-[#00BFFF] font-medium">✓ Seleccionado</span>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* STEP 3 — Objetivos laborales */}
                    {step === 3 && (
                        <div>
                            <p className="text-xs text-gray-500 mb-4">
                                Selecciona todos los que apliquen{" "}
                                {objetivos.length > 0 && (
                                    <span className="font-semibold text-[#00BFFF]">
                                        ({objetivos.length} seleccionado{objetivos.length > 1 ? "s" : ""})
                                    </span>
                                )}
                            </p>
                            <div className="flex flex-col gap-2.5">
                                {OBJETIVOS_LABORALES.map(obj => {
                                    const selected = objetivos.includes(obj.value)
                                    return (
                                        <label
                                            key={obj.value}
                                            className={`
                                                flex items-center gap-4 p-3.5 rounded-xl border-2 cursor-pointer
                                                transition-all duration-200 select-none
                                                ${selected
                                                    ? "border-[#00BFFF] bg-[#e8f9ff]"
                                                    : "border-gray-200 hover:border-[#00BFFF]/40 hover:bg-slate-50"
                                                }
                                            `}
                                        >
                                            {/* Checkbox custom */}
                                            <div className="relative flex-shrink-0">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={selected}
                                                    onChange={() => toggleObjetivo(obj.value)}
                                                />
                                                <div className={`
                                                    w-5 h-5 rounded-md border-2 flex items-center justify-center
                                                    transition-all duration-200
                                                    ${selected
                                                        ? "bg-[#00BFFF] border-[#00BFFF]"
                                                        : "border-gray-300 bg-white"
                                                    }
                                                `}>
                                                    {selected && (
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Ícono */}
                                            <span className="text-xl flex-shrink-0">{obj.icon}</span>

                                            {/* Texto */}
                                            <div className="flex flex-col min-w-0">
                                                <span className={`text-sm font-semibold leading-tight ${
                                                    selected ? "text-[#0070D8]" : "text-gray-800"
                                                }`}>
                                                    {obj.label}
                                                </span>
                                                <span className="text-xs text-gray-500 leading-snug mt-0.5">
                                                    {obj.desc}
                                                </span>
                                            </div>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Footer ───────────────────────────────────────────────── */}
                <div className="px-7 pb-7 flex items-center justify-between">
                    {step > 1 ? (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors flex items-center gap-1"
                        >
                            ← Atrás
                        </button>
                    ) : (
                        <div />
                    )}

                    {step < STEPS.length ? (
                        <button
                            onClick={() => setStep(s => s + 1)}
                            disabled={!canNext || loading}
                            className={`
                                px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                                ${canNext && !loading
                                    ? "bg-[#00BFFF] hover:bg-[#009FDF] text-white shadow-md hover:shadow-lg active:scale-95"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }
                            `}
                        >
                            Continuar →
                        </button>
                    ) : (
                        <button
                            onClick={handleFinish}
                            disabled={!canNext || loading}
                            className={`
                                px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                                ${canNext && !loading
                                    ? "bg-gradient-to-r from-[#00BFFF] to-[#0070D8] hover:opacity-90 text-white shadow-md hover:shadow-lg active:scale-95"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }
                            `}
                        >
                            {loading ? "Guardando..." : "¡Comenzar! 🚀"}
                        </button>
                    )}
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="px-7 pb-2">
                        <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-2">
                            {error}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FormularioOnboarding
