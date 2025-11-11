import { useNavigate } from 'react-router'
import '../../styles/Habits.css'
import { useHabits } from '../../hooks/useHabits'
import { Loader } from '../../components/Loader'
import { AddIcon } from '../../components/Icons'
import { useState } from 'react'
import { NewHabit } from '../../components/NewHabit'

export default function Habits() {
  const navigate = useNavigate()
  const { habits, loading } = useHabits()
  const [showModal, setShowModal] = useState(false)

  const openHabitDetails = (id: number | undefined) => {
    navigate(`/habits/${id}`)
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <section className='habits-section'>
        {habits.length > 0 ? (
          <>
            <div className='add-btn-container'>
              <button onClick={openModal} disabled={loading}>
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
          <button className='new-habit-btn' onClick={openModal}>
            <span>
              <AddIcon />
            </span>
            New Habit
          </button>
        )}
      </section>
      {loading && <Loader />}
      {showModal && <NewHabit closeModal={closeModal} />}
    </>
  )
}
