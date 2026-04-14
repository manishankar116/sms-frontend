import { useEffect, useState } from 'react'

function App() {
  const [loginID, setLoginID] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const storedRole = localStorage.getItem('role')
    const storedUsername = localStorage.getItem('username')

    if (storedRole) {
      setRole(storedRole)
      setUsername(storedUsername ?? '')
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginID, password }),
      })

      if (!response.ok) {
        setError('Invalid credentials. Please try again.')
        return
      }

      const data = await response.json()

      if (!data?.token || !data?.role) {
        setError('Login response was incomplete. Please try again.')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username ?? loginID)
      localStorage.setItem('role', data.role)

      setRole(data.role)
      setUsername(data.username ?? loginID)
      setLoginID('')
      setPassword('')
    } catch {
      setError('Unable to reach the server. Please check your network and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')

    setRole('')
    setUsername('')
    setLoginID('')
    setPassword('')
    setError('')
  }

  if (role) {
    return (
      <section id="center">
        <h1>Welcome{username ? `, ${username}` : ''}!</h1>
        <p>Current role: {role}</p>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </section>
    )
  }

  return (
    <section id="center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-id">Login ID</label>
        <input
          id="login-id"
          type="text"
          value={loginID}
          onChange={(event) => setLoginID(event.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}
    </section>
  )
}

export default App
