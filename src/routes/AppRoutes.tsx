import { Navigate, Route, Routes } from 'react-router'
import Dashboard from '../pages/private/Dashboard'
import Habits from '../pages/private/Habits'
import AppLayout from '../layouts/AppLayout'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/auth/Login'
import PrivateRoutes from './PrivateRoutes'
import Habit from '../pages/private/HabitDetails'
import Calendar from '../pages/private/Calendar'

export default function AppRoutes() {
  return (
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
  )
}
