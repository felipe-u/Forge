import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { HabitsProvider } from './contexts/HabitsContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HabitsProvider>
          <AppRoutes />
        </HabitsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
