import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    loading: false
  }),

  actions: {
    async login(credentials) {
      this.loading = true
      try {
        // Simulate login - generate a session token
        const token = 'session_' + Math.random().toString(36).substr(2, 9)

        // Set cookie client-side
        const maxAge = 24 * 60 * 60 // 24 hours in seconds
        document.cookie = `app_session=${token}; path=/; max-age=${maxAge}; SameSite=Lax`

        console.log('Login successful - Cookie set:', token)
        console.log('Current cookies:', document.cookie)

        this.isAuthenticated = true
        this.user = { email: credentials.email }

        return { success: true, user: this.user, token }
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async loginWithToken(token) {
      this.loading = true
      try {
        // Set cookie client-side with external token
        const maxAge = 24 * 60 * 60 // 24 hours in seconds
        document.cookie = `app_session=${token}; path=/; max-age=${maxAge}; SameSite=Lax`

        console.log('Token login successful - Cookie set:', token)
        console.log('Current cookies:', document.cookie)

        this.isAuthenticated = true
        this.user = { email: 'external@example.com' }

        return { success: true, user: this.user, token }
      } catch (error) {
        console.error('Token login failed:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      document.cookie = 'app_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      console.log('Logged out - Cookie cleared')
      console.log('Current cookies:', document.cookie)
    },

    checkAuth() {
      const cookies = document.cookie.split(';')
      const sessionCookie = cookies.find(cookie =>
        cookie.trim().startsWith('app_session=')
      )

      if (sessionCookie) {
        const token = sessionCookie.split('=')[1]
        console.log('Auth check - Found session cookie:', token)
        this.isAuthenticated = true
        this.user = { email: 'authenticated@example.com' }
      } else {
        console.log('Auth check - No session cookie found')
        console.log('Current cookies:', document.cookie)
      }
    }
  }
})