import type { HabitType } from '../types'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useHabits } from '../hooks/useHabits'
import { useTheme } from '../hooks/useTheme'
import { calculateStreak } from '../utils/streak'
import { formatString } from '../utils/stringFormatter'
import { InfoIcon } from '../components/Icons'
import { toast } from 'sonner'

interface EditName {
  name: string
  show: boolean
}

export default function Habit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { get, remove, update } = useHabits()
  const { theme } = useTheme()
  const [habit, setHabit] = useState<HabitType>()
  const [editName, setEditName] = useState<EditName>({ name: '', show: false })
  const [showHelper, setShowHelper] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchHabit()
  }, [id])

  useEffect(() => {
    inputRef.current?.focus()
  }, [editName.show])

  const fetchHabit = async () => {
    const result = await get(id)
    if (!result) return

    const habit = {
      ...result,
      streak: calculateStreak(result.completedDates),
    }

    setHabit(habit as HabitType)
    setEditName({ name: habit.name, show: false })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelper(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDelete = (id: string | undefined) => {
    toast('Are you sure you want to delete it?', {
      id: '001',
      toasterId: 'confirm',
      duration: Infinity,
      action: {
        label: 'Confirm',
        onClick: () => onDelete(id),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    })
  }

  const onDelete = async (id: string | undefined) => {
    try {
      await remove(id)
      toast.success('Habit deleted successfully', { toasterId: 'global' })
      navigate('/habits')
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message, { toasterId: 'global' })
    }
  }

  const onCancel = () => {
    setEditName((prev) => ({ ...prev, name: habit?.name ?? '' }))
    hideEditNameInput()
  }

  const onHandleEnter: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key !== 'Enter') return
    onEditName()
  }

  const onEditName = async () => {
    if (editName.name === '') return
    if (editName.name !== habit?.name) {
      try {
        await update(habit?.id as number, editName.name)
        toast.success('Habit updated successfully', { toasterId: 'global' })
        setHabit((prev) => (prev ? { ...prev, name: editName.name } : prev))
      } catch (err) {
        if (err instanceof Error)
          toast.error(err.message, { toasterId: 'global' })
      }
    }
    hideEditNameInput()
  }

  const showEditNameInput = () => {
    setEditName((prev) => ({ ...prev, show: true }))
  }

  const hideEditNameInput = () => {
    setEditName((prev) => ({ ...prev, show: false }))
  }

  const goBack = () => {
    navigate('/habits')
  }

  return (
    <section className='habits-section'>
      <div className={`habit-details-container ${theme}`}>
        {habit ? (
          <>
            <table className={`habit-details-table ${theme}`}>
              <tbody>
                <tr>
                  <td style={{ borderRadius: '10px 0 0 0' }}>
                    <strong>Habit:</strong>
                  </td>
                  <td style={{ padding: '5px' }}>
                    <div
                      className={`habit-name ${theme}`}
                      onClick={showEditNameInput}
                    >
                      {editName.show ? (
                        <input
                          ref={inputRef}
                          onKeyDown={onHandleEnter}
                          value={editName.name}
                          onChange={(e) =>
                            setEditName((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p>{formatString(19, habit.name)}</p>
                      )}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Streak:</strong>
                  </td>
                  <td>
                    {habit.streak} {`day${habit.streak === 1 ? '' : 's'}`}
                  </td>
                </tr>

                <tr>
                  <td style={{ borderRadius: '0 0 0 10px', border: 'none' }}>
                    <strong>Created at:</strong>
                  </td>
                  <td style={{ border: 'none' }}>
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
            <>
              {editName.show ? (
                <div className='btn-container'>
                  <button className={`habit-btn ${theme}`} onClick={onEditName}>
                    Save
                  </button>
                  <button className={`habit-btn ${theme}`} onClick={onCancel}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className={`habit-btn ${theme}`}
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              )}
            </>
          </>
        ) : (
          <>
            <p>Nothing here to show</p>
          </>
        )}
        <button className={`close-btn ${theme}`} onClick={goBack}>
          &times;
        </button>
      </div>

      {showHelper && (
        <div className={`helper ${theme}`}>
          <div className='icon'>
            <InfoIcon />
          </div>
          <div className='helper-text'>
            <p>
              You can edit the habit name by <strong>clicking</strong> on it
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
