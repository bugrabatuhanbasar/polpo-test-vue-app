<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="user-info">
      <p>Welcome, {{ authStore.user?.email }}!</p>
      <p>You are successfully authenticated.</p>
    </div>

    <div class="document-access">
      <h3>Sample Document Access</h3>
      <p>Click the button below to generate a unique access link to the sample document. Each access will be logged with a unique token.</p>

      <div class="link-generator">
        <button @click="generateDocumentLink" class="btn-primary">
          Generate Document Link
        </button>
      </div>

      <div v-if="generatedLink" class="generated-link">
        <h4>Your Unique Document Link:</h4>
        <div class="link-display">
          <a :href="generatedLink" target="_blank" class="document-link">
            {{ generatedLink }}
          </a>
          <button @click="copyLink" class="btn-copy">
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <p class="link-info">
          <strong>Token:</strong> <code>{{ currentToken }}</code>
        </p>
        <p class="hint">Click the link to access the document. Check browser console for detailed logs.</p>
      </div>
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
    const generatedLink = ref('')
    const currentToken = ref('')
    const copied = ref(false)

    const generateUniqueToken = () => {
      const timestamp = Date.now()
      const random = Math.random().toString(36).substring(2, 11)
      return `doc_${timestamp}_${random}`
    }

    const generateDocumentLink = () => {
      const token = generateUniqueToken()
      currentToken.value = token

      // Generate the full URL with the unique token
      const baseUrl = window.location.origin
      generatedLink.value = `${baseUrl}/document?doc_token=${token}`

      console.log('═══════════════════════════════════════════════')
      console.log('🔗 DOCUMENT LINK GENERATED')
      console.log('═══════════════════════════════════════════════')
      console.log('🔑 Unique Token:', token)
      console.log('🌐 Document URL:', generatedLink.value)
      console.log('🕐 Generated At:', new Date().toISOString())
      console.log('═══════════════════════════════════════════════')

      copied.value = false
    }

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(generatedLink.value)
        copied.value = true
        console.log('✅ Link copied to clipboard:', generatedLink.value)
        setTimeout(() => {
          copied.value = false
        }, 2000)
      } catch (err) {
        console.error('❌ Failed to copy link:', err)
      }
    }

    const refreshCookies = () => {
      currentCookies.value = document.cookie || 'No cookies found'
      console.log('🔄 Cookies refreshed:', currentCookies.value)
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
      generatedLink,
      currentToken,
      copied,
      generateDocumentLink,
      copyLink,
      refreshCookies,
      logout
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-info {
  background-color: #e7f3ff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.document-access {
  background-color: #e8f5e9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #28a745;
}

.document-access h3 {
  margin-top: 0;
  color: #155724;
}

.document-access > p {
  color: #155724;
  margin-bottom: 15px;
}

.link-generator {
  margin-bottom: 20px;
}

.btn-primary {
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #218838;
}

.generated-link {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
}

.generated-link h4 {
  margin-top: 0;
  color: #155724;
  font-size: 16px;
}

.link-display {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
}

.document-link {
  flex: 1;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  word-break: break-all;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.document-link:hover {
  background-color: #e9ecef;
  text-decoration: underline;
}

.btn-copy {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-copy:hover {
  background-color: #0056b3;
}

.link-info {
  margin-bottom: 10px;
  color: #155724;
}

.link-info code {
  background-color: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}

.hint {
  font-size: 14px;
  color: #6c757d;
  font-style: italic;
  margin: 0;
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