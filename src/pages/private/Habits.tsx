import { useNavigate } from 'react-router'
import '../../styles/Habits.css'
import { useHabits } from '../../hooks/useHabits'

export default function Habits() {
  const navigate = useNavigate()
  const { habits, add } = useHabits()

  const openHabitDetails = (id: number | undefined) => {
    navigate(`/habits/${id}`)
  }

  const onCreateHabit = async () => {
    const newHabitName = prompt('New habit')
    if (!newHabitName) return
    await add(newHabitName)
  }

  return (
    <section>
      <div className='add-btn-container'>
        <button onClick={onCreateHabit}>+</button>
      </div>
      <table className='habits-table'>
        <tbody>
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
