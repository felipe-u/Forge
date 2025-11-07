import { useNavigate } from 'react-router'

export default function Habit() {
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/habits')
  }

  return (
    <section>
      <div className='habit-details-container'>
        <p>
          <strong>Habit: </strong>Meditate
        </p>
        <p>
          <strong>Streak: </strong>6 days
        </p>
        <p>
          <strong>Created at: </strong>06-11-2025
        </p>
        <button>Delete</button>
        <button className='close-btn' onClick={goBack}>
          x
        </button>
      </div>
    </section>
  )
}
