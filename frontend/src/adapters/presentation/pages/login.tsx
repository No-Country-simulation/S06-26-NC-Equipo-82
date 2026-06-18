
import { useState } from "react"
import LoginForm from "../components/loginForm"
import RegistroForm from "../components/registroForm"

const Login = () => {
    const [register, setRegister] = useState(false)
    return (
        register ? <RegistroForm setRegister={setRegister} /> : <LoginForm setRegister={setRegister} />
    )
}

export default Login
