import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { HabitsProvider } from './contexts/HabitsContext'
import './styles/FadeOverlay.css'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HabitsProvider>
          <ThemeProvider>
            <AppRoutes />
          </ThemeProvider>
        </HabitsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
