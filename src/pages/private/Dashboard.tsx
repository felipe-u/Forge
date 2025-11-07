import { Habit } from '../../components/Habit'
import { useHabits } from '../../hooks/useHabits'
import '../../styles/Dashboard.css'

export default function Dashboard() {
  const { habits, complete } = useHabits()

  return (
    <section>
      <h2>Seize the day</h2>
      <div className='habits-container'>
        {habits.map((habit) => (
          <Habit key={habit.id} habit={habit} onComplete={complete}/>
        ))}
      </div>
    </section>
  )
}
