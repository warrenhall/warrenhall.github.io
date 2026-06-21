import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <main key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <AnimatedRoutes />
    </HashRouter>
  )
}
