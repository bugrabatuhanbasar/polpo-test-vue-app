<template>
  <div class="document-view">
    <div class="header">
      <h1>Sample Document</h1>
      <button @click="goToDashboard" class="btn-back">
        Back to Dashboard
      </button>
    </div>

    <div class="access-log">
      <h2>Access Information</h2>
      <div class="log-entry">
        <strong>Access Token:</strong>
        <code>{{ accessToken }}</code>
      </div>
      <div class="log-entry">
        <strong>Access Time:</strong>
        <code>{{ accessTime }}</code>
      </div>
      <div class="log-entry">
        <strong>Session Cookie:</strong>
        <code>{{ sessionCookie }}</code>
      </div>
      <div class="log-entry">
        <strong>All Cookies:</strong>
        <pre>{{ allCookies }}</pre>
      </div>
    </div>

    <div class="document-content">
      <h2>Document Content</h2>
      <div class="content-body">
        <h3>Sample Marketing Report Q4 2024</h3>

        <section>
          <h4>Executive Summary</h4>
          <p>
            This quarterly report provides an overview of our marketing initiatives
            and their performance metrics during Q4 2024. Our team achieved significant
            growth across multiple channels, with particular success in digital campaigns.
          </p>
        </section>

        <section>
          <h4>Key Metrics</h4>
          <ul>
            <li>Total Impressions: 2,450,000</li>
            <li>Click-through Rate: 3.8%</li>
            <li>Conversion Rate: 12.5%</li>
            <li>Customer Acquisition Cost: $45</li>
            <li>Return on Ad Spend: 4.2x</li>
          </ul>
        </section>

        <section>
          <h4>Campaign Highlights</h4>
          <p>
            Our social media campaigns showed exceptional performance, with engagement
            rates exceeding industry benchmarks by 25%. The holiday season promotion
            generated the highest ROI of the year, contributing to a 35% increase in
            revenue compared to Q3.
          </p>
        </section>

        <section>
          <h4>Recommendations</h4>
          <p>
            Based on Q4 performance, we recommend increasing budget allocation to
            high-performing digital channels and exploring new partnerships with
            influencers in our target demographic. Additionally, we should invest
            in marketing automation tools to improve campaign efficiency.
          </p>
        </section>
      </div>
    </div>

    <div class="console-logs">
      <h3>Console Logs</h3>
      <p class="info-text">Check your browser console for detailed access logs</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'DocumentView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const accessToken = ref('N/A')
    const accessTime = ref('')
    const sessionCookie = ref('N/A')
    const allCookies = ref('')

    const getCookie = (name) => {
      const cookies = document.cookie.split(';')
      const cookie = cookies.find(c => c.trim().startsWith(`${name}=`))
      return cookie ? cookie.split('=')[1] : null
    }

    const logAccessDetails = () => {
      const token = route.query.doc_token || 'NO_TOKEN'
      const timestamp = new Date().toISOString()
      const session = getCookie('app_session')
      const cookies = document.cookie

      accessToken.value = token
      accessTime.value = timestamp
      sessionCookie.value = session || 'No session cookie found'
      allCookies.value = cookies || 'No cookies found'

      // Comprehensive console logging
      console.log('═══════════════════════════════════════════════')
      console.log('📄 DOCUMENT ACCESS LOG')
      console.log('═══════════════════════════════════════════════')
      console.log('🔑 Access Token:', token)
      console.log('🕐 Access Time:', timestamp)
      console.log('🍪 Session Cookie:', session || 'NONE')
      console.log('📋 All Cookies:', cookies || 'NONE')
      console.log('🌐 Referrer:', document.referrer || 'DIRECT')
      console.log('📍 URL:', window.location.href)
      console.log('═══════════════════════════════════════════════')

      // Parse and log individual cookies
      if (cookies) {
        console.log('🔍 Individual Cookies:')
        cookies.split(';').forEach((cookie, index) => {
          const [name, value] = cookie.trim().split('=')
          console.log(`  ${index + 1}. ${name}: ${value}`)
        })
      }
      console.log('═══════════════════════════════════════════════')
    }

    const goToDashboard = () => {
      router.push('/dashboard')
    }

    onMounted(() => {
      logAccessDetails()
    })

    return {
      accessToken,
      accessTime,
      sessionCookie,
      allCookies,
      goToDashboard
    }
  }
}
</script>

<style scoped>
.document-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #dee2e6;
}

.btn-back {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-back:hover {
  background-color: #0056b3;
}

.access-log {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  border-left: 4px solid #28a745;
}

.access-log h2 {
  margin-top: 0;
  color: #28a745;
  font-size: 18px;
}

.log-entry {
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

.log-entry strong {
  display: block;
  margin-bottom: 5px;
  color: #495057;
  font-size: 14px;
}

.log-entry code {
  display: block;
  background-color: #e9ecef;
  padding: 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  word-break: break-all;
}

.log-entry pre {
  background-color: #e9ecef;
  padding: 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
}

.document-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  margin-bottom: 30px;
}

.document-content h2 {
  margin-top: 0;
  color: #212529;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.content-body h3 {
  color: #007bff;
  margin-bottom: 20px;
}

.content-body section {
  margin-bottom: 25px;
}

.content-body h4 {
  color: #495057;
  margin-bottom: 10px;
  font-size: 18px;
}

.content-body p {
  line-height: 1.6;
  color: #212529;
  margin-bottom: 15px;
}

.content-body ul {
  list-style-type: none;
  padding-left: 0;
}

.content-body ul li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  color: #212529;
}

.content-body ul li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: #007bff;
  font-weight: bold;
}

.console-logs {
  background-color: #fff3cd;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.console-logs h3 {
  margin-top: 0;
  color: #856404;
  font-size: 16px;
}

.info-text {
  margin: 0;
  color: #856404;
  font-size: 14px;
}
</style>
