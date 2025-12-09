import { createSignal } from 'solid-js'
import LoginForm from "./login"
import RegisterScreen from "./registration"

export default function AuthenticationPage({setAuth, setLoginScreen}) {


	const [showRegister, setShowRegister] = createSignal(false)

	const renderRegisterScreen = () => {
		setShowRegister(true)
	}

	return (
		<main className="login-page flex bg-background w-screen h-screen flex-row justify-center items-center p-4">
			{showRegister() ? (
				<RegisterScreen setShowRegister={setShowRegister} showRegister={showRegister} setAuth={setAuth} setLoginScreen={setLoginScreen}/>
			) : (
				<LoginForm setShowRegister={setShowRegister} showRegister={showRegister} setAuth={setAuth} setLoginScreen={setLoginScreen}/>
			)
			}
		</main>
	)
}
