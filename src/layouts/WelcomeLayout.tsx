import { Outlet } from 'react-router'
import '../styles/Welcome.css'
import { ParticlesBackground } from '../components/ParticlesBackground'

export default function WelcomeLayout() {
  return (
    <main className='welcome-main'>
      <Outlet />
      <ParticlesBackground />
    </main>
  )
}
