import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Layout from './components/Layout'
import { checkUser } from './helpers'
import Attendance from './pages/Attendance'
import Dashboard from './pages/Dashboard'
import Homework from './pages/Homework'
import './layout.css'

function App() {
  const user = checkUser()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/attendance" replace /> : <Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="homework" element={<Homework />} />
        </Route>
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
