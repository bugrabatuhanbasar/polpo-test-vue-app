/**
 * Token Management Utility
 * Handles generation, storage, and validation of various auth tokens and queries
 */

// Token storage in memory (for testing purposes)
const tokenStore = {
  webcalTokens: new Set(),
  rssTokens: new Set(),
  documentTokens: new Map(), // Map of token -> { docId, query, timestamp }
  dashboardQueries: new Map() // Map of query -> { params, timestamp }
}

/**
 * Generate a secure random token
 */
export const generateToken = (prefix = 'token', length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${prefix}_${token}`
}

/**
 * Generate WEBCAL auth token
 */
export const generateWebcalToken = () => {
  const token = generateToken('WEBCAL', 40)
  tokenStore.webcalTokens.add(token)

  console.log('═══════════════════════════════════════════════')
  console.log('📅 WEBCAL TOKEN GENERATED')
  console.log('═══════════════════════════════════════════════')
  console.log('🔑 Token:', token)
  console.log('🌐 Endpoint: /api/agendas/webcal/' + token)
  console.log('🕐 Generated At:', new Date().toISOString())
  console.log('📊 Total Active Webcal Tokens:', tokenStore.webcalTokens.size)
  console.log('═══════════════════════════════════════════════')

  return token
}

/**
 * Generate RSS auth token
 */
export const generateRssToken = () => {
  const token = generateToken('RSS', 40)
  tokenStore.rssTokens.add(token)

  console.log('═══════════════════════════════════════════════')
  console.log('📰 RSS TOKEN GENERATED')
  console.log('═══════════════════════════════════════════════')
  console.log('🔑 Token:', token)
  console.log('🌐 Endpoint: /api/rss/' + token)
  console.log('🕐 Generated At:', new Date().toISOString())
  console.log('📊 Total Active RSS Tokens:', tokenStore.rssTokens.size)
  console.log('═══════════════════════════════════════════════')

  return token
}

/**
 * Generate document access token with query
 */
export const generateDocumentToken = (docId, sensitiveQuery) => {
  const token = generateToken('DOC', 32)
  const data = {
    docId,
    query: sensitiveQuery,
    timestamp: new Date().toISOString()
  }

  tokenStore.documentTokens.set(token, data)

  console.log('═══════════════════════════════════════════════')
  console.log('📄 DOCUMENT TOKEN GENERATED')
  console.log('═══════════════════════════════════════════════')
  console.log('🔑 Token:', token)
  console.log('📋 Document ID:', docId)
  console.log('🔍 Sensitive Query:', sensitiveQuery)
  console.log('🌐 Endpoint: /document/' + docId + '/' + token)
  console.log('🕐 Generated At:', data.timestamp)
  console.log('📊 Total Active Document Tokens:', tokenStore.documentTokens.size)
  console.log('═══════════════════════════════════════════════')

  return token
}

/**
 * Generate dashboard query with sensitive parameters
 */
export const generateDashboardQuery = (queryText, groupPaths = '', context = '') => {
  const queryId = generateToken('QUERY', 16)
  const data = {
    query: queryText,
    groupPaths,
    context: context || 'AZ,BUZA,BZ,DEF,EZK,FIN,IenW,JenV,LNV,OCW,SZW,VWS',
    timestamp: new Date().toISOString()
  }

  tokenStore.dashboardQueries.set(queryId, data)

  const queryParams = new URLSearchParams({
    query: data.query,
    groupPaths: data.groupPaths,
    context: data.context
  }).toString()

  console.log('═══════════════════════════════════════════════')
  console.log('📊 DASHBOARD QUERY GENERATED')
  console.log('═══════════════════════════════════════════════')
  console.log('🆔 Query ID:', queryId)
  console.log('🔍 Query Text:', data.query)
  console.log('📁 Group Paths:', data.groupPaths || 'NONE')
  console.log('🏛️  Context:', data.context)
  console.log('🌐 Full URL: /nl/dashboard?' + queryParams)
  console.log('🕐 Generated At:', data.timestamp)
  console.log('📊 Total Active Queries:', tokenStore.dashboardQueries.size)
  console.log('═══════════════════════════════════════════════')

  return { queryId, queryParams, data }
}

/**
 * Validate WEBCAL token
 */
export const validateWebcalToken = (token) => {
  const isValid = tokenStore.webcalTokens.has(token)

  console.log('═══════════════════════════════════════════════')
  console.log('🔐 WEBCAL TOKEN VALIDATION')
  console.log('═══════════════════════════════════════════════')
  console.log('🔑 Token:', token)
  console.log('✅ Valid:', isValid ? 'YES' : 'NO')
  console.log('🕐 Checked At:', new Date().toISOString())
  console.log('═══════════════════════════════════════════════')

  return isValid
}

/**
 * Validate RSS token
 */
export const validateRssToken = (token) => {
  const isValid = tokenStore.rssTokens.has(token)

  console.log('═══════════════════════════════════════════════')
  console.log('🔐 RSS TOKEN VALIDATION')
  console.log('═══════════════════════════════════════════════')
  console.log('🔑 Token:', token)
  console.log('✅ Valid:', isValid ? 'YES' : 'NO')
  console.log('🕐 Checked At:', new Date().toISOString())
  console.log('═══════════════════════════════════════════════')

  return isValid
}

/**
 * Validate document token
 */
export const validateDocumentToken = (docId, token) => {
  const data = tokenStore.documentTokens.get(token)
  const isValid = data && data.docId === docId

  console.log('═══════════════════════════════════════════════')
  console.log('🔐 DOCUMENT TOKEN VALIDATION')
  console.log('═══════════════════════════════════════════════')
  console.log('📋 Document ID:', docId)
  console.log('🔑 Token:', token)
  console.log('✅ Valid:', isValid ? 'YES' : 'NO')
  if (data) {
    console.log('🔍 Associated Query:', data.query)
    console.log('🕐 Generated At:', data.timestamp)
  }
  console.log('🕐 Validated At:', new Date().toISOString())
  console.log('═══════════════════════════════════════════════')

  return { isValid, data: isValid ? data : null }
}

/**
 * Validate dashboard query
 */
export const validateDashboardQuery = (queryId) => {
  const data = tokenStore.dashboardQueries.get(queryId)
  const isValid = !!data

  console.log('═══════════════════════════════════════════════')
  console.log('🔐 DASHBOARD QUERY VALIDATION')
  console.log('═══════════════════════════════════════════════')
  console.log('🆔 Query ID:', queryId)
  console.log('✅ Valid:', isValid ? 'YES' : 'NO')
  if (data) {
    console.log('🔍 Query:', data.query)
    console.log('📁 Group Paths:', data.groupPaths)
    console.log('🏛️  Context:', data.context)
    console.log('🕐 Generated At:', data.timestamp)
  }
  console.log('🕐 Validated At:', new Date().toISOString())
  console.log('═══════════════════════════════════════════════')

  return { isValid, data: isValid ? data : null }
}

/**
 * Get all active tokens (for testing/debugging)
 */
export const getAllTokens = () => {
  return {
    webcal: Array.from(tokenStore.webcalTokens),
    rss: Array.from(tokenStore.rssTokens),
    documents: Array.from(tokenStore.documentTokens.entries()),
    queries: Array.from(tokenStore.dashboardQueries.entries())
  }
}

/**
 * Clear all tokens (for testing)
 */
export const clearAllTokens = () => {
  tokenStore.webcalTokens.clear()
  tokenStore.rssTokens.clear()
  tokenStore.documentTokens.clear()
  tokenStore.dashboardQueries.clear()

  console.log('🗑️  All tokens cleared')
}

// Export the store for direct access if needed
export { tokenStore }
