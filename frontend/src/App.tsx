import { useEffect, useState } from "react"
import NavBar from "./adapters/presentation/components/NavBar"
import Dashboard from "./adapters/presentation/pages/Dashboard"
import Mentorias from "./adapters/presentation/pages/Mentorias"
import Experiencias from "./adapters/presentation/pages/Experiencias"
import Cursos from "./adapters/presentation/pages/Cursos"
import Perfil from "./adapters/presentation/pages/Perfil"
import Login from "./adapters/presentation/pages/login"
import FormularioOnboarding from "./adapters/presentation/pages/formularioOnboarding"
import { useAuth } from "./adapters/presentation/context/AuthContext"

function App() {
  const { state } = useAuth()
  const [activePage, setActivePage] = useState("Dashboard")

  useEffect(() => {
    if (state.isAuthenticated && state.isRegistered) {
      setActivePage("Dashboard")
    }
  }, [state.isAuthenticated, state.isRegistered])

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />
      case "Mentorias":
        return <Mentorias />
      case "Experiencias":
        return <Experiencias />
      case "Cursos":
        return <Cursos />
      case "Perfil":
        return <Perfil />
      default:
        return <Dashboard />
    }
  }

  // Si completó el registro, mostrar onboarding
  if (state.isRegistered && !state.isAuthenticated) {
    return <FormularioOnboarding />
  }

  // Si el usuario no está autenticado mostrar Login
  if (!state.isAuthenticated) {
    return <Login />
  }

  // Si está autenticado mostrar NavBar + páginas
  return (
    <>
      <NavBar activePage={activePage} onNavigate={setActivePage} />
      <main className="md:ml-64 min-h-screen p-6">
        {renderPage()}
      </main>
    </>
  )
}

export default App
