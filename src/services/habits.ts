import {
  addHabit,
  getHabit,
  getHabits,
  removeHabit,
  updateHabit,
} from '../db/indexedDB'
import type { HabitType } from '../types'
import { calculateStreak } from '../utils/streak'

export async function getAllHabits() {
  try {
    const res = await getHabits()
    const habits = res as HabitType[]

    return habits.map((habit) => ({
      ...habit,
      streak: calculateStreak(habit.completedDates),
    }))
  } catch (err) {
    console.error('DB failed fetching habits: ', err)
    throw err
  }
}

export async function createHabit(habit: { name: string }) {
  try {
    return await addHabit({
      ...habit,
      createdAt: new Date(),
      completedDates: [],
      streak: 0,
    })
  } catch (err) {
    console.error('DB failed creating habit: ', err)
    throw err
  }
}

export async function getSingleHabit(
  id: number
): Promise<HabitType | undefined> {
  try {
    return (await getHabit(id)) as HabitType
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

export async function completeHabit(id: number) {
  try {
    const habit = await getSingleHabit(id)
    const today = new Date().toISOString().slice(0, 10)

    if (!habit) return

    if (!habit.completedDates.includes(today)) {
      habit.completedDates.push(today)
      await updateHabit(habit)
    }
  } catch (err) {
    console.error(`DB failed updating habit with id: ${id}`, err)
  }
}
