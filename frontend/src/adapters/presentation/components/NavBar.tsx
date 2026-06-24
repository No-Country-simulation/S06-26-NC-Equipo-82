import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { logout } from "../../../core/application/useCases/authUseCases"

const NavBar = ({ activePage, onNavigate }: { activePage: string; onNavigate: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { dispatch } = useAuth()

  const navItems = [
    { label: "Perfil", page: "Perfil" },
    { label: "Dashboard", page: "Dashboard" },
    { label: "Mentorias", page: "Mentorias" },
    { label: "Experiencias", page: "Experiencias" },
    { label: "Cursos", page: "Cursos" }
  ]

  const handleNavigate = (page: string) => {
    onNavigate(page)
    setIsOpen(false)
  }

  const navItemClass = (page: string) =>
    `w-full text-center p-2 rounded-lg transition-all ${
      activePage === page
        ? "bg-[#00BFFF] text-[#FFFFFF]"
        : "hover:bg-[#00BFFF] hover:text-[#FFFFFF] cursor-pointer"
    }`

  return (
    <>
    {/* boton para abrir el nav bar responsivo */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 p-3 shadow-lg ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* overlay para cerrar el nav bar responsivo */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* nav bar responsivo */}
      <div
        className={`
          fixed left-0 top-0 h-screen z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="w-fit h-screen flex flex-col justify-between p-6 md:p-10 items-center border-r border-gray-400 shadow-lg">
          <nav className="flex flex-col gap-12 md:gap-50 w-full">
            <ul className="flex flex-col gap-4 w-full text-center">
              {navItems.map((item) => (
                <li key={item.page}>
                  <button
                    type="button"
                    className={navItemClass(item.page)}
                    onClick={async () => {handleNavigate(item.page), await console.log("cargando " + item.page), (item.page === "Error404") ? await handleNavigate("Error404") : () => {}}}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-4 w-full text-center">
              <li className="w-full text-center p-2 rounded-lg transition-all hover:bg-[#00BFFF] hover:text-[#FFFFFF]">Ayuda</li>
              <li
                className="w-full text-center p-2 rounded-lg transition-all hover:bg-red-500 hover:text-white cursor-pointer"
                onClick={async () => {
                    await logout()
                    dispatch({ type: "LOGOUT" })
                }}
              >
                Cerrar sesión
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default NavBar
