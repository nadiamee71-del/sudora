import { useState, useEffect } from 'react'
import { getBookingsByGuest } from '../services/api.js'
import { Card, Input, Button } from '../components/ui.jsx'
import { Link } from 'react-router-dom'

export default function Profile(){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState('info')

  // Charger les données depuis localStorage si disponibles
  useEffect(() => {
    const savedProfile = localStorage.getItem('sudora_profile')
    if(savedProfile){
      const profile = JSON.parse(savedProfile)
      setEmail(profile.email || '')
      setName(profile.name || '')
      setPhone(profile.phone || '')
      if(profile.email){
        setBookings(getBookingsByGuest(profile.email))
      }
    }
  }, [])

  function handleSaveProfile(){
    const profile = {
      email,
      name,
      phone
    }
    localStorage.setItem('sudora_profile', JSON.stringify(profile))
    if(email){
      setBookings(getBookingsByGuest(email))
    }
    alert('Profil sauvegardé avec succès !')
  }

  function handleSearchBookings(){
    if(email){
      const results = getBookingsByGuest(email)
      setBookings(results)
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
            Mon profil
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            Gérez vos informations personnelles et consultez vos réservations
          </p>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Tabs */}
        <div className="pills" style={{marginBottom: 32, gap: 12}}>
          <button
            className={`pill ${activeTab==='info'?'active':''}`}
            onClick={()=>setActiveTab('info')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            📝 Informations personnelles
          </button>
          <button
            className={`pill ${activeTab==='bookings'?'active':''}`}
            onClick={()=>setActiveTab('bookings')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            🎫 Mes réservations ({bookings.length})
          </button>
        </div>

        {/* Onglet Informations */}
        {activeTab === 'info' && (
          <Card>
            <div className="card-body" style={{padding: 40}}>
              <h2 style={{fontSize: '1.8rem', fontWeight: 700, marginBottom: 24, color: 'var(--encre)'}}>
                Informations personnelles
              </h2>

              <div style={{maxWidth: 600}}>
                <div style={{marginBottom: 24}}>
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
                    placeholder="Votre nom et prénom"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    style={{
                      border: '1px solid var(--bord)',
                      padding: '14px 18px',
                      fontSize: '1rem'
                    }}
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
                    Adresse email
                  </label>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    style={{
                      border: '1px solid var(--bord)',
                      padding: '14px 18px',
                      fontSize: '1rem'
                    }}
                  />
                  <p style={{
                    marginTop: 8,
                    fontSize: '0.85rem',
                    color: 'var(--gris)'
                  }}>
                    Cette adresse est utilisée pour retrouver vos réservations
                  </p>
                </div>

                <div style={{marginBottom: 32}}>
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
                    onChange={e=>setPhone(e.target.value)}
                    style={{
                      border: '1px solid var(--bord)',
                      padding: '14px 18px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <Button
                  onClick={handleSaveProfile}
                  style={{
                    padding: '14px 32px',
                    fontSize: '1rem',
                    fontWeight: 700
                  }}
                >
                  Enregistrer les modifications
                </Button>
              </div>

              {/* Section préférences */}
              <div style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: '2px solid var(--bord)'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: 20,
                  color: 'var(--encre)'
                }}>
                  Préférences
                </h3>
                <div style={{
                  background: 'var(--sable)',
                  padding: 24,
                  borderRadius: 12
                }}>
                  <p style={{color: 'var(--gris)', marginBottom: 16}}>
                    Recevoir des notifications par email pour :
                  </p>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer'
                    }}>
                      <input type="checkbox" defaultChecked style={{width: 18, height: 18}} />
                      <span>Nouvelles activités disponibles</span>
                    </label>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer'
                    }}>
                      <input type="checkbox" defaultChecked style={{width: 18, height: 18}} />
                      <span>Offres spéciales et codes promo</span>
                    </label>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      cursor: 'pointer'
                    }}>
                      <input type="checkbox" style={{width: 18, height: 18}} />
                      <span>Newsletter mensuelle</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Onglet Réservations */}
        {activeTab === 'bookings' && (
          <>
            {/* Recherche rapide */}
            <Card style={{marginBottom: 32}}>
              <div className="card-body" style={{padding: 24}}>
                <div style={{maxWidth: 500}}>
                  <label style={{
                    display: 'block',
                    marginBottom: 12,
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--encre)'
                  }}>
                    Rechercher mes réservations par email
                  </label>
                  <div style={{display: 'flex', gap: 12}}>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      onKeyPress={e=>e.key === 'Enter' && handleSearchBookings()}
                      style={{
                        flex: 1,
                        border: '1px solid var(--bord)',
                        padding: '14px 18px',
                        fontSize: '1rem'
                      }}
                    />
                    <Button
                      onClick={handleSearchBookings}
                      style={{
                        padding: '14px 32px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Rechercher
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Liste des réservations */}
            {bookings.length === 0 ? (
              <Card>
                <div className="card-body" style={{padding: 60, textAlign: 'center'}}>
                  <div style={{fontSize: '4rem', marginBottom: 16}}>🎫</div>
                  <h2 style={{fontSize: '1.5rem', marginBottom: 8, color: 'var(--encre)'}}>
                    Aucune réservation
                  </h2>
                  <p style={{color: 'var(--gris)', marginBottom: 24}}>
                    {email ?
                      `Aucune réservation trouvée pour ${email}` :
                      'Entrez votre email pour rechercher vos réservations'
                    }
                  </p>
                  <Link to="/">
                    <Button>Découvrir les activités</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <>
                <div style={{marginBottom: 24}}>
                  <p style={{color: 'var(--gris)', fontSize: '1rem'}}>
                    {bookings.length} {bookings.length === 1 ? 'réservation trouvée' : 'réservations trouvées'}
                  </p>
                </div>
                <div className="grid cols-2" style={{gap: 24}}>
                  {bookings.map(b=>(
                    <Card key={b.id} style={{
                      transition: 'transform 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-4px)'}
                    onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}
                    >
                      <div className="card-body" style={{padding: 24}}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: 16
                        }}>
                          <div style={{flex: 1}}>
                            <div className="card-title" style={{
                              fontSize: '1.3rem',
                              marginBottom: 8,
                              fontWeight: 700
                            }}>
                              {b.activityTitle}
                            </div>
                            <p className="card-sub" style={{marginBottom: 12}}>
                              📅 {new Date(b.date).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                            <p style={{fontSize: '0.9rem', color: 'var(--gris)', marginBottom: 8}}>
                              {b.quantity} {b.quantity === 1 ? 'billet' : 'billets'}
                            </p>
                            <div style={{
                              display: 'inline-block',
                              background: b.status === 'confirmed' ? 'rgba(43,116,255,0.1)' : 'rgba(255,0,0,0.1)',
                              color: b.status === 'confirmed' ? 'var(--azur)' : 'red',
                              padding: '4px 12px',
                              borderRadius: 20,
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              marginTop: 8
                            }}>
                              {b.status === 'confirmed' ? '✓ Confirmée' : b.status}
                            </div>
                          </div>
                          <div style={{
                            background: 'var(--sable)',
                            padding: 16,
                            borderRadius: 12,
                            textAlign: 'center',
                            minWidth: 100
                          }}>
                            <div style={{
                              fontSize: '1.5rem',
                              fontWeight: 800,
                              color: 'var(--azur)',
                              marginBottom: 4
                            }}>
                              {b.total.toFixed(2)} €
                            </div>
                          </div>
                        </div>

                        {/* QR Code */}
                        <div style={{
                          background: 'linear-gradient(135deg, #f5faff 0%, #ffffff 100%)',
                          border: '2px dashed var(--azur)',
                          padding: 20,
                          borderRadius: 12,
                          marginBottom: 16,
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: 'var(--azur)',
                            marginBottom: 8,
                            letterSpacing: 1,
                            fontFamily: 'monospace'
                          }}>
                            {b.qrCode}
                          </div>
                          <div style={{
                            fontSize: 11,
                            color: 'var(--gris)',
                            fontWeight: 600
                          }}>
                            Code QR
                          </div>
                        </div>

                        <Link
                          to={`/booking/${b.id}`}
                          className="btn ghost"
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '12px',
                            fontSize: '0.95rem',
                            fontWeight: 700
                          }}
                        >
                          Voir le billet complet
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}
