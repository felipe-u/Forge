import { addHabit, getHabits } from '../db/indexedDB'
import type { Habit } from '../types'

export async function getAllHabits() {
  try {
    const res = await getHabits()
    return res as Habit[]
  } catch (err) {
    console.error('DB failed fetching habits: ', err)
    throw err
  }
}

export async function createHabit(habit: { name: string }) {
  try {
    return await addHabit({ ...habit, createdAt: new Date() })
  } catch (err) {
    console.error('DB failed creating habit: ', err)
    throw err
  }
}
