import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBookingsByGuest } from '../services/api.js'
import { Card, Input, Button } from '../components/ui.jsx'

export default function Bookings(){
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [searched, setSearched] = useState(false)

  function handleSearch(){
    if(email){
      const results = getBookingsByGuest(email)
      setBookings(results)
      setSearched(true)
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
            Mes billets
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            Retrouvez vos réservations avec votre adresse email
          </p>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Recherche */}
        <Card style={{marginBottom: 32}}>
          <div className="card-body" style={{padding: 32}}>
            <div style={{maxWidth: 600, margin: '0 auto'}}>
              <label style={{
                display: 'block',
                marginBottom: 12,
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--encre)'
              }}>
                Votre adresse email
              </label>
              <div style={{display: 'flex', gap: 12}}>
                <Input
                  type="email"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  onKeyPress={e=>e.key === 'Enter' && handleSearch()}
                  style={{
                    flex: 1,
                    border: '1px solid var(--bord)',
                    padding: '14px 18px',
                    fontSize: '1rem'
                  }}
                />
                <Button
                  onClick={handleSearch}
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
              <p style={{
                marginTop: 12,
                fontSize: '0.9rem',
                color: 'var(--gris)'
              }}>
                Entrez l'email utilisé lors de votre réservation
              </p>
            </div>
          </div>
        </Card>

        {/* Résultats */}
        {searched && (
          <>
            {bookings.length === 0 ? (
              <Card>
                <div className="card-body" style={{padding: 60, textAlign: 'center'}}>
                  <div style={{fontSize: '4rem', marginBottom: 16}}>📭</div>
                  <h2 style={{fontSize: '1.5rem', marginBottom: 8, color: 'var(--encre)'}}>
                    Aucune réservation trouvée
                  </h2>
                  <p style={{color: 'var(--gris)', marginBottom: 24}}>
                    Aucune réservation n'a été trouvée pour l'adresse <strong>{email}</strong>
                  </p>
                  <p style={{fontSize: '0.9rem', color: 'var(--gris)'}}>
                    Vérifiez que vous avez bien saisi l'email utilisé lors de la réservation
                  </p>
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
                                month: 'long'
                              })}
                            </p>
                            <p style={{fontSize: '0.9rem', color: 'var(--gris)', marginBottom: 8}}>
                              {b.quantity} {b.quantity === 1 ? 'billet' : 'billets'}
                            </p>
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

        {/* Message initial */}
        {!searched && (
          <Card>
            <div className="card-body" style={{padding: 60, textAlign: 'center'}}>
              <div style={{fontSize: '4rem', marginBottom: 16}}>🎫</div>
              <h2 style={{fontSize: '1.5rem', marginBottom: 8, color: 'var(--encre)'}}>
                Recherchez vos billets
              </h2>
              <p style={{color: 'var(--gris)'}}>
                Entrez votre adresse email ci-dessus pour retrouver toutes vos réservations
              </p>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
