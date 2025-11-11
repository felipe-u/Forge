import { Habit } from '../../components/Habit'
import { AddIcon } from '../../components/Icons'
import { Loader } from '../../components/Loader'
import { useHabits } from '../../hooks/useHabits'
import '../../styles/Dashboard.css'

export default function Dashboard() {
  const { habits, add, update, loading } = useHabits()

  const onCreateHabit = async () => {
    const newHabitName = prompt('New habit')
    if (!newHabitName) return
    await add(newHabitName)
  }

  return (
    <>
      <section className='dashboard-section'>
        {habits.length > 0 ? (
          <>
            <h2>Seize the day</h2>
            <div className='habits-container'>
              {habits.map((habit) => (
                <Habit key={habit.id} habit={habit} onComplete={update} />
              ))}
            </div>
          </>
        ) : (
          <button className='new-habit-btn' onClick={onCreateHabit}>
            <span>
              <AddIcon />
            </span>
            New Habit
          </button>
        )}
      </section>
      {loading && <Loader />}
    </>
  )
}
