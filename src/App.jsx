import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Principal from './pages/Principal/Principal'
import { useAuth } from './providers/AuthProvider'

function App() {
  const {isAuthenticated } = useAuth()
  return (
      <div>
        {isAuthenticated  ? <Principal/>: <Home/>}
      </div>
  )
}

export default App
