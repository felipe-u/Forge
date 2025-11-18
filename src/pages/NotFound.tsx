import { useNavigate } from 'react-router'
import { useTheme } from '../hooks/useTheme'
import '../styles/NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <section className={`not-found-container ${theme}`}>
      <h2>404</h2>
      <p>Page Not Found</p>
      <button onClick={() => navigate('/dashboard')}>Go Home</button>
    </section>
  )
}
