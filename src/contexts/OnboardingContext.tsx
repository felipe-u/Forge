import { createContext, useEffect, useState } from 'react'
import { getLocalDateString, isSameLocalDay } from '../utils/date'

interface OnboardingContextType {
  shouldShowWelcome: boolean
  enterApp: () => void
  resetWelcome: () => void
}

interface OnboardingProviderProps {
  children: React.ReactNode
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
)

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [shouldShowWelcome, setShouldShowWelcome] = useState(true)

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit')

    if (!lastVisit) {
      setShouldShowWelcome(true)
      return
    }

    const today = getLocalDateString()

    if (isSameLocalDay(lastVisit, today)) {
      setShouldShowWelcome(false)
    } else {
      setShouldShowWelcome(true)
    }
  }, [])

  const enterApp = () => {
    const today = getLocalDateString()
    localStorage.setItem('lastVisit', today)
    setShouldShowWelcome(false)
  }

  const resetWelcome = () => {
    localStorage.removeItem('lastVisit')
    setShouldShowWelcome(true)
  }

  // const [user, setUser] = useState<User | null>(null)

  // const login = () => {
  //   setUser({ name: 'test' })
  // }

  // const logout = () => {
  //   setUser(null)
  // }

  return (
    <OnboardingContext.Provider
      value={{ shouldShowWelcome, enterApp, resetWelcome }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
