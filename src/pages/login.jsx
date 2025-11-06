import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser, registerUser } from '../services/api.js'
import { Input, Button, Card } from '../components/ui.jsx'

export default function Login(){
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    
    if(isRegister){
      // Inscription
      const result = registerUser(email, password, name, phone)
      if(result.success){
        localStorage.setItem('sudora_user', JSON.stringify(result.user))
        localStorage.setItem('sudora_profile', JSON.stringify({
          email: result.user.email,
          name: result.user.name,
          phone: result.user.phone
        }))
        nav('/profile')
      } else {
        setError(result.error)
      }
    } else {
      // Connexion
      const result = loginUser(email, password)
      if(result.success){
        localStorage.setItem('sudora_user', JSON.stringify(result.user))
        localStorage.setItem('sudora_profile', JSON.stringify({
          email: result.user.email,
          name: result.user.name,
          phone: result.user.phone
        }))
        nav('/profile')
      } else {
        setError(result.error)
      }
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
            {isRegister ? 'Créer un compte' : 'Connexion'}
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            {isRegister ? 'Rejoignez Sudora pour réserver vos activités' : 'Connectez-vous pour accéder à votre profil'}
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
                  {isRegister ? 'Nouveau compte' : 'Identifiants de connexion'}
                </h2>
                <p style={{color: 'var(--gris)', fontSize: '0.95rem'}}>
                  {isRegister ? 'Remplissez le formulaire ci-dessous' : 'Connectez-vous avec votre email'}
                </p>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div style={{marginBottom: 20}}>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--encre)'
                    }}>
                      Nom complet
                    </label>
                    <Input
                      placeholder="Votre nom"
                      value={name}
                      onChange={e=>{setName(e.target.value); setError('')}}
                      style={{
                        border: error ? '2px solid red' : '1px solid var(--bord)',
                        padding: '14px 18px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>
                )}

                <div style={{marginBottom: 20}}>
                  <label style={{
                    display: 'block',
                    marginBottom: 8,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--encre)'
                  }}>
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={e=>{setEmail(e.target.value); setError('')}}
                    style={{
                      border: error ? '2px solid red' : '1px solid var(--bord)',
                      padding: '14px 18px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>

                {isRegister && (
                  <div style={{marginBottom: 20}}>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--encre)'
                    }}>
                      Téléphone (optionnel)
                    </label>
                    <Input
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={phone}
                      onChange={e=>{setPhone(e.target.value); setError('')}}
                      style={{
                        border: '1px solid var(--bord)',
                        padding: '14px 18px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                )}

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
                    placeholder={isRegister ? "Minimum 6 caractères" : "Votre mot de passe"}
                    value={password}
                    onChange={e=>{setPassword(e.target.value); setError('')}}
                    style={{
                      border: error ? '2px solid red' : '1px solid var(--bord)',
                      padding: '14px 18px',
                      fontSize: '1rem'
                    }}
                    minLength={6}
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
                  {isRegister ? 'Créer mon compte' : 'Se connecter'}
                </Button>
              </form>

              {/* Info compte de test */}
              {!isRegister && (
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
                    Compte de test
                  </div>
                  <div style={{fontSize: '0.85rem'}}>
                    Email : <strong>testeuse@sudora.fr</strong><br/>
                    Mot de passe : <strong>test123</strong>
                  </div>
                </div>
              )}

              {/* Toggle Inscription/Connexion */}
              <div style={{
                textAlign: 'center',
                paddingTop: 24,
                borderTop: '1px solid var(--bord)'
              }}>
                <p style={{color: 'var(--gris)', fontSize: '0.95rem', marginBottom: 12}}>
                  {isRegister ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
                </p>
                <button
                  onClick={() => {
                    setIsRegister(!isRegister)
                    setError('')
                    setEmail('')
                    setPassword('')
                    setName('')
                    setPhone('')
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--azur)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {isRegister ? 'Se connecter' : 'Créer un compte'}
                </button>
              </div>

              {/* Lien retour */}
              <div style={{
                textAlign: 'center',
                paddingTop: 16,
                marginTop: 16,
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

