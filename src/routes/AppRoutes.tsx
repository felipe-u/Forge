import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import AppLayout from '../layouts/AppLayout'
import WelcomeLayout from '../layouts/WelcomeLayout'
import WelcomeGuard from './WelcomeGuard'
import { Loader } from '../components/Loader'

const Welcome = lazy(() => import('../pages/Welcome'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Habits = lazy(() => import('../pages/Habits'))
const Calendar = lazy(() => import('../pages/Calendar'))
const Habit = lazy(() => import('../pages/HabitDetails'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<WelcomeLayout />}>
          <Route path='/welcome' element={<Welcome />} />
        </Route>

        <Route
          element={
            <WelcomeGuard>
              <AppLayout />
            </WelcomeGuard>
          }
        >
          <Route index element={<Navigate to='/' replace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/habits' element={<Habits />} />
          <Route path='/habits/:id' element={<Habit />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
