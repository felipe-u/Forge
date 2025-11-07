import { Outlet } from 'react-router'
import '../styles/Auth.css'

export default function AuthLayout() {
  return (
    <main className='auth-main'>
      <Outlet />
    </main>
  )
}
