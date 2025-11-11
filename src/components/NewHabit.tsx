import { useState } from 'react'
import { toast } from 'sonner'
import { useHabits } from '../hooks/useHabits'

interface Props {
  closeModal: () => void
}

export const NewHabit: React.FC<Props> = ({ closeModal }) => {
  const [name, setName] = useState('')
  const { add } = useHabits()

  const onCreateHabit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name) return

    try {
      await add(name)
      closeModal()
      toast.success('New habit created', { toasterId: 'global' })
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message, { toasterId: 'global' })
    }
  }

  return (
    <div className='new-habit-modal'>
      <div className='inner-modal'>
        <h2>New Habit</h2>
        <form onSubmit={onCreateHabit}>
          <div className='input-modal-container'>
            <input
              type='text'
              placeholder='Reading, Meditate...'
              name='habit'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <button>Create</button>
          </div>
          <button className='close-btn' onClick={closeModal}>
            &times;
          </button>
        </form>
      </div>
    </div>
  )
}
