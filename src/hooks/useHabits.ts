import { useEffect, useState } from 'react'
import type { HabitType } from '../types'
import { createHabit, getAllHabits } from '../services/habits'

export function useHabits() {
  const [habits, setHabits] = useState<HabitType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  async function fetchAllHabits() {
    const res = await getAllHabits()
    setHabits(res as HabitType[])
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        await fetchAllHabits()
      } catch {
        setError('Error fetching habits')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function add(name: string) {
    try {
      setLoading(true)
      await createHabit({ name })
      await fetchAllHabits()
    } catch {
      setError('Error creating habit')
    } finally {
      setLoading(false)
    }
  }

  return { habits, add, error, loading }
}
