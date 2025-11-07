import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import type { HabitType } from '../../types'
import { useHabits } from '../../hooks/useHabits'

export default function Habit() {
  const navigate = useNavigate()
  const [habit, setHabit] = useState<HabitType>()
  const { id } = useParams()
  const { get, remove } = useHabits()

  useEffect(() => {
    get(id).then((result) => {
      setHabit(result as HabitType)
    })
  }, [])

  const onDelete = (id: string | undefined) => {
    if (confirm('Are you sure?')) {
      remove(id).then(() => navigate('/habits'))
    }
  }

  const goBack = () => {
    navigate('/habits')
  }

  return (
    <section>
      <div className='habit-details-container'>
        {habit ? (
          <>
            <p>
              <strong>Habit: </strong>
              {habit.name}
            </p>
            <p>
              <strong>Streak: </strong>6 days
            </p>
            <p>
              <strong>Created at: </strong>
              {habit.createdAt.toLocaleDateString()}
            </p>
            <button onClick={() => onDelete(id)}>Delete</button>
          </>
        ) : (
          <>
            <p>Nothing here to show</p>
          </>
        )}
        <button className='close-btn' onClick={goBack}>
          x
        </button>
      </div>
    </section>
  )
}
