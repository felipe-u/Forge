import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import type { HabitType } from '../../types'
import { useHabits } from '../../hooks/useHabits'
import { calculateStreak } from '../../utils/streak'

interface EditName {
  name: string
  show: boolean
}

export default function Habit() {
  const navigate = useNavigate()
  const [habit, setHabit] = useState<HabitType>()
  const [editName, setEditName] = useState<EditName>({ name: '', show: false })
  const inputRef = useRef<HTMLInputElement>(null)
  const { id } = useParams()
  const { get, remove, update } = useHabits()

  useEffect(() => {
    fetchHabit()
  }, [id])

  useEffect(() => {
    inputRef.current?.focus()
  }, [editName.show])

  const fetchHabit = async () => {
    const result = await get(id)
    if (!result) return

    const habit = {
      ...result,
      streak: calculateStreak(result.completedDates),
    }

    setHabit(habit as HabitType)
    setEditName({ name: habit.name, show: false })
  }

  const onDelete = (id: string | undefined) => {
    if (confirm('Are you sure?')) {
      remove(id).then(() => navigate('/habits'))
    }
  }

  const onEditName: React.KeyboardEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.key !== 'Enter') return

    if (editName.name !== habit?.name) {
      await update(habit?.id as number, editName.name)
      setHabit((prev) => (prev ? { ...prev, name: editName.name } : prev))
    }

    setEditName((prev) => ({ ...prev, show: false }))
  }

  const toggleEditName = () => {
    setEditName((prev) => ({ ...prev, show: !prev.show }))
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
              <div className='habit-name'>
                {editName.show ? (
                  <input
                    ref={inputRef}
                    onKeyDown={onEditName}
                    value={editName.name}
                    onChange={(e) =>
                      setEditName((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                ) : (
                  <span onDoubleClick={toggleEditName}>{habit.name}</span>
                )}
              </div>
            </p>
            <p>
              <strong>Streak: </strong>
              {habit.streak} {`day${habit.streak === 1 ? '' : 's'}`}
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
