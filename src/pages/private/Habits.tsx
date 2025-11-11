import { useNavigate } from 'react-router'
import '../../styles/Habits.css'
import { useHabits } from '../../hooks/useHabits'
import { Loader } from '../../components/Loader'
import { AddIcon } from '../../components/Icons'

export default function Habits() {
  const navigate = useNavigate()
  const { habits, add, loading } = useHabits()

  const openHabitDetails = (id: number | undefined) => {
    navigate(`/habits/${id}`)
  }

  const onCreateHabit = async () => {
    const newHabitName = prompt('New habit')
    if (!newHabitName) return
    await add(newHabitName)
  }

  return (
    <>
      <section>
        {habits.length > 0 ? (
          <>
            <div className='add-btn-container'>
              <button onClick={onCreateHabit} disabled={loading}>
                +
              </button>
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
          </>
        ) : (
          <button className='new-habit-btn' onClick={onCreateHabit}>
            <span><AddIcon /></span>New Habit
          </button>
        )}
      </section>
      {loading && <Loader />}
    </>
  )
}
