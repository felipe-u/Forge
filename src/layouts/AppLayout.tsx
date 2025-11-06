import { Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export default function AppLayout() {
  const { logout } = useAuth()

  return (
    <>
      <header>FORGE</header>
      <nav>Menu</nav>
      <button onClick={logout}>logout</button>

      <Outlet />
    </>
  )
}
