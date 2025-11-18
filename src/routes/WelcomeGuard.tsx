import type { JSX } from 'react'
import { Navigate } from 'react-router'
import { useOnboarding } from '../hooks/useOnboarding'

export default function WelcomeGuard({ children }: { children: JSX.Element }) {
  const { shouldShowWelcome } = useOnboarding()

  if (shouldShowWelcome === null) return null

  if (shouldShowWelcome) return <Navigate to='/welcome' replace />
  return children
}
