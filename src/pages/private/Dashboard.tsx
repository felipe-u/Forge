import { useEffect, useRef, useState } from 'react'
import { Habit } from '../../components/Habit'
import { AddIcon } from '../../components/Icons'
import { Loader } from '../../components/Loader'
import { useHabits } from '../../hooks/useHabits'
import '../../styles/Dashboard.css'

export default function Dashboard() {
  const { habits, add, update, loading } = useHabits()
  const [spark, setSpark] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onCreateHabit = async () => {
    const newHabitName = prompt('New habit')
    if (!newHabitName) return
    await add(newHabitName)
  }

  useEffect(() => {
    if (!spark) return

    videoRef.current?.play()

    const timer = setTimeout(() => {
      setSpark(false)
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }, 2600)

    return () => clearTimeout(timer)
  }, [spark])

  const triggerSpark = () => {
    setSpark(true)
  }

  return (
    <>
      <section className='dashboard-section'>
        {habits.length > 0 ? (
          <>
            <h2>Seize the day</h2>
            <div className='habits-container'>
              {habits.map((habit) => (
                <Habit
                  key={habit.id}
                  habit={habit}
                  onComplete={update}
                  triggerSpark={triggerSpark}
                />
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
      {spark && (
        <div className='sparks-wrapper'>
          <video
            ref={videoRef}
            className='sparks-bg'
            src='/sparks.mp4'
            muted
            playsInline
          />
        </div>
      )}
    </>
  )
}
