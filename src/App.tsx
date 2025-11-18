import { BrowserRouter } from 'react-router'
import { HabitsProvider } from './contexts/HabitsContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { OnboardingProvider } from './contexts/OnboardingContext'
import AppRoutes from './routes/AppRoutes'
import './styles/FadeOverlay.css'

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
