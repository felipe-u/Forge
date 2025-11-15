import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useHabits } from '../hooks/useHabits'
import { useTheme } from '../hooks/useTheme'

interface Props {
  closeModal: () => void
}

export const NewHabit: React.FC<Props> = ({ closeModal }) => {
  const { add } = useHabits()
  const {theme} = useTheme()
  const [name, setName] = useState('')
  const [close, setClose] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const onCreateHabit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name) return

    try {
      await add(name)
      handleClose()
      toast.success('New habit created', { toasterId: 'global' })
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message, { toasterId: 'global' })
    }
  }

  const handleClose = () => {
    setClose(true)
    setTimeout(() => {
      closeModal()
    }, 300)
  }

  return (
    <div className={`new-habit-modal ${close ? 'close' : ''}`}>
      <div className={`inner-modal ${theme} ${close ? 'close' : ''}`}>
        <h2>New Habit</h2>
        <form onSubmit={onCreateHabit}>
          <div className={`input-modal-container ${theme}`}>
            <input
              ref={inputRef}
              type='text'
              placeholder='Reading, Meditate...'
              name='habit'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <button>Create</button>
          </div>
          <button className={`close-btn ${theme}`} onClick={handleClose}>
            &times;
          </button>
        </form>
      </div>
    </div>
  )
}
