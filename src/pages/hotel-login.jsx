import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginHotel } from '../services/api.js'
import { Input, Button, Card } from '../components/ui.jsx'

export default function HotelLogin(){
  const nav = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    const hotel = loginHotel(login, password)
    if(hotel){
      localStorage.setItem('sudora_hotel', JSON.stringify(hotel))
      nav('/hotel/dashboard')
    } else {
      setError('Identifiants incorrects')
    }
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
            Connexion Hôtel
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            Accès à l'extranet Sudora pour les hôtels partenaires
          </p>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        <div style={{maxWidth: 450, margin: '0 auto', width: '100%'}}>
          <Card>
            <div className="card-body" style={{padding: 40}}>
              {/* Logo/Header */}
              <div style={{textAlign: 'center', marginBottom: 32}}>
                <div style={{
                  width: 80,
                  height: 80,
                  background: 'linear-gradient(135deg, var(--azur) 0%, var(--azur-600) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'white'
                }}>
                  S
                </div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: 8,
                  color: 'var(--encre)'
                }}>
                  Identifiants de connexion
                </h2>
                <p style={{color: 'var(--gris)', fontSize: '0.95rem'}}>
                  Connectez-vous avec vos identifiants hôtel
                </p>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit}>
                <div style={{marginBottom: 20}}>
                  <label style={{
                    display: 'block',
                    marginBottom: 8,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--encre)'
                  }}>
                    Identifiant hôtel
                  </label>
                  <Input
                    placeholder="Votre identifiant"
                    value={login}
                    onChange={e=>{setLogin(e.target.value); setError('')}}
                    style={{
                      border: error ? '2px solid red' : '1px solid var(--bord)',
                      padding: '14px 18px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>

                <div style={{marginBottom: 24}}>
                  <label style={{
                    display: 'block',
                    marginBottom: 8,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--encre)'
                  }}>
                    Mot de passe
                  </label>
                  <Input
                    type="password"
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={e=>{setPassword(e.target.value); setError('')}}
                    style={{
                      border: error ? '2px solid red' : '1px solid var(--bord)',
                      padding: '14px 18px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>

                {error && (
                  <div style={{
                    background: 'rgba(255,0,0,0.1)',
                    border: '1px solid red',
                    color: 'red',
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 20,
                    fontSize: '0.9rem',
                    textAlign: 'center'
                  }}>
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: 20
                  }}
                >
                  Se connecter
                </Button>
              </form>

              {/* Info démo */}
              <div style={{
                background: 'var(--sable)',
                padding: 16,
                borderRadius: 12,
                fontSize: '0.9rem',
                color: 'var(--gris)',
                textAlign: 'center',
                marginBottom: 24
              }}>
                <div style={{fontWeight: 600, marginBottom: 8, color: 'var(--encre)'}}>
                  Compte de démonstration
                </div>
                <div style={{fontSize: '0.85rem'}}>
                  Identifiant : <strong>negresco</strong><br/>
                  Mot de passe : <strong>demo123</strong>
                </div>
              </div>

              {/* Lien retour */}
              <div style={{
                textAlign: 'center',
                paddingTop: 24,
                borderTop: '1px solid var(--bord)'
              }}>
                <Link
                  to="/"
                  style={{
                    color: 'var(--azur)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  ← Retour à l'accueil
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
