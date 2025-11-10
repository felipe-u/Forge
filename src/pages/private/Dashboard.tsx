import { Habit } from '../../components/Habit'
import { Loader } from '../../components/Loader'
import { useHabits } from '../../hooks/useHabits'
import '../../styles/Dashboard.css'

export default function Dashboard() {
  const { habits, update, loading } = useHabits()

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
          <p>Add and habit</p>
        )}
      </section>
      {loading && <Loader />}
    </>
  )
}
