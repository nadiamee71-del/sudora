import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import { AppRoutes } from './router.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}
