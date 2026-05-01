const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000

export const getLoginExpiry = () => {
  const storedExpiry = localStorage.getItem('loginExpiry')
  const parsedExpiry = Number(storedExpiry)

  if (!Number.isFinite(parsedExpiry)) {
    return null
  }

  return parsedExpiry
}

export const persistLogin = ({ token, role, username }) => {
  const expiryTime = Date.now() + SEVEN_DAYS_IN_MS

  localStorage.setItem('token', token)
  localStorage.setItem('role', role)
  localStorage.setItem('username', username)
  localStorage.setItem('loginExpiry', String(expiryTime))
}

export const clearLogin = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('username')
  localStorage.removeItem('loginExpiry')
}

export const checkUser = () => {
  const storedRole = localStorage.getItem('role')
  const storedToken = localStorage.getItem('token')
  const loginExpiry = getLoginExpiry()

  if (!storedRole || !storedToken || !loginExpiry || Date.now() > loginExpiry) {
    clearLogin()
    return null
  }

  return {
    role: storedRole,
    token: storedToken,
    username: localStorage.getItem('username') ?? '',
    loginExpiry,
  }
}
