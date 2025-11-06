import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getBookingsByHotel, listActivities } from '../services/api.js'
import { Card, Button } from '../components/ui.jsx'
import { Input } from '../components/ui.jsx'

export default function HotelDashboard(){
  const nav = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [bookings, setBookings] = useState([])
  const [activities, setActivities] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    const hotelData = JSON.parse(localStorage.getItem('sudora_hotel'))
    if(!hotelData){
      nav('/hotel/login')
      return
    }
    setHotel(hotelData)
    setBookings(getBookingsByHotel(hotelData.id))
    setActivities(listActivities())
  }, [nav])

  if(!hotel) return null

  const filteredActivities = activities.filter(a=>
    (a.title+' '+a.city).toLowerCase().includes(search.toLowerCase())
  )

  const totalCommission = bookings.reduce((sum, b)=>sum+b.commission, 0)
  const todayBookings = bookings.filter(b=>new Date(b.date).toDateString() === new Date().toDateString())
  const thisMonthBookings = bookings.filter(b=>{
    const bookingDate = new Date(b.createdAt)
    const now = new Date()
    return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear()
  })
  const thisMonthCommission = thisMonthBookings.reduce((sum, b)=>sum+b.commission, 0)

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
            Extranet {hotel.name}
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 24, opacity: 0.95}}>
            {hotel.city} • Tableau de bord
          </p>
          <Button
            kind="ghost"
            onClick={()=>{localStorage.removeItem('sudora_hotel'); nav('/hotel/login')}}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '12px 24px',
              backdropFilter: 'blur(10px)'
            }}
          >
            Déconnexion
          </Button>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Statistiques */}
        <div className="grid cols-4" style={{marginBottom: 48, gap: 20}}>
          <Card>
            <div className="card-body" style={{padding: 24}}>
              <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                Commandes aujourd'hui
              </div>
              <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                {todayBookings.length}
              </div>
              <div style={{fontSize: 12, color: 'var(--gris)'}}>
                {todayBookings.length === 0 ? 'Aucune commande' : `${todayBookings.length} billet(s)`}
              </div>
            </div>
          </Card>
          <Card>
            <div className="card-body" style={{padding: 24}}>
              <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                Ce mois
              </div>
              <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                {thisMonthBookings.length}
              </div>
              <div style={{fontSize: 12, color: 'var(--gris)'}}>
                {thisMonthCommission.toFixed(2)} € de commissions
              </div>
            </div>
          </Card>
          <Card>
            <div className="card-body" style={{padding: 24}}>
              <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                Total commandes
              </div>
              <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                {bookings.length}
              </div>
              <div style={{fontSize: 12, color: 'var(--gris)'}}>
                Depuis le début
              </div>
            </div>
          </Card>
          <Card>
            <div className="card-body" style={{padding: 24}}>
              <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                Commissions totales
              </div>
              <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                {totalCommission.toFixed(0)} €
              </div>
              <div style={{fontSize: 12, color: 'var(--gris)'}}>
                Gains cumulés
              </div>
            </div>
          </Card>
        </div>

        {/* Recherche d'activités */}
        <div style={{marginBottom: 32}}>
          <h2 style={{fontSize: '1.8rem', fontWeight: 700, marginBottom: 16, color: 'var(--encre)'}}>
            Rechercher une activité
          </h2>
          <Input
            placeholder="Tapez le nom d'une activité ou une ville..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{
              maxWidth: 500,
              border: '1px solid var(--bord)',
              fontSize: '1rem',
              padding: '14px 18px'
            }}
          />
        </div>

        {/* Grille d'activités */}
        {search && (
          <div style={{marginBottom: 48}}>
            <div className="grid cols-3" style={{gap: 24}}>
              {filteredActivities.slice(0,6).map(a=>(
                <Card key={a.id} style={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}
                >
                  <div style={{position: 'relative', height: 180, overflow: 'hidden'}}>
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
                  </div>
                  <div className="card-body" style={{padding: 20}}>
                    <div className="card-title" style={{fontSize: '1.1rem', marginBottom: 8}}>
                      {a.title}
                    </div>
                    <p className="card-sub" style={{marginBottom: 12}}>
                      {a.city} • {a.price} €
                    </p>
                    <Link
                      to={`/hotel/booking/${a.id}`}
                      className="btn ghost"
                      style={{width: '100%', textAlign: 'center'}}
                    >
                      Commander pour un client
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            {filteredActivities.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: 40,
                background: 'var(--sable)',
                borderRadius: 12,
                color: 'var(--gris)'
              }}>
                Aucune activité trouvée pour "{search}"
              </div>
            )}
          </div>
        )}

        {/* Historique des commandes */}
        <div>
          <h2 style={{fontSize: '1.8rem', fontWeight: 700, marginBottom: 24, color: 'var(--encre)'}}>
            Historique des commandes
          </h2>
          <Card>
            <div className="card-body" style={{padding: 0}}>
              {bookings.length === 0 ? (
                <div style={{padding: 60, textAlign: 'center', color: 'var(--gris)'}}>
                  <div style={{fontSize: '3rem', marginBottom: 16}}>📋</div>
                  <p style={{fontSize: '1.1rem'}}>Aucune commande pour le moment</p>
                  <p style={{fontSize: '0.9rem', marginTop: 8}}>
                    Utilisez la recherche ci-dessus pour créer votre première commande
                  </p>
                </div>
              ) : (
                <div style={{overflowX: 'auto'}}>
                  <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                      <tr style={{
                        background: 'var(--sable)',
                        borderBottom: '2px solid var(--bord)'
                      }}>
                        <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                          Date
                        </th>
                        <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                          Activité
                        </th>
                        <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                          Client
                        </th>
                        <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                          Date activité
                        </th>
                        <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                          Quantité
                        </th>
                        <th style={{textAlign: 'right', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                          Total
                        </th>
                        <th style={{textAlign: 'right', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                          Commission
                        </th>
                        <th style={{textAlign: 'center', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                          QR Code
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice().reverse().map((b, idx)=>(
                        <tr
                          key={b.id}
                          style={{
                            borderBottom: '1px solid var(--bord)',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e)=>e.currentTarget.style.background='var(--sable)'}
                          onMouseLeave={(e)=>e.currentTarget.style.background='transparent'}
                        >
                          <td style={{padding: 16, fontSize: '0.9rem'}}>
                            {new Date(b.createdAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td style={{padding: 16, fontWeight: 600}}>
                            {b.activityTitle}
                          </td>
                          <td style={{padding: 16, fontSize: '0.9rem'}}>
                            <div>{b.guestName}</div>
                            <div style={{fontSize: '0.85rem', color: 'var(--gris)'}}>
                              {b.guestEmail}
                            </div>
                          </td>
                          <td style={{padding: 16, fontSize: '0.9rem'}}>
                            {new Date(b.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td style={{padding: 16, textAlign: 'center'}}>
                            <span style={{
                              background: 'rgba(43,116,255,0.1)',
                              color: 'var(--azur)',
                              padding: '4px 12px',
                              borderRadius: 20,
                              fontWeight: 600,
                              fontSize: '0.9rem'
                            }}>
                              {b.quantity}
                            </span>
                          </td>
                          <td style={{padding: 16, textAlign: 'right', fontWeight: 700}}>
                            {b.total.toFixed(2)} €
                          </td>
                          <td style={{padding: 16, textAlign: 'right', color: 'var(--azur)', fontWeight: 700}}>
                            {b.commission.toFixed(2)} €
                          </td>
                          <td style={{padding: 16, textAlign: 'center'}}>
                            <Link
                              to={`/booking/${b.id}`}
                              className="btn ghost"
                              style={{
                                fontSize: 12,
                                padding: '6px 14px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Voir QR
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
