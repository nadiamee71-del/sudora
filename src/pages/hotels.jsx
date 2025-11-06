import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { listHotels } from '../services/api.js'
import { Input, Select, Pill, Card } from '../components/ui.jsx'

const STARS = [
  {id:'', label:'Tous'},
  {id:'5', label:'5 étoiles'},
  {id:'4', label:'4 étoiles'},
]

export default function Hotels() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [stars, setStars] = useState('')
  const [sort, setSort] = useState('smart')

  const hotels = useMemo(() =>
    listHotels({q: search, city, stars, sort}),
    [search, city, stars, sort]
  )

  return (
    <section style={{padding:0}}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(43,116,255,0.9) 0%, rgba(255,215,104,0.8) 100%), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920") center/cover',
        padding: '60px 24px',
        textAlign: 'center',
        color: 'white',
        marginBottom: 48
      }}>
        <div style={{maxWidth: 1100, margin: '0 auto'}}>
          <h1 style={{fontSize: '3rem', fontWeight: 800, marginBottom: 16, textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
            Hôtels partenaires
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            Découvrez nos hôtels partenaires sur la Côte d'Azur
          </p>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Filtres */}
        <div style={{
          background: 'white',
          border: '1px solid var(--bord)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 32,
          boxShadow: 'var(--shadow)'
        }}>
          <div style={{marginBottom: 20}}>
            <div className="pills" style={{gap: 12}}>
              {STARS.map(star => (
                <Pill
                  key={star.id}
                  active={stars === star.id}
                  onClick={() => setStars(star.id)}
                  style={{
                    padding: '12px 20px',
                    fontSize: '1rem'
                  }}
                >
                  {star.label}
                </Pill>
              ))}
            </div>
          </div>
          <div className="searchbar-responsive searchbar-3">
            <Input
              placeholder="Rechercher un hôtel..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            />
            <Input
              placeholder="Ville (Nice, Cannes, Monaco...)"
              value={city}
              onChange={e => setCity(e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            />
            <Select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            >
              <option value="smart">Pertinence</option>
              <option value="price-asc">Prix ↑</option>
              <option value="price-desc">Prix ↓</option>
              <option value="rating">Mieux noté</option>
            </Select>
          </div>
        </div>

        {/* Compteur */}
        <div style={{marginBottom: 24}}>
          <p style={{color: 'var(--gris)', fontSize: '1rem'}}>
            {hotels.length} {hotels.length === 1 ? 'hôtel trouvé' : 'hôtels trouvés'}
          </p>
        </div>

        {/* Grille d'hôtels */}
        {hotels.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'var(--sable)',
            borderRadius: 16
          }}>
            <div style={{fontSize: '4rem', marginBottom: 16}}>🏨</div>
            <h2 style={{fontSize: '1.5rem', marginBottom: 8, color: 'var(--encre)'}}>
              Aucun hôtel trouvé
            </h2>
            <p style={{color: 'var(--gris)'}}>
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="grid cols-3" style={{gap: 24}}>
            {hotels.map(h => (
              <Card
                key={h.id}
                style={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(43,116,255,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow)'
                }}
              >
                <div style={{position: 'relative', height: 200, overflow: 'hidden'}}>
                  <img
                    src={h.image}
                    alt={h.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div className="badge" style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'var(--soleil)',
                    color: '#000',
                    padding: '6px 12px',
                    borderRadius: 20,
                    fontWeight: 700,
                    fontSize: 14
                  }}>
                    ★ {h.rating}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700
                  }}>
                    {h.stars}★
                  </div>
                </div>
                <div className="card-body" style={{padding: 20, flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div className="card-title" style={{
                    fontSize: '1.2rem',
                    marginBottom: 8,
                    color: 'var(--encre)',
                    fontWeight: 700,
                    lineHeight: 1.3
                  }}>
                    {h.name}
                  </div>
                  <p className="card-sub" style={{
                    color: 'var(--gris)',
                    fontSize: '0.95rem',
                    marginBottom: 12,
                    flex: 1
                  }}>
                    📍 {h.city} • {h.reviews} avis
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginBottom: 16
                  }}>
                    {h.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(43,116,255,0.1)',
                          color: 'var(--azur)',
                          padding: '4px 10px',
                          borderRadius: 20,
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                    {h.amenities.length > 3 && (
                      <span style={{
                        color: 'var(--gris)',
                        fontSize: '0.8rem',
                        padding: '4px 10px'
                      }}>
                        +{h.amenities.length - 3}
                      </span>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: 16,
                    borderTop: '1px solid var(--bord)'
                  }}>
                    <div>
                      <p className="price" style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--azur)',
                        margin: 0
                      }}>
                        {h.price} €
                      </p>
                      <span style={{fontSize: '0.85rem', color: 'var(--gris)'}}>/nuit</span>
                    </div>
                    <Link
                      to={`/hotel/${h.id}`}
                      className="btn ghost"
                      style={{
                        padding: '10px 20px',
                        fontSize: '0.95rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
