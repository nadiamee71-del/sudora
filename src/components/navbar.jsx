import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const hotel = JSON.parse(localStorage.getItem('sudora_hotel') || 'null')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="nav">
      <div className="brand">Sudora</div>
      
      {/* Bouton menu burger */}
      <button
        className="menu-burger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span style={{
          transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
        }}></span>
        <span style={{
          opacity: menuOpen ? 0 : 1
        }}></span>
        <span style={{
          transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
        }}></span>
      </button>

      {/* Menu de navigation */}
      <nav className={`links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Accueil</NavLink>
        <NavLink to="/activities" onClick={() => setMenuOpen(false)}>Activités</NavLink>
        <NavLink to="/hotels" onClick={() => setMenuOpen(false)}>Hôtels</NavLink>
        <NavLink to="/bookings" onClick={() => setMenuOpen(false)}>Mes billets</NavLink>
        <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profil</NavLink>
        <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Gestion</NavLink>
        {hotel ? (
          <NavLink to="/hotel/dashboard" onClick={() => setMenuOpen(false)}>Extranet</NavLink>
        ) : (
          <NavLink to="/hotel/login" onClick={() => setMenuOpen(false)}>Connexion Hôtel</NavLink>
        )}
      </nav>

      {/* Overlay pour fermer le menu */}
      <div
        className={`menu-overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </header>
  )
}
