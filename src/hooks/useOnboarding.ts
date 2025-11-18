import { useContext } from 'react'
import { OnboardingContext } from '../contexts/OnboardingContext'

export function useOnboarding() {
  const context = useContext(OnboardingContext)

  if (!context) {
    throw new Error('useOnboarding must be within an AuthProvider')
  }

  return context
}
