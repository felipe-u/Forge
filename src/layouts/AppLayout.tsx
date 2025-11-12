import { NavLink, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import '../styles/Home.css'
import { LogoutIcon, MenuIcon } from '../components/Icons'

export default function AppLayout() {
  const { logout } = useAuth()
  const [toggleMenu, setToggleMenu] = useState(false)

  const hideSideMenu = () => {
    setToggleMenu(false)
  }

  return (
    <>
      <header>
        <div className='menu-btn'>
          <button onClick={() => setToggleMenu(!toggleMenu)}>
            <MenuIcon />
          </button>
        </div>
        <h1>Forge</h1>
      </header>
      <div className='app-layout'>
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
            <button onClick={logout}>
              Logout{' '}
              <span>
                <LogoutIcon />
              </span>{' '}
            </button>
          </nav>
        </div>

        <main className='app-main'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
