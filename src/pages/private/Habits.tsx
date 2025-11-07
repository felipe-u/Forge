import { useNavigate } from 'react-router'
import '../../styles/Habits.css'
import { useHabits } from '../../hooks/useHabits'

export default function Habits() {
  const navigate = useNavigate()
  const { habits, add } = useHabits()

  const openHabitDetails = (id: number | undefined) => {
    navigate(`/habits/${id}`)
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
            <tr key={habit.id} onClick={() => openHabitDetails(habit.id)}>
              <td>{habit.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
