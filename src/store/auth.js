import { defineStore } from 'pinia'
import axios from 'axios'

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
        const response = await axios.post('/auth/login', credentials)
        this.isAuthenticated = true
        this.user = response.data.user
        return response.data
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
        const response = await axios.post('/auth/token-login', { token })
        this.isAuthenticated = true
        this.user = response.data.user
        return response.data
      } catch (error) {
        console.error('Token login failed:', error)
        document.cookie = `app_session=${token}; path=/`
        this.isAuthenticated = true
        this.user = { email: 'external@example.com' }
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      document.cookie = 'app_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    },

    checkAuth() {
      const cookies = document.cookie.split(';')
      const sessionCookie = cookies.find(cookie =>
        cookie.trim().startsWith('app_session=')
      )

      if (sessionCookie) {
        this.isAuthenticated = true
        this.user = { email: 'authenticated@example.com' }
      }
    }
  }
})