import type { HabitType } from '../types'

interface Props {
  habit: HabitType
}

export const Habit: React.FC<Props> = ({ habit }) => {
  return (
    <div className='habit-container'>
      <h3>{habit.name}</h3>
      <div className='streak'>
        <p>🔥</p>
        <p>6 days</p>
      </div>
    </div>
  )
}
