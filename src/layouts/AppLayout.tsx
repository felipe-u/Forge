import { NavLink, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import '../styles/Home.css'

export default function AppLayout() {
  const { logout } = useAuth()
  const [toggleMenu, setToggleMenu] = useState(false)

  const hideSideMenu = () => {
    setToggleMenu(false)
  }

  return (
    <>
      <header>
        <h1>Forge</h1>
      </header>
      <div className='app-layout'>
        <div className={`nav-container ${toggleMenu ? 'opened' : ''}`}>
          <nav>
            <NavLink to='/' onClick={hideSideMenu}>
              Home
            </NavLink>
            <NavLink to='/habits' onClick={hideSideMenu}>
              Habits
            </NavLink>
            <hr />
            <button onClick={logout}>logout</button>
          </nav>
          <button
            className='menu-btn'
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            Menu
          </button>
        </div>

        <main className='app-main'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
