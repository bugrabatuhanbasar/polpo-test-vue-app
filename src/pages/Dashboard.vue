<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="user-info">
      <p>Welcome, {{ authStore.user?.email }}!</p>
      <p>You are successfully authenticated.</p>
    </div>

    <div class="cookie-info">
      <h3>Cookie Information</h3>
      <p>Current cookies:</p>
      <pre>{{ currentCookies }}</pre>
    </div>

    <div class="actions">
      <button @click="refreshCookies" class="btn-secondary">
        Refresh Cookie Info
      </button>
      <button @click="logout" class="btn-danger">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.js'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const currentCookies = ref('')

    const refreshCookies = () => {
      currentCookies.value = document.cookie || 'No cookies found'
    }

    const logout = () => {
      authStore.logout()
      router.push('/')
    }

    onMounted(() => {
      refreshCookies()
    })

    return {
      authStore,
      currentCookies,
      refreshCookies,
      logout
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.user-info {
  background-color: #e7f3ff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.cookie-info {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.cookie-info pre {
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn-secondary {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>