<template>
  <div class="token-test-page">
    <div class="header">
      <h1>API Token & Query Test Suite</h1>
      <p class="subtitle">Generate and test all four endpoint types with detailed console logging</p>
    </div>

    <!-- Endpoint 1: Webcal Token -->
    <div class="test-section webcal">
      <div class="section-header">
        <h2>1. Webcal Authentication Token</h2>
        <span class="endpoint-badge">/api/agendas/webcal/{'{TOKEN}'}</span>
      </div>
      <p class="description">
        Generate a secure webcal auth token for calendar feed access. Each token is unique and tracked.
      </p>

      <div class="controls">
        <button @click="generateWebcalToken" class="btn btn-primary">
          Generate Webcal Token
        </button>
      </div>

      <div v-if="webcalToken" class="result-card">
        <div class="result-header">
          <span class="status-badge success">Token Generated</span>
        </div>
        <div class="result-content">
          <div class="field">
            <label>Auth Token:</label>
            <code class="token">{{ webcalToken }}</code>
            <button @click="copyToClipboard(webcalToken)" class="btn-copy">Copy</button>
          </div>
          <div class="field">
            <label>Full Endpoint:</label>
            <code class="endpoint">/api/agendas/webcal/{{ webcalToken }}</code>
          </div>
          <div class="field">
            <label>Test URL:</label>
            <a :href="getWebcalUrl()" class="test-link" @click="testWebcal">
              {{ getWebcalUrl() }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Endpoint 2: RSS Token -->
    <div class="test-section rss">
      <div class="section-header">
        <h2>2. RSS Feed Authentication Token</h2>
        <span class="endpoint-badge">/api/rss/{'{TOKEN}'}</span>
      </div>
      <p class="description">
        Generate a secure RSS auth token for feed access. Tokens are validated on each request.
      </p>

      <div class="controls">
        <button @click="generateRssToken" class="btn btn-primary">
          Generate RSS Token
        </button>
      </div>

      <div v-if="rssToken" class="result-card">
        <div class="result-header">
          <span class="status-badge success">Token Generated</span>
        </div>
        <div class="result-content">
          <div class="field">
            <label>Auth Token:</label>
            <code class="token">{{ rssToken }}</code>
            <button @click="copyToClipboard(rssToken)" class="btn-copy">Copy</button>
          </div>
          <div class="field">
            <label>Full Endpoint:</label>
            <code class="endpoint">/api/rss/{{ rssToken }}</code>
          </div>
          <div class="field">
            <label>Test URL:</label>
            <a :href="getRssUrl()" class="test-link" @click="testRss">
              {{ getRssUrl() }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Endpoint 3: Document Token with Query -->
    <div class="test-section document">
      <div class="section-header">
        <h2>3. Document Access with Sensitive Query</h2>
        <span class="endpoint-badge">/document/{'{DOC_ID}'}/{'{TOKEN}'}</span>
      </div>
      <p class="description">
        Generate a document access token with an associated sensitive query parameter.
      </p>

      <div class="controls">
        <div class="input-group">
          <label>Document ID:</label>
          <input
            v-model="documentId"
            type="text"
            placeholder="e.g., 123"
            class="input"
          />
        </div>
        <div class="input-group">
          <label>Sensitive Query:</label>
          <input
            v-model="documentQuery"
            type="text"
            placeholder="e.g., confidential_data_search"
            class="input"
          />
        </div>
        <button @click="generateDocToken" class="btn btn-primary">
          Generate Document Token
        </button>
      </div>

      <div v-if="docToken" class="result-card">
        <div class="result-header">
          <span class="status-badge success">Token Generated</span>
        </div>
        <div class="result-content">
          <div class="field">
            <label>Document ID:</label>
            <code>{{ documentId }}</code>
          </div>
          <div class="field">
            <label>Auth Token:</label>
            <code class="token">{{ docToken }}</code>
            <button @click="copyToClipboard(docToken)" class="btn-copy">Copy</button>
          </div>
          <div class="field">
            <label>Sensitive Query:</label>
            <code class="query">{{ documentQuery }}</code>
          </div>
          <div class="field">
            <label>Full Endpoint:</label>
            <code class="endpoint">/document/{{ documentId }}/{{ docToken }}</code>
          </div>
          <div class="field">
            <label>Test URL:</label>
            <a :href="getDocumentUrl()" class="test-link" @click="testDocument">
              {{ getDocumentUrl() }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Endpoint 4: Dashboard Query -->
    <div class="test-section dashboard">
      <div class="section-header">
        <h2>4. Dashboard with Sensitive Query Parameters</h2>
        <span class="endpoint-badge">/nl/dashboard?query={'{QUERY}'}&...</span>
      </div>
      <p class="description">
        Generate a dashboard query URL with sensitive search parameters and context filters.
      </p>

      <div class="controls">
        <div class="input-group">
          <label>Search Query:</label>
          <input
            v-model="dashQuery"
            type="text"
            placeholder="e.g., classified_information"
            class="input"
          />
        </div>
        <div class="input-group">
          <label>Group Paths (optional):</label>
          <input
            v-model="dashGroupPaths"
            type="text"
            placeholder="e.g., /security/classified"
            class="input"
          />
        </div>
        <div class="input-group">
          <label>Context:</label>
          <input
            v-model="dashContext"
            type="text"
            placeholder="Default: AZ,BUZA,BZ,DEF,EZK,FIN,IenW,JenV,LNV,OCW,SZW,VWS"
            class="input"
          />
        </div>
        <button @click="generateDashQuery" class="btn btn-primary">
          Generate Dashboard Query
        </button>
      </div>

      <div v-if="dashboardQueryId" class="result-card">
        <div class="result-header">
          <span class="status-badge success">Query Generated</span>
        </div>
        <div class="result-content">
          <div class="field">
            <label>Query ID:</label>
            <code>{{ dashboardQueryId }}</code>
          </div>
          <div class="field">
            <label>Search Query:</label>
            <code class="query">{{ dashQuery }}</code>
          </div>
          <div class="field">
            <label>Group Paths:</label>
            <code>{{ dashGroupPaths || 'NONE' }}</code>
          </div>
          <div class="field">
            <label>Context:</label>
            <code>{{ dashContext || 'AZ,BUZA,BZ,DEF,EZK,FIN,IenW,JenV,LNV,OCW,SZW,VWS' }}</code>
          </div>
          <div class="field">
            <label>Full URL:</label>
            <code class="endpoint">/nl/dashboard?{{ dashboardParams }}</code>
          </div>
          <div class="field">
            <label>Test URL:</label>
            <a :href="getDashboardUrl()" class="test-link" @click="testDashboard">
              {{ getDashboardUrl() }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Console Log Instructions -->
    <div class="info-section">
      <h3>📋 Testing Instructions</h3>
      <ul>
        <li>Generate tokens using the buttons above</li>
        <li>Click "Test URL" links to simulate access (logs to console)</li>
        <li>Open browser console (F12) to see detailed authentication logs</li>
        <li>Each token generation and validation is logged with full details</li>
        <li>All sensitive data is visible in console for testing purposes only</li>
      </ul>
    </div>

    <!-- Back Button -->
    <div class="actions">
      <button @click="goBack" class="btn btn-secondary">
        ← Back to Dashboard
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  generateWebcalToken as genWebcal,
  generateRssToken as genRss,
  generateDocumentToken as genDoc,
  generateDashboardQuery as genDash,
  validateWebcalToken,
  validateRssToken,
  validateDocumentToken,
  validateDashboardQuery
} from '../utils/tokenManager.js'

export default {
  name: 'TokenTestPage',
  setup() {
    const router = useRouter()

    // Webcal state
    const webcalToken = ref('')

    // RSS state
    const rssToken = ref('')

    // Document state
    const documentId = ref('123')
    const documentQuery = ref('sensitive_document_search')
    const docToken = ref('')

    // Dashboard state
    const dashQuery = ref('classified_information')
    const dashGroupPaths = ref('')
    const dashContext = ref('AZ,BUZA,BZ,DEF,EZK,FIN,IenW,JenV,LNV,OCW,SZW,VWS')
    const dashboardQueryId = ref('')
    const dashboardParams = ref('')

    // Generate Webcal Token
    const generateWebcalToken = () => {
      webcalToken.value = genWebcal()
    }

    // Generate RSS Token
    const generateRssToken = () => {
      rssToken.value = genRss()
    }

    // Generate Document Token
    const generateDocToken = () => {
      if (!documentId.value || !documentQuery.value) {
        alert('Please enter both Document ID and Query')
        return
      }
      docToken.value = genDoc(documentId.value, documentQuery.value)
    }

    // Generate Dashboard Query
    const generateDashQuery = () => {
      if (!dashQuery.value) {
        alert('Please enter a search query')
        return
      }
      const result = genDash(
        dashQuery.value,
        dashGroupPaths.value,
        dashContext.value
      )
      dashboardQueryId.value = result.queryId
      dashboardParams.value = result.queryParams
    }

    // Get URLs
    const getWebcalUrl = () => {
      const base = window.location.origin
      return `${base}/api/agendas/webcal/${webcalToken.value}`
    }

    const getRssUrl = () => {
      const base = window.location.origin
      return `${base}/api/rss/${rssToken.value}`
    }

    const getDocumentUrl = () => {
      const base = window.location.origin
      return `${base}/document/${documentId.value}/${docToken.value}`
    }

    const getDashboardUrl = () => {
      const base = window.location.origin
      return `${base}/nl/dashboard?${dashboardParams.value}`
    }

    // Test endpoints (simulate access)
    const testWebcal = (e) => {
      e.preventDefault()
      validateWebcalToken(webcalToken.value)
      alert('Webcal token validated! Check console for details.')
    }

    const testRss = (e) => {
      e.preventDefault()
      validateRssToken(rssToken.value)
      alert('RSS token validated! Check console for details.')
    }

    const testDocument = (e) => {
      e.preventDefault()
      validateDocumentToken(documentId.value, docToken.value)
      alert('Document token validated! Check console for details.')
    }

    const testDashboard = (e) => {
      e.preventDefault()
      validateDashboardQuery(dashboardQueryId.value)
      alert('Dashboard query validated! Check console for details.')
    }

    // Copy to clipboard
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        alert('Copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    // Navigation
    const goBack = () => {
      router.push('/dashboard')
    }

    return {
      // State
      webcalToken,
      rssToken,
      documentId,
      documentQuery,
      docToken,
      dashQuery,
      dashGroupPaths,
      dashContext,
      dashboardQueryId,
      dashboardParams,
      // Methods
      generateWebcalToken,
      generateRssToken,
      generateDocToken,
      generateDashQuery,
      getWebcalUrl,
      getRssUrl,
      getDocumentUrl,
      getDashboardUrl,
      testWebcal,
      testRss,
      testDocument,
      testDashboard,
      copyToClipboard,
      goBack
    }
  }
}
</script>

<style scoped>
.token-test-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 16px;
}

.test-section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #3498db;
}

.test-section.webcal {
  border-left-color: #9b59b6;
}

.test-section.rss {
  border-left-color: #e67e22;
}

.test-section.document {
  border-left-color: #16a085;
}

.test-section.dashboard {
  border-left-color: #e74c3c;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.section-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 20px;
}

.endpoint-badge {
  background: #ecf0f1;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #34495e;
}

.description {
  color: #7f8c8d;
  margin-bottom: 20px;
  line-height: 1.6;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.input-group {
  flex: 1;
  min-width: 250px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #34495e;
  font-weight: 500;
  font-size: 14px;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input:focus {
  outline: none;
  border-color: #3498db;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #3498db;
  color: white;
  align-self: flex-end;
}

.btn-primary:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.result-card {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.result-header {
  background: #ecf0f1;
  padding: 12px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.status-badge.success {
  background: #d4edda;
  color: #155724;
}

.result-content {
  padding: 20px;
}

.field {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.field:last-child {
  margin-bottom: 0;
}

.field label {
  min-width: 140px;
  font-weight: 600;
  color: #34495e;
  font-size: 14px;
}

.field code {
  flex: 1;
  background: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  border: 1px solid #e0e0e0;
  word-break: break-all;
}

.field code.token {
  color: #9b59b6;
}

.field code.query {
  color: #e74c3c;
}

.field code.endpoint {
  color: #16a085;
}

.btn-copy {
  padding: 6px 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-copy:hover {
  background: #2980b9;
}

.test-link {
  flex: 1;
  color: #3498db;
  text-decoration: none;
  padding: 8px 12px;
  background: white;
  border: 1px solid #3498db;
  border-radius: 4px;
  font-size: 13px;
  word-break: break-all;
  transition: all 0.3s;
}

.test-link:hover {
  background: #3498db;
  color: white;
}

.info-section {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.info-section h3 {
  margin-top: 0;
  color: #856404;
}

.info-section ul {
  margin: 10px 0 0 20px;
  color: #856404;
  line-height: 1.8;
}

.actions {
  text-align: center;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .field {
    flex-direction: column;
    align-items: flex-start;
  }

  .field label {
    min-width: auto;
  }
}
</style>
