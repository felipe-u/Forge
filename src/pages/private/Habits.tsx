import { useNavigate } from 'react-router'
import '../../styles/Habits.css'
import { useHabits } from '../../hooks/useHabits'

export default function Habits() {
  const navigate = useNavigate()
  const { habits, add } = useHabits()

  const openHabitDetails = () => {
    navigate('/habits/1')
  }

  const onCreateHabit = () => {
    const newHabitName = prompt('New habit')
    if (!newHabitName) return
    add(newHabitName)
  }

  return (
    <section>
      <table className='habits-table'>
        <tbody>
          <tr onClick={onCreateHabit}>
            <td>+</td>
          </tr>
          {habits.map((habit) => (
            <tr key={habit.id} onClick={openHabitDetails}>
              <td>{habit.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
