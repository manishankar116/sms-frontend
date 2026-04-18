import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
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
