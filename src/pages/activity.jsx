import { useParams, Link, useNavigate } from 'react-router-dom'
import { getActivity, createBooking, validatePromoCode } from '../services/api.js'
import { Button, Card, Input } from '../components/ui.jsx'
import { useState } from 'react'

export default function Activity(){
  const { id } = useParams()
  const nav = useNavigate()
  const a = getActivity(id)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promo, setPromo] = useState(null)
  const [showBooking, setShowBooking] = useState(false)

  if(!a) return <p>Activité introuvable.</p>

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultDate = tomorrow.toISOString().split('T')[0]

  function handlePromoCode(){
    const validated = validatePromoCode(promoCode)
    if(validated){
      setPromo(validated)
    } else {
      setPromo(null)
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!guestName || !guestEmail || !date){
      alert('Veuillez remplir tous les champs')
      return
    }

    const booking = createBooking({
      activityId: id,
      hotelId: null,
      guestName,
      guestEmail,
      quantity,
      date,
      promoCode: promo ? promoCode : null
    })

    if(booking){
      nav(`/booking/${booking.id}`)
    }
  }

  const discount = promo ? (promo.type==='percent' ? a.price * promo.discount / 100 : promo.discount) : 0
  const unitPrice = a.price - discount
  const total = unitPrice * quantity

  return (
    <section style={{padding:0}}>
      {/* Hero Section avec image de l'activité */}
      <div style={{
        background: `linear-gradient(135deg, rgba(43,116,255,0.7) 0%, rgba(255,215,104,0.6) 100%), url(${a.image}) center/cover`,
        padding: '80px 24px',
        textAlign: 'center',
        color: 'white',
        marginBottom: 48
      }}>
        <div style={{maxWidth: 1100, margin: '0 auto'}}>
          <h1 style={{fontSize: '3.5rem', fontWeight: 800, marginBottom: 16, textShadow: '0 2px 10px rgba(0,0,0,0.3)'}}>
            {a.title}
          </h1>
          <div style={{display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginTop: 24}}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 24px',
              borderRadius: 20,
              backdropFilter: 'blur(10px)'
            }}>
              📍 {a.city}
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 24px',
              borderRadius: 20,
              backdropFilter: 'blur(10px)'
            }}>
              ★ {a.rating} ({a.reviews} avis)
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 24px',
              borderRadius: 20,
              backdropFilter: 'blur(10px)'
            }}>
              {a.price} €
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Breadcrumb */}
        <div style={{marginBottom: 24, fontSize: '0.9rem', color: 'var(--gris)'}}>
          <Link to="/" style={{color: 'var(--azur)'}}>Accueil</Link>
          {' > '}
          <Link to="/results" style={{color: 'var(--azur)'}}>Résultats</Link>
          {' > '}
          <span>{a.title}</span>
        </div>

        <div className="layout-2cols-responsive" style={{marginBottom: 32}}>
          {/* Colonne gauche - Informations */}
          <div>
            <Card>
              <div className="card-body" style={{padding: 24}}>
                {a.description && (
                  <div style={{marginBottom: 24}}>
                    <h2 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: 12, color: 'var(--encre)'}}>
                      Description
                    </h2>
                    <p style={{lineHeight: 1.7, color: 'var(--encre)'}}>
                      {a.description}
                    </p>
                  </div>
                )}
                <div style={{
                  background: 'var(--sable)',
                  padding: 20,
                  borderRadius: 12,
                  marginTop: 24
                }}>
                  <div style={{fontSize: '0.9rem', color: 'var(--gris)', marginBottom: 8}}>Prix à partir de</div>
                  <div style={{fontSize: '2.5rem', fontWeight: 800, color: 'var(--azur)'}}>
                    {a.price} €
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Colonne droite - Réservation */}
          <div>
            <Card style={{position: 'sticky', top: 100}}>
              <div className="card-body" style={{padding: 24}}>
                {!showBooking ? (
                  <>
                    <h2 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: 12}}>
                      Réserver cette activité
                    </h2>
                    <p style={{color: 'var(--gris)', marginBottom: 24, lineHeight: 1.6}}>
                      Remplissez le formulaire ci-dessous pour réserver vos billets.
                      Vous recevrez un QR code par email.
                    </p>
                    <Button
                      onClick={()=>setShowBooking(true)}
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '1.1rem',
                        fontWeight: 700
                      }}
                    >
                      Réserver maintenant
                    </Button>
                    <div style={{
                      marginTop: 24,
                      padding: 16,
                      background: 'var(--sable)',
                      borderRadius: 12,
                      fontSize: '0.9rem',
                      color: 'var(--gris)'
                    }}>
                      <div style={{marginBottom: 8}}>✓ Réservation instantanée</div>
                      <div style={{marginBottom: 8}}>✓ QR code immédiat</div>
                      <div>✓ Annulation possible</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24}}>
                      <h2 style={{fontSize: '1.5rem', fontWeight: 700}}>Réservation</h2>
                      <button
                        onClick={()=>setShowBooking(false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '1.5rem',
                          cursor: 'pointer',
                          color: 'var(--gris)'
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.95rem'}}>
                        Nom complet
                      </label>
                      <Input
                        value={guestName}
                        onChange={e=>setGuestName(e.target.value)}
                        style={{marginBottom: 20, border: '1px solid var(--bord)'}}
                        required
                      />

                      <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.95rem'}}>
                        Email
                      </label>
                      <Input
                        type="email"
                        value={guestEmail}
                        onChange={e=>setGuestEmail(e.target.value)}
                        style={{marginBottom: 20, border: '1px solid var(--bord)'}}
                        required
                      />

                      <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.95rem'}}>
                        Date de l'activité
                      </label>
                      <Input
                        type="date"
                        value={date || defaultDate}
                        onChange={e=>setDate(e.target.value)}
                        style={{marginBottom: 20, border: '1px solid var(--bord)'}}
                        required
                      />

                      <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.95rem'}}>
                        Nombre de personnes
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={e=>setQuantity(parseInt(e.target.value) || 1)}
                        style={{marginBottom: 20, border: '1px solid var(--bord)'}}
                        required
                      />

                      <label style={{display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.95rem'}}>
                        Code promo (optionnel)
                      </label>
                      <div style={{display: 'flex', gap: 8, marginBottom: 20}}>
                        <Input
                          value={promoCode}
                          onChange={e=>{setPromoCode(e.target.value); setPromo(null)}}
                          placeholder="Code promo"
                          style={{flex: 1, border: '1px solid var(--bord)'}}
                        />
                        <Button type="button" onClick={handlePromoCode}>Valider</Button>
                      </div>
                      {promo && (
                        <div style={{
                          background: 'rgba(43,116,255,0.1)',
                          color: 'var(--azur)',
                          padding: 12,
                          borderRadius: 8,
                          marginBottom: 20,
                          fontWeight: 600
                        }}>
                          ✓ {promo.description}
                        </div>
                      )}

                      <div style={{
                        borderTop: '2px solid var(--bord)',
                        paddingTop: 20,
                        marginTop: 20,
                        marginBottom: 24
                      }}>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
                          <span style={{color: 'var(--gris)'}}>Prix unitaire</span>
                          <span style={{fontWeight: 600}}>{a.price} €</span>
                        </div>
                        {discount > 0 && (
                          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: 'var(--azur)'}}>
                            <span>Réduction</span>
                            <span style={{fontWeight: 600}}>-{discount.toFixed(2)} €</span>
                          </div>
                        )}
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
                          <span style={{color: 'var(--gris)'}}>Quantité</span>
                          <span style={{fontWeight: 600}}>{quantity}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '1.5rem',
                          fontWeight: 800,
                          marginTop: 16,
                          paddingTop: 16,
                          borderTop: '2px solid var(--bord)',
                          color: 'var(--azur)'
                        }}>
                          <span>Total</span>
                          <span>{total.toFixed(2)} €</span>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          marginBottom: 12
                        }}
                      >
                        Confirmer la réservation
                      </Button>
                      <Button
                        type="button"
                        kind="ghost"
                        onClick={()=>setShowBooking(false)}
                        style={{width: '100%'}}
                      >
                        Annuler
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
