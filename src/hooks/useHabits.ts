import { useEffect, useState } from 'react'
import type { HabitType } from '../types'
import {
  completeHabit,
  createHabit,
  deleteHabit,
  getAllHabits,
  getSingleHabit,
  updateTitle,
} from '../services/habits'

export function useHabits() {
  const [habits, setHabits] = useState<HabitType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

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
        throw new Error('Error fetching habits')
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
      throw new Error('Error creating habit')
    } finally {
      setLoading(false)
    }
  }

  async function get(id: string | undefined) {
    try {
      setLoading(true)
      return await getSingleHabit(Number(id))
    } catch {
      throw new Error(`Error getting habit with id: ${id}`)
    } finally {
      setLoading(false)
    }
  }

  async function remove(id: string | undefined) {
    try {
      setLoading(true)
      await deleteHabit(Number(id))
    } catch {
      throw new Error(`Error deleting habit with id: ${id}`)
    } finally {
      setLoading(false)
    }
  }

  async function update(id: number, newTitle?: string) {
    try {
      setLoading(true)
      if (newTitle) {
        await updateTitle(id, newTitle)
      } else {
        await completeHabit(id)
      }
      await fetchAllHabits()
    } catch {
      throw new Error(`Error updating habit with id: ${id}`)
    } finally {
      setLoading(false)
    }
  }

  return { habits, add, get, remove, update, loading }
}
