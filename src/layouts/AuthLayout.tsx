import { Outlet } from 'react-router'
import '../styles/Auth.css'
import { ParticlesBackground } from '../components/ParticlesBackground'

export default function AuthLayout() {
  return (
    <main className='auth-main'>
      <Outlet />
      <ParticlesBackground />

    </main>
  )
}
