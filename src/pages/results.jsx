import { useSearchParams, Link } from 'react-router-dom'
import { searchAll } from '../services/api.js'
import { Select, Input, Button, Card } from '../components/ui.jsx'
import { useState, useMemo } from 'react'

export default function Results(){
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q')||''
  const city = sp.get('city')||''
  const category = sp.get('category')||''
  const stars = sp.get('stars')||''
  const sort = sp.get('sort')||'smart'
  const [state, setState] = useState({q, city, category, stars, sort})

  const items = useMemo(()=>searchAll(state), [state])

  function update(key, val){
    const next = {...state, [key]:val}
    setState(next)
    const p = new URLSearchParams(next); Object.keys(next).forEach(k=>!next[k] && p.delete(k))
    setSp(p)
  }

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
            Résultats de recherche
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            {items.length} {items.length === 1 ? 'résultat trouvé' : 'résultats trouvés'}
          </p>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Barre de filtres */}
        <div style={{
          background: 'white',
          border: '1px solid var(--bord)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 32,
          boxShadow: 'var(--shadow)'
        }}>
          <div className="searchbar-responsive searchbar-5">
            <Input
              placeholder="Mot-clé (ex: voile, musée, spa…)"
              value={state.q}
              onChange={e=>update('q', e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            />
            <Input
              placeholder="Ville"
              value={state.city}
              onChange={e=>update('city', e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            />
            <Select
              value={state.category}
              onChange={e=>update('category', e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            >
              <option value="">Toutes catégories</option>
              <option value="mer">🌊 Mer</option>
              <option value="culture">🎨 Culture</option>
              <option value="atelier">👨‍🎨 Ateliers</option>
              <option value="nature">🏔️ Nature</option>
            </Select>
            <Select
              value={state.stars}
              onChange={e=>update('stars', e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            >
              <option value="">Tous hôtels</option>
              <option value="5">5 étoiles</option>
              <option value="4">4 étoiles</option>
            </Select>
            <Select
              value={state.sort}
              onChange={e=>update('sort', e.target.value)}
              style={{border: '1px solid var(--bord)'}}
            >
              <option value="smart">Pertinence</option>
              <option value="price-asc">Prix ↑</option>
              <option value="price-desc">Prix ↓</option>
              <option value="rating">Mieux noté</option>
            </Select>
          </div>
        </div>

        {/* Résultats */}
        {items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'var(--sable)',
            borderRadius: 16
          }}>
            <div style={{fontSize: '4rem', marginBottom: 16}}>🔍</div>
            <h2 style={{fontSize: '1.5rem', marginBottom: 8, color: 'var(--encre)'}}>
              Aucun résultat trouvé
            </h2>
            <p style={{color: 'var(--gris)', marginBottom: 24}}>
              Essayez d'élargir votre recherche ou de modifier les filtres
            </p>
            <Button onClick={()=>{setState({q:'', city:'', category:'', stars:'', sort:'smart'}); setSp(new URLSearchParams())}}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid cols-3" style={{gap: 24}}>
            {items.map(item=>{
              const isHotel = item.type === 'hotel'
              const link = isHotel ? `/hotel/${item.id}` : `/activity/${item.id}`

              return (
                <Card
                  key={item.id}
                  style={{
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e)=>{
                    e.currentTarget.style.transform='translateY(-4px)'
                    e.currentTarget.style.boxShadow='0 12px 32px rgba(43,116,255,0.15)'
                  }}
                  onMouseLeave={(e)=>{
                    e.currentTarget.style.transform='translateY(0)'
                    e.currentTarget.style.boxShadow='var(--shadow)'
                  }}
                >
                  <div style={{position: 'relative', height: 200, overflow: 'hidden'}}>
                    <img
                      src={item.image}
                      alt={item.title || item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
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
                      ★ {item.rating}
                    </div>
                    {isHotel && (
                      <div style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {item.stars}★
                      </div>
                    )}
                    {!isHotel && (
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
                        {item.category}
                      </div>
                    )}
                  </div>
                  <div className="card-body" style={{padding: 20, flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <div className="card-title" style={{
                      fontSize: '1.2rem',
                      marginBottom: 8,
                      color: 'var(--encre)',
                      fontWeight: 700,
                      lineHeight: 1.3
                    }}>
                      {item.title || item.name}
                    </div>
                    <p className="card-sub" style={{
                      color: 'var(--gris)',
                      fontSize: '0.95rem',
                      marginBottom: 16,
                      flex: 1
                    }}>
                      📍 {item.city} • {item.reviews} avis {isHotel && `• ${item.stars}★`}
                    </p>
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
                          {item.price} €
                        </p>
                        {isHotel && (
                          <span style={{fontSize: '0.85rem', color: 'var(--gris)'}}>/nuit</span>
                        )}
                      </div>
                      <Link
                        to={link}
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
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
