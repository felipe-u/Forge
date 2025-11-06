import { useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    login()
    navigate('/')
  }

  return (
    <>
      <h2>Login page is working</h2>
      <button onClick={handleLogin}>Login</button>
    </>
  )
}
