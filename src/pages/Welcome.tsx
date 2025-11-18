import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useOnboarding } from '../hooks/useOnboarding'

export default function Login() {
  const navigate = useNavigate()
  const { enterApp } = useOnboarding()

  const [show, setShow] = useState(false)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setFade(true)
    setTimeout(() => {
      enterApp()
      navigate('/dashboard')
    }, 600)
  }

  return (
    <>
      <div className={`fade-out ${fade ? 'show' : ''}`} />
      {show && (
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
            <button type='button' onClick={handleEnter}>
              Login
            </button>
          </form>
        </div>
      )}
    </>
  )
}
