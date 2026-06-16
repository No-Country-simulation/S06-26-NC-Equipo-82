import { useState } from "react"
import NavBar from "./adapters/presentation/components/NavBar"
import Dashboard from "./adapters/presentation/pages/Dashboard"
import Mentorias from "./adapters/presentation/pages/Mentorias"
import Experiencias from "./adapters/presentation/pages/Experiencias"
import Cursos from "./adapters/presentation/pages/Cursos"
import Perfil from "./adapters/presentation/pages/Perfil"

function App() {
  const [activePage, setActivePage] = useState("Dashboard")

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
