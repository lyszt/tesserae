
import './App.css'
import Navigator from './components/navigator';
import Home from './pages/home/home';
import { createSignal } from 'solid-js';

function App() {
  const [home, setHome] = createSignal(true)

  return (
    <main> 
      <Navigator/>
      {home && <Home/>}
      
    </main>
  )
}

export default App
