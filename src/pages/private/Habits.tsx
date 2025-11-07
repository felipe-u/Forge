import { useNavigate } from 'react-router'
import '../../styles/Habits.css'

export default function Habits() {
  const navigate = useNavigate()

  const openHabitDetails = () => {
    navigate('/habits/1')
  }

  return (
    <section>
      <table className='habits-table'>
        <tr>
          <td>+</td>
        </tr>
        <tr onClick={openHabitDetails}>
          <td>Meditate</td>
        </tr>
        <tr onClick={openHabitDetails}>
          <td>Do excercise</td>
        </tr>
        <tr onClick={openHabitDetails}>
          <td>Reading</td>
        </tr>
      </table>
    </section>
  )
}
