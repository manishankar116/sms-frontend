import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { checkUser, clearLogin, persistLogin } from '../helpers'

function Login() {
  const [loginID, setLoginID] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const user = checkUser()

    if (user) {
      setRole(user.role)
      setUsername(user.username)
      const fromPath = location.state?.from?.pathname || '/dashboard'
      navigate(fromPath, { replace: true })
    }
  }, [location.state, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const usernameForRequest = loginID
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameForRequest, password }),
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

      const loggedInUsername = data.username ?? loginID
      persistLogin({
        token: data.token,
        role: data.role,
        username: loggedInUsername,
      })

      setRole(data.role)
      setUsername(loggedInUsername)
      setLoginID('')
      setPassword('')

      const fromPath = location.state?.from?.pathname || '/dashboard'
      navigate(fromPath, { replace: true })
    } catch {
      setError('Unable to reach the server. Please check your network and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    clearLogin()

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

export default Login
