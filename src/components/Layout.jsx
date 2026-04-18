import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkUser } from '../helpers'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
  const location = useLocation()
  const user = checkUser()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="layout-shell">
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
