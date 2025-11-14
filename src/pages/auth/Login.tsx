import { useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [showLogin, setShowLogin] = useState(false)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setFade(true)
    setTimeout(() => {
      login()
      navigate('/')
    }, 600)
  }

  return (
    <>
      <div className={`fade-out ${fade ? 'show' : ''}`} />
      {showLogin && (
        <div className='auth-container fade-in'>
          <h1>Forge</h1>
          <form>
            <div className='input-container'>
              <input type='email' name='email' id='email' placeholder='Email' />
            </div>
            <div className='input-container'>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
              />
            </div>
            <button type='button' onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      )}
    </>
  )
}
