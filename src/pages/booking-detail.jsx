import { useParams, Link } from 'react-router-dom'
import { getBooking } from '../services/api.js'
import { Card, Button } from '../components/ui.jsx'

export default function BookingDetail(){
  const { id } = useParams()
  const booking = getBooking(id)

  if(!booking) return (
    <section style={{padding:0}}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(43,116,255,0.9) 0%, rgba(255,215,104,0.8) 100%), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920") center/cover',
        padding: '80px 24px',
        textAlign: 'center',
        color: 'white',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <div style={{fontSize: '4rem', marginBottom: 16}}>❌</div>
          <h1 style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: 8}}>Réservation introuvable</h1>
          <p style={{fontSize: '1.2rem', marginBottom: 24, opacity: 0.95}}>
            Cette réservation n'existe pas ou a été supprimée.
          </p>
          <Link to="/bookings">
            <Button style={{background: 'white', color: 'var(--azur)', border: 'none'}}>
              Retour à mes billets
            </Button>
          </Link>
        </div>
      </div>
    </section>
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
          <div style={{
            width: 100,
            height: 100,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '3rem',
            backdropFilter: 'blur(10px)'
          }}>
            ✓
          </div>
          <h1 style={{fontSize: '3rem', fontWeight: 800, marginBottom: 16, textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
            Réservation confirmée
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            Votre billet électronique est prêt
          </p>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        <Card>
          <div className="card-body" style={{padding: 40}}>
            {/* QR Code */}
            <div style={{
              background: 'linear-gradient(135deg, #f5faff 0%, #ffffff 100%)',
              border: '2px dashed var(--azur)',
              padding: 40,
              borderRadius: 20,
              marginBottom: 40,
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 800,
                color: 'var(--azur)',
                marginBottom: 16,
                letterSpacing: 2,
                fontFamily: 'monospace'
              }}>
                {booking.qrCode}
              </div>
              <p style={{
                fontSize: 14,
                color: 'var(--gris)',
                marginBottom: 8,
                fontWeight: 600
              }}>
                Code QR à présenter à l'entrée
              </p>
              <div style={{
                display: 'inline-block',
                background: 'var(--azur)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                marginTop: 12
              }}>
                Scannez ce code pour valider votre entrée
              </div>
            </div>

            {/* Informations */}
            <div style={{
              background: 'var(--sable)',
              borderRadius: 16,
              padding: 32,
              marginBottom: 32
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: 24,
                color: 'var(--encre)'
              }}>
                Détails de la réservation
              </h2>
              <div className="layout-2cols-responsive" style={{gap: 20}}>
                <div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--gris)',
                    marginBottom: 6,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}>
                    Activité
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--encre)'
                  }}>
                    {booking.activityTitle}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--gris)',
                    marginBottom: 6,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}>
                    Date de l'activité
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--encre)'
                  }}>
                    {new Date(booking.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--gris)',
                    marginBottom: 6,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}>
                    Nom du client
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--encre)'
                  }}>
                    {booking.guestName}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--gris)',
                    marginBottom: 6,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}>
                    Email
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    color: 'var(--encre)'
                  }}>
                    {booking.guestEmail}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--gris)',
                    marginBottom: 6,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}>
                    Nombre de billets
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--encre)'
                  }}>
                    {booking.quantity} {booking.quantity === 1 ? 'billet' : 'billets'}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--gris)',
                    marginBottom: 6,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5
                  }}>
                    Montant total
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--azur)'
                  }}>
                    {booking.total.toFixed(2)} €
                  </div>
                </div>
              </div>
            </div>

            {booking.promoCode && (
              <div style={{
                background: 'rgba(255,215,104,0.2)',
                border: '1px solid var(--soleil)',
                padding: 16,
                borderRadius: 12,
                marginBottom: 32,
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <span style={{fontSize: '1.5rem'}}>🎟️</span>
                <div>
                  <div style={{fontWeight: 600, marginBottom: 4}}>
                    Code promo utilisé
                  </div>
                  <div style={{fontSize: '0.9rem', color: 'var(--gris)'}}>
                    <strong>{booking.promoCode}</strong> • Réduction appliquée
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Button
                onClick={()=>window.print()}
                style={{
                  padding: '14px 32px',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                📄 Imprimer le billet
              </Button>
              <Link
                to="/bookings"
                className="btn ghost"
                style={{
                  padding: '14px 32px',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                Mes billets
              </Link>
            </div>

            {/* Instructions */}
            <div style={{
              marginTop: 40,
              padding: 24,
              background: 'var(--sable)',
              borderRadius: 12,
              fontSize: '0.9rem',
              color: 'var(--gris)',
              lineHeight: 1.7
            }}>
              <div style={{fontWeight: 700, marginBottom: 12, color: 'var(--encre)'}}>
                Instructions importantes :
              </div>
              <div>• Présentez ce QR code à l'entrée de l'activité</div>
              <div>• Arrivez 10 minutes avant l'heure prévue</div>
              <div>• Le billet est valable uniquement pour la date indiquée</div>
              <div>• En cas de problème, contactez le support Sudora</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
