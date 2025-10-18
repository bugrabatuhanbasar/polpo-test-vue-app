import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth.js'
import LoginForm from '../components/LoginForm.vue'
import Dashboard from '../pages/Dashboard.vue'
import DocumentView from '../pages/DocumentView.vue'
import TokenTestPage from '../pages/TokenTestPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/document',
    name: 'Document',
    component: DocumentView,
    meta: { requiresAuth: true }
  },
  {
    path: '/tokens',
    name: 'TokenTest',
    component: TokenTestPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const token = to.query.external_token
  if (token) {
    try {
      await authStore.loginWithToken(token)
      next({ path: '/dashboard', replace: true })
      return
    } catch (error) {
      console.error('External token login failed:', error)
    }
  }

  authStore.checkAuth()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/')
  } else if (to.path === '/' && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router