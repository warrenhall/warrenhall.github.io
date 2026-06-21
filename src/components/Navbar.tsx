import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold tracking-wide transition-colors ${
    isActive ? 'text-emerald-300' : 'text-neutral-400 hover:text-neutral-100'
  }`

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
      <NavLink to="/" className="shrink-0" aria-label="Home">
        <img src="/img/logo.png" alt="Warren Hall logo" className="h-10 w-10" />
      </NavLink>
      <div className="flex items-center gap-6">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </div>
    </nav>
  )
}
