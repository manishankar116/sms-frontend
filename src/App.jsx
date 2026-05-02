import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Layout from './components/Layout'
import { checkUser } from './helpers'
import Attendance from './pages/Attendance'
import Dashboard from './pages/Dashboard'
import Homework from './pages/Homework'
import './layout.css'
import Exams from './Components/Exams'
import Marks from './Components/Marks'
import Announcements from './Components/Announcements'

function App() {
  const user = checkUser()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/attendance" replace /> : <Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/attendance" replace />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="homework" element={<Homework />} />
          <Route path="exams" element={<Exams />} />
          <Route path="marks" element={<Marks />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>
        <Route path="*" element={<Navigate to={user ? '/attendance' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
