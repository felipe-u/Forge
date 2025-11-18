import { Outlet } from 'react-router'
import { ParticlesBackground } from '../components/ParticlesBackground'
import '../styles/Welcome.css'

export default function WelcomeLayout() {
  return (
    <main className='welcome-main'>
      <Outlet />
      <ParticlesBackground />
    </main>
  )
}
