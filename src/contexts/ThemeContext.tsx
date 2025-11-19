import { createContext, useEffect, useState } from 'react'

interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') ?? 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
