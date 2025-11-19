import { useEffect, useState } from 'react'
import { useHabits } from '../hooks/useHabits'
import { Habit } from '../components/Habit'
import { Loader } from '../components/Loader'
import { NewHabit } from '../components/NewHabit'
import { ParticlesSparks } from '../components/ParticlesSparks'
import { useTheme } from '../hooks/useTheme'
import { AddIcon } from '../components/Icons'
import '../styles/Dashboard.css'
import '../styles/Habits.css'

export default function Dashboard() {
  const { habits, update, loading } = useHabits()
  const { theme } = useTheme()
  const [showModal, setShowModal] = useState(false)
  const [spark, setSpark] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (!spark) return
    const timer = setTimeout(() => {
      setSpark(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [spark])

  const triggerSpark = () => {
    setSpark(true)
  }

  return (
    <>
      <section className={`dashboard-section ${theme}`}>
        <h2>Seize the day</h2>

        <div className='habits-container'>
          {habits.length > 0 &&
            habits.map((habit) => (
              <Habit
                key={habit.id}
                habit={habit}
                onComplete={update}
                triggerSpark={triggerSpark}
              />
            ))}
          <button className={`habit-container new-btn ${theme}`} onClick={openModal}>
            <span>
              <AddIcon />
            </span>
            New Habit
          </button>
        </div>
      </section>
      {showModal && <NewHabit closeModal={closeModal} />}
      {loading && <Loader />}
      {spark && (
        <div className='sparks-wrapper'>
          <ParticlesSparks />
        </div>
      )}
    </>
  )
}
