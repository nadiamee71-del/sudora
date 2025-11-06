import { useState } from 'react'
import { listActivities, listHotels, getBookingsByHotel } from '../services/api.js'
import { Card, Input, Select, Pill } from '../components/ui.jsx'

export default function Admin(){
  const [view, setView] = useState('overview')
  const activities = listActivities()
  const hotels = listHotels()
  const allBookings = hotels.flatMap(h=>getBookingsByHotel(h.id))
  const totalRevenue = allBookings.reduce((sum, b)=>sum+b.total, 0)
  const totalCommissions = allBookings.reduce((sum, b)=>sum+b.commission, 0)
  const netMargin = totalRevenue - totalCommissions

  const bookingsByMonth = allBookings.reduce((acc, b) => {
    const month = new Date(b.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})

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
            Administration Sudora
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: 32, opacity: 0.95}}>
            Gestion du catalogue, commandes et statistiques
          </p>
        </div>
      </div>

      <div style={{maxWidth: 1100, margin: '0 auto', padding: '0 16px'}}>
        {/* Navigation */}
        <div className="pills" style={{marginBottom: 32, gap: 12}}>
          <button
            className={`pill ${view==='overview'?'active':''}`}
            onClick={()=>setView('overview')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            📊 Vue d'ensemble
          </button>
          <button
            className={`pill ${view==='activities'?'active':''}`}
            onClick={()=>setView('activities')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            🎯 Activités ({activities.length})
          </button>
          <button
            className={`pill ${view==='hotels'?'active':''}`}
            onClick={()=>setView('hotels')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            🏨 Hôtels ({hotels.length})
          </button>
          <button
            className={`pill ${view==='bookings'?'active':''}`}
            onClick={()=>setView('bookings')}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            📋 Commandes ({allBookings.length})
          </button>
        </div>

        {/* Vue d'ensemble */}
        {view === 'overview' && (
          <>
            <div className="grid cols-3" style={{marginBottom: 32, gap: 20}}>
              <Card>
                <div className="card-body" style={{padding: 24}}>
                  <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                    Total activités
                  </div>
                  <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                    {activities.length}
                  </div>
                  <div style={{fontSize: 12, color: 'var(--gris)'}}>
                    Dans le catalogue
                  </div>
                </div>
              </Card>
              <Card>
                <div className="card-body" style={{padding: 24}}>
                  <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                    Hôtels partenaires
                  </div>
                  <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                    {hotels.length}
                  </div>
                  <div style={{fontSize: 12, color: 'var(--gris)'}}>
                    Actifs sur la plateforme
                  </div>
                </div>
              </Card>
              <Card>
                <div className="card-body" style={{padding: 24}}>
                  <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                    Total commandes
                  </div>
                  <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                    {allBookings.length}
                  </div>
                  <div style={{fontSize: 12, color: 'var(--gris)'}}>
                    Toutes réservations confondues
                  </div>
                </div>
              </Card>
              <Card>
                <div className="card-body" style={{padding: 24}}>
                  <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                    Chiffre d'affaires
                  </div>
                  <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                    {totalRevenue.toFixed(0)} €
                  </div>
                  <div style={{fontSize: 12, color: 'var(--gris)'}}>
                    Total des ventes
                  </div>
                </div>
              </Card>
              <Card>
                <div className="card-body" style={{padding: 24}}>
                  <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                    Commissions versées
                  </div>
                  <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                    {totalCommissions.toFixed(0)} €
                  </div>
                  <div style={{fontSize: 12, color: 'var(--gris)'}}>
                    Aux hôtels partenaires
                  </div>
                </div>
              </Card>
              <Card>
                <div className="card-body" style={{padding: 24}}>
                  <div style={{fontSize: 14, color: 'var(--gris)', marginBottom: 8, fontWeight: 600}}>
                    Marge nette
                  </div>
                  <div style={{fontSize: 36, fontWeight: 800, color: 'var(--azur)', marginBottom: 4}}>
                    {netMargin.toFixed(0)} €
                  </div>
                  <div style={{fontSize: 12, color: 'var(--gris)'}}>
                    CA - Commissions
                  </div>
                </div>
              </Card>
            </div>

            {/* Graphique simple */}
            <Card style={{marginBottom: 32}}>
              <div className="card-body" style={{padding: 24}}>
                <h2 style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: 20}}>
                  Commandes par mois
                </h2>
                <div style={{display: 'flex', gap: 16, alignItems: 'flex-end', minHeight: 200}}>
                  {Object.entries(bookingsByMonth).map(([month, count]) => (
                    <div key={month} style={{flex: 1, textAlign: 'center'}}>
                      <div style={{
                        background: 'var(--azur)',
                        height: `${(count / Math.max(...Object.values(bookingsByMonth))) * 150}px`,
                        borderRadius: '8px 8px 0 0',
                        marginBottom: 8,
                        minHeight: 20
                      }}></div>
                      <div style={{fontSize: 12, color: 'var(--gris)', fontWeight: 600}}>
                        {count}
                      </div>
                      <div style={{fontSize: 11, color: 'var(--gris)', marginTop: 4}}>
                        {month}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Liste Activités */}
        {view === 'activities' && (
          <div className="grid cols-3" style={{gap: 24}}>
            {activities.map(a=>(
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
                    {a.city} • {a.category} • {a.price} €
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    fontSize: '0.85rem',
                    color: 'var(--gris)'
                  }}>
                    <span>👁️ {a.reviews} avis</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Liste Hôtels */}
        {view === 'hotels' && (
          <div className="grid cols-3" style={{gap: 24}}>
            {hotels.map(h=>{
              const hotelBookings = getBookingsByHotel(h.id)
              const hotelRevenue = hotelBookings.reduce((sum, b)=>sum+b.total, 0)
              const hotelCommission = hotelBookings.reduce((sum, b)=>sum+b.commission, 0)

              return (
                <Card key={h.id} style={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-4px)'}
                onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}
                >
                  <div style={{position: 'relative', height: 180, overflow: 'hidden'}}>
                    <img
                      src={h.image}
                      alt={h.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'rgba(0,0,0,0.8)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 700
                    }}>
                      {h.stars}★
                    </div>
                  </div>
                  <div className="card-body" style={{padding: 20}}>
                    <div className="card-title" style={{fontSize: '1.1rem', marginBottom: 8}}>
                      {h.name}
                    </div>
                    <p className="card-sub" style={{marginBottom: 12}}>
                      {h.city} • {h.price} €/nuit
                    </p>
                    <div style={{
                      background: 'var(--sable)',
                      padding: 12,
                      borderRadius: 8,
                      fontSize: '0.85rem'
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                        <span style={{color: 'var(--gris)'}}>Commandes:</span>
                        <span style={{fontWeight: 600}}>{hotelBookings.length}</span>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                        <span style={{color: 'var(--gris)'}}>CA:</span>
                        <span style={{fontWeight: 600}}>{hotelRevenue.toFixed(0)} €</span>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{color: 'var(--gris)'}}>Commissions:</span>
                        <span style={{fontWeight: 600, color: 'var(--azur)'}}>
                          {hotelCommission.toFixed(0)} €
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Liste Commandes */}
        {view === 'bookings' && (
          <Card>
            <div className="card-body" style={{padding: 0}}>
              <div style={{overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{
                      background: 'var(--sable)',
                      borderBottom: '2px solid var(--bord)'
                    }}>
                      <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                        Date commande
                      </th>
                      <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                        Activité
                      </th>
                      <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                        Client
                      </th>
                      <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                        Hôtel
                      </th>
                      <th style={{textAlign: 'left', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                        Date activité
                      </th>
                      <th style={{textAlign: 'right', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                        Total
                      </th>
                      <th style={{textAlign: 'right', padding: 16, fontWeight: 700, fontSize: '0.9rem', color: 'var(--encre)'}}>
                        Commission
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBookings.slice().reverse().map(b=>{
                      const hotel = hotels.find(h=>h.id===b.hotelId)
                      return (
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
                            {hotel ? (
                              <span style={{
                                background: 'rgba(43,116,255,0.1)',
                                color: 'var(--azur)',
                                padding: '4px 10px',
                                borderRadius: 20,
                                fontSize: '0.85rem',
                                fontWeight: 600
                              }}>
                                {hotel.name}
                              </span>
                            ) : (
                              <span style={{color: 'var(--gris)', fontSize: '0.85rem'}}>Direct</span>
                            )}
                          </td>
                          <td style={{padding: 16, fontSize: '0.9rem'}}>
                            {new Date(b.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td style={{padding: 16, textAlign: 'right', fontWeight: 700}}>
                            {b.total.toFixed(2)} €
                          </td>
                          <td style={{padding: 16, textAlign: 'right', color: 'var(--azur)', fontWeight: 700}}>
                            {b.commission.toFixed(2)} €
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
