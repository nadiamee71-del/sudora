import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { listActivities } from '../services/api.js'
import { Input, Select, Card } from '../components/ui.jsx'

const CATS = [
  {id:'', label:'Toutes', icon:'🌟'},
  {id:'mer', label:'Mer', icon:'🌊'},
  {id:'culture', label:'Culture', icon:'🎨'},
  {id:'atelier', label:'Ateliers', icon:'👨‍🎨'},
  {id:'nature', label:'Nature', icon:'🏔️'},
]

export default function Activities() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('smart')

  const activities = useMemo(() =>
    listActivities({q: search, city, category, sort}),
    [search, city, category, sort]
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
            Toutes les activités
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            Découvrez notre catalogue complet d'activités sur la Côte d'Azur
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
            <div style={{
              display: 'flex',
              gap: 0,
              borderBottom: '2px solid var(--bord)',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingBottom: 0
            }}
            className="tabs-container"
            >
              <style>{`
                .tabs-container::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {CATS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    padding: '14px 20px',
                    fontSize: '0.95rem',
                    fontWeight: category === cat.id ? 700 : 600,
                    background: category === cat.id ? 'var(--azur)' : 'transparent',
                    border: 'none',
                    borderBottom: category === cat.id ? '3px solid var(--azur)' : '3px solid transparent',
                    color: category === cat.id ? '#fff' : 'var(--gris)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.2s',
                    position: 'relative',
                    bottom: '-2px',
                    borderRadius: '8px 8px 0 0',
                    marginRight: 4
                  }}
                  onMouseEnter={(e) => {
                    if (category !== cat.id) {
                      e.currentTarget.style.color = 'var(--azur)';
                      e.currentTarget.style.background = 'rgba(43,116,255,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (category !== cat.id) {
                      e.currentTarget.style.color = 'var(--gris)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span style={{fontSize: '1.2rem'}}>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="searchbar-responsive searchbar-3">
            <Input
              placeholder="Rechercher une activité..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            />
            <Input
              placeholder="Ville (Nice, Cannes, Antibes...)"
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
            {activities.length} {activities.length === 1 ? 'activité trouvée' : 'activités trouvées'}
          </p>
        </div>

        {/* Grille d'activités */}
        {activities.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'var(--sable)',
            borderRadius: 16
          }}>
            <div style={{fontSize: '4rem', marginBottom: 16}}>🔍</div>
            <h2 style={{fontSize: '1.5rem', marginBottom: 8, color: 'var(--encre)'}}>
              Aucune activité trouvée
            </h2>
            <p style={{color: 'var(--gris)'}}>
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className="grid cols-3" style={{gap: 24}}>
            {activities.map(a => (
              <Card
                key={a.id}
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
                    src={a.image}
                    alt={a.title}
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
                    ★ {a.rating}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    background: 'rgba(43,116,255,0.9)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {a.category}
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
                    {a.title}
                  </div>
                  <p className="card-sub" style={{
                    color: 'var(--gris)',
                    fontSize: '0.95rem',
                    marginBottom: 16,
                    flex: 1
                  }}>
                    📍 {a.city} • {a.reviews} avis
                  </p>
                  {a.description && (
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--gris)',
                      marginBottom: 16,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {a.description}
                    </p>
                  )}
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
                        {a.price} €
                      </p>
                    </div>
                    <Link
                      to={`/activity/${a.id}`}
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
