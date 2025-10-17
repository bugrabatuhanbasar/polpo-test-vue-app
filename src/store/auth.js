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

        console.log('═══════════════════════════════════════════════')
        console.log('🔐 LOGIN EVENT')
        console.log('═══════════════════════════════════════════════')
        console.log('✅ Login successful')
        console.log('🔑 Session Token:', token)
        console.log('📧 Email:', credentials.email)
        console.log('🍪 Cookie Set:', `app_session=${token}`)
        console.log('📋 All Cookies:', document.cookie)
        console.log('🕐 Timestamp:', new Date().toISOString())
        console.log('═══════════════════════════════════════════════')

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

        console.log('═══════════════════════════════════════════════')
        console.log('🔗 EXTERNAL TOKEN LOGIN')
        console.log('═══════════════════════════════════════════════')
        console.log('✅ Token login successful')
        console.log('🔑 External Token:', token)
        console.log('🍪 Cookie Set:', `app_session=${token}`)
        console.log('📋 All Cookies:', document.cookie)
        console.log('🕐 Timestamp:', new Date().toISOString())
        console.log('🌐 Source URL:', window.location.href)
        console.log('═══════════════════════════════════════════════')

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

      console.log('═══════════════════════════════════════════════')
      console.log('🚪 LOGOUT EVENT')
      console.log('═══════════════════════════════════════════════')
      console.log('✅ Logout successful')
      console.log('🗑️  Cookie cleared: app_session')
      console.log('📋 Remaining Cookies:', document.cookie || 'NONE')
      console.log('🕐 Timestamp:', new Date().toISOString())
      console.log('═══════════════════════════════════════════════')
    },

    checkAuth() {
      const cookies = document.cookie.split(';')
      const sessionCookie = cookies.find(cookie =>
        cookie.trim().startsWith('app_session=')
      )

      console.log('═══════════════════════════════════════════════')
      console.log('🔍 AUTH CHECK')
      console.log('═══════════════════════════════════════════════')

      if (sessionCookie) {
        const token = sessionCookie.split('=')[1]
        console.log('✅ Session found')
        console.log('🔑 Session Token:', token)
        console.log('📋 All Cookies:', document.cookie)
        this.isAuthenticated = true
        this.user = { email: 'authenticated@example.com' }
      } else {
        console.log('❌ No session found')
        console.log('📋 All Cookies:', document.cookie || 'NONE')
      }

      console.log('🕐 Timestamp:', new Date().toISOString())
      console.log('═══════════════════════════════════════════════')
    }
  }
})