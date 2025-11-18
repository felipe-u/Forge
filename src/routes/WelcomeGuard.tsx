import type { JSX } from 'react'
import { useOnboarding } from '../hooks/useOnboarding'
import { Navigate } from 'react-router'

export default function WelcomeGuard({ children }: { children: JSX.Element }) {
  const { shouldShowWelcome } = useOnboarding()

  if (shouldShowWelcome) return <Navigate to='/welcome' replace />
  return children
}
