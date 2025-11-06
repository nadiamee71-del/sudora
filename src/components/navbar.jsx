import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const hotel = JSON.parse(localStorage.getItem('sudora_hotel') || 'null')

  return (
    <header className="nav">
      <div className="brand">Sudora</div>
      <nav className="links">
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/activities">Activités</NavLink>
        <NavLink to="/hotels">Hôtels</NavLink>
        <NavLink to="/bookings">Mes billets</NavLink>
        <NavLink to="/profile">Profil</NavLink>
        <NavLink to="/admin">Gestion</NavLink>
        {hotel ? (
          <NavLink to="/hotel/dashboard">Extranet</NavLink>
        ) : (
          <NavLink to="/hotel/login">Connexion Hôtel</NavLink>
        )}
      </nav>
    </header>
  )
}
