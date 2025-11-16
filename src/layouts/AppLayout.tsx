import { NavLink, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import '../styles/Home.css'
import { LogoutIcon, MenuIcon } from '../components/Icons'
import { useTheme } from '../hooks/useTheme'

export default function AppLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const [toggleMenu, setToggleMenu] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 10)
    return () => clearTimeout(timer)
  })

  const handleLogout = () => {
    setFadeOut(true)

    setTimeout(() => {
      logout()
      navigate('/login')
    }, 600)
  }

  const hideSideMenu = () => {
    setToggleMenu(false)
  }

  return (
    <>
      <div className={`fade-in ${fadeIn ? 'show' : ''}`}>
        <div className={`fade-out ${fadeOut ? 'show' : ''}`} />
        <header>
          <div className='menu-btn'>
            <button onClick={() => setToggleMenu(!toggleMenu)}>
              <MenuIcon />
            </button>
          </div>

          <div className='header-container'>
            <h1>Forge</h1>
            <div className='theme-container'>
              <p>{theme === 'dark' ? '☾' : '☀'}</p>
              <label className='theme-switch' aria-label='Cambiar tema'>
                <input
                  type='checkbox'
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <span className='slider' role='presentation'></span>
              </label>
            </div>
          </div>
        </header>
        <div className='app-layout'>
          <div
            className={`overlay ${toggleMenu ? 'show' : ''}`}
            onClick={hideSideMenu}
          />
          <div className={`nav-container ${toggleMenu ? 'opened' : ''}`}>
            <nav>
              <NavLink to='/dashboard' onClick={hideSideMenu}>
                Home
              </NavLink>
              <NavLink to='/habits' onClick={hideSideMenu}>
                Habits
              </NavLink>
              <NavLink to='/calendar' onClick={hideSideMenu}>
                Calendar
              </NavLink>
              <button onClick={handleLogout}>
                Logout{' '}
                <span>
                  <LogoutIcon />
                </span>{' '}
              </button>
            </nav>
          </div>

          <main className={`app-main ${theme}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
