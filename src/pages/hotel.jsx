import { useParams, Link } from 'react-router-dom'
import { getHotel } from '../services/api.js'
import { Button, Card } from '../components/ui.jsx'

export default function Hotel(){
  const { id } = useParams()
  const h = getHotel(id)
  if(!h) return <p>Hôtel introuvable.</p>

  return (
    <section>
      <div className="card">
        <img src={h.image} alt={h.name}/>
        <div className="card-body">
          <h1 className="card-title">{h.name}</h1>
          <p className="card-sub">{h.city} • {h.stars}★ • ★ {h.rating} • {h.reviews} avis</p>
          <p>Équipements : {h.amenities.join(', ')}</p>
          <p>À partir de <span className="price">{h.price} €/nuit</span></p>
          <div style={{display:'flex',gap:10,marginTop:8}}>
            <Button>Réserver</Button>
            <Link className="btn ghost" to="/results">Retour</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

