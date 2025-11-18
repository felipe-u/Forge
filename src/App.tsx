import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/AppRoutes'
import { HabitsProvider } from './contexts/HabitsContext'
import './styles/FadeOverlay.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { OnboardingProvider } from './contexts/OnboardingContext'

function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <HabitsProvider>
          <ThemeProvider>
            <AppRoutes />
          </ThemeProvider>
        </HabitsProvider>
      </OnboardingProvider>
    </BrowserRouter>
  )
}

export default App
