import { useEffect, useState } from 'react'
import type { HabitType } from '../types'

interface Props {
  habit: HabitType
  onComplete: (id: number) => Promise<void>
  triggerSpark: () => void
}

export const Habit: React.FC<Props> = ({ habit, onComplete, triggerSpark }) => {
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    if (habit.completedDates.includes(today)) setCompleted(true)
  }, [habit])

  const onCompleteHabit = async () => {
    if (completed) return
    await onComplete(habit.id as number)
    setCompleted(true)
    triggerSpark()
  }

  return (
    <div
      className={`habit-container ${completed ? 'completed' : ''}`}
      onClick={onCompleteHabit}
    >
      <h3>{habit.name}</h3>
      <div className='streak'>
        <p>🔥</p>
        <p>
          {habit.streak} day{habit.streak === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  )
}
