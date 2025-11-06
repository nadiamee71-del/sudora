import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Activities from './pages/activities.jsx'
import Hotels from './pages/hotels.jsx'
import Bookings from './pages/bookings.jsx'
import Profile from './pages/profile.jsx'
import Admin from './pages/admin.jsx'
import NotFound from './pages/not-found.jsx'
import Results from './pages/results.jsx'
import Activity from './pages/activity.jsx'
import Hotel from './pages/hotel.jsx'
import HotelLogin from './pages/hotel-login.jsx'
import HotelDashboard from './pages/hotel-dashboard.jsx'
import HotelBooking from './pages/hotel-booking.jsx'
import BookingDetail from './pages/booking-detail.jsx'
import Login from './pages/login.jsx'
import { getCurrentUser } from './services/api.js'
import { Navigate } from 'react-router-dom'

// Composant pour protéger les routes
function ProtectedRoute({ children }) {
  const user = getCurrentUser()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bookings" element={
        <ProtectedRoute>
          <Bookings />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={<Admin />} />
      <Route path="/results" element={<Results />} />
      <Route path="/activity/:id" element={<Activity />} />
      <Route path="/hotel/:id" element={<Hotel />} />
      <Route path="/hotel/login" element={<HotelLogin />} />
      <Route path="/hotel/dashboard" element={<HotelDashboard />} />
      <Route path="/hotel/booking/:id" element={<HotelBooking />} />
      <Route path="/booking/:id" element={<BookingDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
