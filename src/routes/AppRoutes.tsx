import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import AppLayout from '../layouts/AppLayout'
import AuthLayout from '../layouts/AuthLayout'
import PrivateRoutes from './PrivateRoutes'
import { Loader } from '../components/Loader'

const Login = lazy(() => import('../pages/auth/Login'))
const Dashboard = lazy(() => import('../pages/private/Dashboard'))
const Habits = lazy(() => import('../pages/private/Habits'))
const Calendar = lazy(() => import('../pages/private/Calendar'))
const Habit = lazy(() => import('../pages/private/HabitDetails'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/habits' element={<Habits />} />
            <Route path='/habits/:id' element={<Habit />} />
            <Route path='/calendar' element={<Calendar />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
