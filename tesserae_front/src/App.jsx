
import './App.css'
import Navigator from './components/navigator';
import Home from './pages/home/home';
import AuthenticationPage from './pages/authentication';
import { createSignal } from 'solid-js';

function App() {
  const [home, setHome] = createSignal(true)
  const [loginScreen, setLoginScreen] = createSignal(false);
  const [auth, setAuth] = createSignal(false);

  return (
    <main>
      {!loginScreen() && <Navigator setLoginScreen={setLoginScreen} auth={auth()} setAuth={setAuth}/>}
      {!loginScreen() && home() && <Home/>}
      {loginScreen() && !auth() && <AuthenticationPage setLoginScreen={setLoginScreen} setAuth={setAuth}/>}

      { /* Footer */}
    </main>
  )
}

export default App
