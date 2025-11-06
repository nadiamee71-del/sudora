import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getActivity, createBooking, validatePromoCode } from '../services/api.js'
import { Input, Button, Card } from '../components/ui.jsx'

export default function HotelBooking(){
  const { id } = useParams()
  const nav = useNavigate()
  const [hotel, setHotel] = useState(null)
  const activity = getActivity(id)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [promo, setPromo] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    const hotelData = JSON.parse(localStorage.getItem('sudora_hotel'))
    if(!hotelData){
      nav('/hotel/login')
      return
    }
    setHotel(hotelData)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setDate(tomorrow.toISOString().split('T')[0])
  }, [nav])

  if(!activity || !hotel) return null

  function handlePromoCode(){
    const validated = validatePromoCode(promoCode)
    if(validated){
      setPromo(validated)
      setError('')
    } else {
      setPromo(null)
      setError('Code promo invalide ou expiré')
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!guestName || !guestEmail || !date){
      setError('Veuillez remplir tous les champs')
      return
    }

    const booking = createBooking({
      activityId: id,
      hotelId: hotel.id,
      guestName,
      guestEmail,
      quantity,
      date,
      promoCode: promo ? promoCode : null
    })

    if(booking){
      nav(`/booking/${booking.id}`)
    } else {
      setError('Erreur lors de la création de la réservation')
    }
  }

  const discount = promo ? (promo.type==='percent' ? activity.price * promo.discount / 100 : promo.discount) : 0
  const unitPrice = activity.price - discount
  const total = unitPrice * quantity
  const commission = total * 0.05

  return (
    <section style={{padding:0}}>
      {/* Hero Section */}
      <div style={{
        background: `linear-gradient(135deg, rgba(43,116,255,0.7) 0%, rgba(255,215,104,0.6) 100%), url(${activity.image}) center/cover`,
        padding: '60px 24px',
        textAlign: 'center',
        color: 'white',
        marginBottom: 48
      }}>
        <div style={{maxWidth: 1100, margin: '0 auto'}}>
          <h1 style={{fontSize: '3rem', fontWeight: 800, marginBottom: 16, textShadow: '0 2px 10px rgba(0,0,0,0.3)'}}>
            Nouvelle commande
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 24, opacity: 0.95}}>
            {activity.title} • {activity.city}
          </p>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Breadcrumb */}
        <div style={{marginBottom: 24, fontSize: '0.9rem', color: 'var(--gris)'}}>
          <Link to="/hotel/dashboard" style={{color: 'var(--azur)'}}>Dashboard</Link>
          {' > '}
          <span>Commande : {activity.title}</span>
        </div>

        <div className="layout-2cols-responsive">
          {/* Colonne gauche - Activité */}
          <div>
            <Card>
              <div style={{position: 'relative', height: 350, overflow: 'hidden'}}>
                <img
                  src={activity.image}
                  alt={activity.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div className="badge" style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  background: 'var(--soleil)',
                  color: '#000',
                  padding: '8px 14px',
                  borderRadius: 20,
                  fontWeight: 700,
                  fontSize: 16
                }}>
                  ★ {activity.rating} ({activity.reviews} avis)
                </div>
              </div>
              <div className="card-body" style={{padding: 24}}>
                <h1 style={{fontSize: '1.8rem', fontWeight: 700, marginBottom: 12, color: 'var(--encre)'}}>
                  {activity.title}
                </h1>
                <div style={{display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gris)'}}>
                    <span>📍</span>
                    <span>{activity.city}</span>
                  </div>
                  <div style={{
                    background: 'rgba(43,116,255,0.1)',
                    color: 'var(--azur)',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    {activity.category}
                  </div>
                </div>
                {activity.description && (
                  <p style={{lineHeight: 1.7, color: 'var(--encre)', marginBottom: 24}}>
                    {activity.description}
                  </p>
                )}
                <div style={{
                  background: 'var(--sable)',
                  padding: 20,
                  borderRadius: 12
                }}>
                  <div style={{fontSize: '0.9rem', color: 'var(--gris)', marginBottom: 8}}>Prix unitaire</div>
                  <div style={{fontSize: '2rem', fontWeight: 800, color: 'var(--azur)'}}>
                    {activity.price} €
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Colonne droite - Formulaire */}
          <div>
            <Card style={{position: 'sticky', top: 100}}>
              <div className="card-body" style={{padding: 32}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: 8}}>
                  Nouvelle commande
                </h2>
                <p style={{color: 'var(--gris)', marginBottom: 24, fontSize: '0.95rem'}}>
                  Remplissez les informations du client pour créer la réservation
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{marginBottom: 20}}>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--encre)'
                    }}>
                      Nom complet du client
                    </label>
                    <Input
                      value={guestName}
                      onChange={e=>setGuestName(e.target.value)}
                      style={{
                        border: '1px solid var(--bord)',
                        padding: '14px 18px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <div style={{marginBottom: 20}}>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--encre)'
                    }}>
                      Email du client
                    </label>
                    <Input
                      type="email"
                      value={guestEmail}
                      onChange={e=>setGuestEmail(e.target.value)}
                      style={{
                        border: '1px solid var(--bord)',
                        padding: '14px 18px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <div style={{marginBottom: 20}}>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--encre)'
                    }}>
                      Date de l'activité
                    </label>
                    <Input
                      type="date"
                      value={date}
                      onChange={e=>setDate(e.target.value)}
                      style={{
                        border: '1px solid var(--bord)',
                        padding: '14px 18px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <div style={{marginBottom: 20}}>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--encre)'
                    }}>
                      Nombre de billets
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={e=>setQuantity(parseInt(e.target.value) || 1)}
                      style={{
                        border: '1px solid var(--bord)',
                        padding: '14px 18px',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <div style={{marginBottom: 20}}>
                    <label style={{
                      display: 'block',
                      marginBottom: 8,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--encre)'
                    }}>
                      Code promo (optionnel)
                    </label>
                    <div style={{display: 'flex', gap: 8}}>
                      <Input
                        value={promoCode}
                        onChange={e=>{setPromoCode(e.target.value); setPromo(null); setError('')}}
                        placeholder="Code promo"
                        style={{
                          flex: 1,
                          border: '1px solid var(--bord)',
                          padding: '14px 18px',
                          fontSize: '1rem'
                        }}
                      />
                      <Button type="button" onClick={handlePromoCode}>Valider</Button>
                    </div>
                    {promo && (
                      <div style={{
                        background: 'rgba(43,116,255,0.1)',
                        color: 'var(--azur)',
                        padding: 12,
                        borderRadius: 8,
                        marginTop: 12,
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}>
                        ✓ {promo.description}
                      </div>
                    )}
                    {error && promoCode && !promo && (
                      <div style={{
                        background: 'rgba(255,0,0,0.1)',
                        color: 'red',
                        padding: 12,
                        borderRadius: 8,
                        marginTop: 12,
                        fontSize: '0.9rem'
                      }}>
                        {error}
                      </div>
                    )}
                  </div>

                  {/* Récapitulatif */}
                  <div style={{
                    borderTop: '2px solid var(--bord)',
                    paddingTop: 20,
                    marginTop: 20,
                    marginBottom: 24
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
                      <span style={{color: 'var(--gris)'}}>Prix unitaire</span>
                      <span style={{fontWeight: 600}}>{activity.price} €</span>
                    </div>
                    {discount > 0 && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 12,
                        color: 'var(--azur)'
                      }}>
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
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: '2px solid var(--bord)',
                      color: 'var(--azur)'
                    }}>
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 12,
                      padding: 12,
                      background: 'var(--sable)',
                      borderRadius: 8,
                      fontSize: '0.9rem'
                    }}>
                      <span style={{color: 'var(--gris)'}}>Votre commission (5%)</span>
                      <span style={{color: 'var(--azur)', fontWeight: 700}}>
                        {commission.toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  {error && !promoCode && (
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
                      marginBottom: 12
                    }}
                  >
                    Confirmer la commande
                  </Button>
                  <Link
                    to="/hotel/dashboard"
                    className="btn ghost"
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      padding: '14px'
                    }}
                  >
                    Annuler
                  </Link>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
