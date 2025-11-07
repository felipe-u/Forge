import { addHabit, getHabit, getHabits, removeHabit } from '../db/indexedDB'
import type { HabitType } from '../types'

export async function getAllHabits() {
  try {
    const res = await getHabits()
    return res as HabitType[]
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

export async function getSingleHabit(id: number) {
  try {
    return await getHabit(id)
  } catch (err) {
    console.error(`DB failed fetching habit with id: ${id}`, err)
  }
}

export async function deleteHabit(id: number) {
  try {
    return await removeHabit(id)
  } catch (err) {
    console.error(`DB failed deleting habit with id: ${id}`, err)
  }
}
