import { useNavigate, Link } from 'react-router-dom'
import { Input, Select, Pill, Button, Card } from '../components/ui.jsx'
import { searchAll } from '../services/api.js'
import { useState } from 'react'

const CATS = [
  {id:'mer', label:'Mer', icon:'🌊'},
  {id:'culture', label:'Culture', icon:'🎨'},
  {id:'atelier', label:'Ateliers', icon:'👨‍🎨'},
  {id:'nature', label:'Nature', icon:'🏔️'},
]

export default function Home(){
  const nav = useNavigate()
  const [q,setQ] = useState('')
  const [city,setCity] = useState('')
  const [cat,setCat] = useState('')

  function goSearch(){
    const p = new URLSearchParams()
    if(q) p.set('q', q)
    if(city) p.set('city', city)
    if(cat) p.set('category', cat)
    nav('/results?'+p.toString())
  }

  const top = searchAll({sort:'smart'}).slice(0,6)

  return (
    <section style={{padding:0}}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(43,116,255,0.9) 0%, rgba(255,215,104,0.8) 100%), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920") center/cover',
        padding: '80px 24px',
        textAlign: 'center',
        color: 'white',
        marginBottom: 48
      }}>
        <div style={{maxWidth: 800, margin: '0 auto'}}>
          <h1 style={{fontSize: '3.5rem', fontWeight: 800, marginBottom: 16, textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
            Bienvenue sur Sudora
          </h1>
          <p style={{fontSize: '1.3rem', marginBottom: 40, opacity: 0.95, lineHeight: 1.6}}>
            Découvrez les meilleures activités et hôtels de la Côte d'Azur : mer, culture, gastronomie, bien-être.
          </p>
          
          {/* Barre de recherche */}
          <div className="searchbar-responsive searchbar-4-auto" style={{
            background: 'white',
            borderRadius: 16,
            padding: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <Input 
              placeholder="Que cherchez-vous ? (ex: voile, hôtel, parfum…)" 
              value={q} 
              onChange={e=>setQ(e.target.value)}
              style={{border: 'none', background: '#f5f7fa'}}
            />
            <Input 
              placeholder="Ville (Nice, Cannes, Antibes…)" 
              value={city} 
              onChange={e=>setCity(e.target.value)}
              style={{border: 'none', background: '#f5f7fa'}}
            />
            <Select 
              value={cat} 
              onChange={e=>setCat(e.target.value)}
              style={{border: 'none', background: '#f5f7fa'}}
            >
              <option value="">Catégorie</option>
              {CATS.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
            </Select>
            <Button 
              onClick={goSearch}
              style={{
                background: 'var(--azur)',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                whiteSpace: 'nowrap'
              }}
            >
              Rechercher
            </Button>
          </div>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Section Catégories */}
        <div style={{marginBottom: 48}}>
          <h2 style={{fontSize: '2rem', fontWeight: 700, marginBottom: 24, color: 'var(--encre)'}}>
            Explorez par catégorie
          </h2>
          <div className="pills" style={{gap: 16}}>
            {CATS.map(c=>(
              <Pill 
                key={c.id} 
                active={cat===c.id} 
                onClick={()=>{setCat(c.id); nav('/results?category='+c.id)}}
                style={{
                  padding: '16px 24px',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span style={{fontSize: '1.5rem'}}>{c.icon}</span>
                {c.label}
              </Pill>
            ))}
          </div>
        </div>

        {/* Section À découvrir */}
        <div style={{marginBottom: 48}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32}}>
            <h2 style={{fontSize: '2rem', fontWeight: 700, color: 'var(--encre)'}}>
              À découvrir
            </h2>
            <Link 
              to="/results" 
              style={{
                color: 'var(--azur)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              Voir tout <span>→</span>
            </Link>
          </div>
          
          <div className="grid cols-3" style={{gap: 24}}>
            {top.map(item=>{
              const isHotel = item.type === 'hotel'
              const link = isHotel ? `/hotel/${item.id}` : `/activity/${item.id}`
              
              return (
                <Card key={item.id} style={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e)=>{e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(43,116,255,0.15)'}}
                onMouseLeave={(e)=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow)'}}
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
                        padding: '4px 10px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {item.stars}★
                      </div>
                    )}
                  </div>
                  <div className="card-body" style={{padding: 20}}>
                    <div className="card-title" style={{
                      fontSize: '1.2rem',
                      marginBottom: 8,
                      color: 'var(--encre)',
                      fontWeight: 700
                    }}>
                      {item.title || item.name}
                    </div>
                    <p className="card-sub" style={{
                      color: 'var(--gris)',
                      fontSize: '0.95rem',
                      marginBottom: 12
                    }}>
                      {item.city} • {item.reviews} avis {isHotel && `• ${item.stars}★`}
                    </p>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <p className="price" style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--azur)',
                        margin: 0
                      }}>
                        {item.price} €{isHotel ? '/nuit' : ''}
                      </p>
                      <Link 
                        to={link}
                        className="btn ghost"
                        style={{
                          padding: '10px 20px',
                          fontSize: '0.95rem'
                        }}
                      >
                        Voir
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Section CTA */}
        <div style={{
          background: 'linear-gradient(135deg, var(--azur) 0%, var(--azur-600) 100%)',
          borderRadius: 24,
          padding: '60px 40px',
          textAlign: 'center',
          color: 'white',
          marginBottom: 48
        }}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: 16}}>
            Vous êtes un hôtel partenaire ?
          </h2>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            Rejoignez notre réseau et proposez les meilleures activités à vos clients
          </p>
          <Link to="/hotel/login">
            <Button style={{
              background: 'white',
              color: 'var(--azur)',
              border: 'none',
              padding: '16px 40px',
              fontSize: '1.1rem',
              fontWeight: 700
            }}>
              Accéder à l'extranet
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
