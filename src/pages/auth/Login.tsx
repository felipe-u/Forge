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
    <div className='auth-container'>
      <h1>Forge</h1>
      <form>
        <div className='input-container'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <button type='button' onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  )
}
