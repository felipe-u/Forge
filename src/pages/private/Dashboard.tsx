import { Habit } from '../../components/Habit'
import '../../styles/Dashboard.css'

export default function Dashboard() {
  return (
    <section>
      <h2>Seize the day</h2>
      <div className='habits-container'>
        <Habit />
        <Habit />
        <Habit />
      </div>
    </section>
  )
}
