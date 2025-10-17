import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log(`ACCESS ${req.method} ${req.url} Cookie: ${req.headers.cookie || 'none'}`)

  if (req.headers.cookie) {
    const masked = req.headers.cookie.replace(
      /(app_session=)([^;]+)/,
      (match, prefix, value) => prefix + value.slice(0, 4) + '***'
    )
    console.log(`MASKED ${req.method} ${req.url} Cookie: ${masked}`)
  }

  next()
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  console.log('Login attempt:', { email, password })

  if (email && password) {
    const token = 'session_' + Math.random().toString(36).substr(2, 9)

    res.cookie('app_session', token, {
      path: '/',
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.json({
      success: true,
      user: { email },
      token
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Email and password required'
    })
  }
})

app.post('/api/auth/token-login', (req, res) => {
  const { token } = req.body

  console.log('Token login attempt:', { token })

  if (token) {
    res.cookie('app_session', token, {
      path: '/',
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.json({
      success: true,
      user: { email: 'external@example.com' },
      token
    })
  } else {
    res.status(400).json({
      success: false,
      message: 'Token required'
    })
  }
})

app.get('/api/auth/status', (req, res) => {
  const sessionCookie = req.headers.cookie?.split(';')
    .find(cookie => cookie.trim().startsWith('app_session='))

  if (sessionCookie) {
    res.json({
      authenticated: true,
      user: { email: 'authenticated@example.com' }
    })
  } else {
    res.json({
      authenticated: false
    })
  }
})

app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`)
  console.log('Endpoints:')
  console.log('  POST /api/auth/login')
  console.log('  POST /api/auth/token-login')
  console.log('  GET /api/auth/status')
})