import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import { AppRoutes } from './router.jsx'

export default function App() {
  return (
    <div className="app-shell" style={{width: '100%', maxWidth: '100vw', overflowX: 'hidden'}}>
      <Navbar />
      <main className="page" style={{width: '100%', maxWidth: '100%', overflowX: 'hidden'}}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}
