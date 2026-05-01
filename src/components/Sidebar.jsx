import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const role = (localStorage.getItem('role') || 'TEACHER').toUpperCase()

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Homework', path: '/homework' },
  ]

  const attendanceRoleItem =
    role === 'PARENT'
      ? { label: 'View Attendance', path: '/attendance' }
      : { label: 'Add Attendance', path: '/attendance' }

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav" aria-label="Dashboard navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
            end={item.path === '/dashboard'}
          >
            {item.label}
          </NavLink>
        ))}

        <div className="sidebar__role-label">Role Actions</div>
        <NavLink
          to={attendanceRoleItem.path}
          className={({ isActive }) =>
            isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
          }
        >
          {attendanceRoleItem.label}
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
