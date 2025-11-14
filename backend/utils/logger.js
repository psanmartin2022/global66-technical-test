/**
 * Logger utility para requests y eventos
 */

/**
 * Formatea timestamp para logs
 */
function getTimestamp() {
  return new Date().toISOString()
}

/**
 * Log de request entrante
 */
function logRequest(req) {
  const timestamp = getTimestamp()
  const method = req.method
  const url = req.originalUrl || req.url
  const ip = req.ip || req.connection.remoteAddress
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`)
  
  // Log de query params si existen
  if (Object.keys(req.query).length > 0) {
    console.log(`  Query params:`, req.query)
  }
  
  // Log de body si existe (solo para POST)
  if (req.method === 'POST' && req.body && Object.keys(req.body).length > 0) {
    // Ocultar información sensible si existe
    const sanitizedBody = { ...req.body }
    if (sanitizedBody.email) {
      sanitizedBody.email = sanitizedBody.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    }
    console.log(`  Body:`, sanitizedBody)
  }
}

/**
 * Log de response
 */
function logResponse(req, statusCode, message) {
  const timestamp = getTimestamp()
  const method = req.method
  const url = req.originalUrl || req.url
  
  const statusEmoji = statusCode >= 500 ? '❌' : statusCode >= 400 ? '⚠️' : '✅'
  console.log(`${statusEmoji} [${timestamp}] ${method} ${url} - ${statusCode} ${message || ''}`)
}

/**
 * Log de error
 */
function logError(error, context = '') {
  const timestamp = getTimestamp()
  console.error(`❌ [${timestamp}] ERROR${context ? ` - ${context}` : ''}:`, error.message)
  if (process.env.NODE_ENV === 'development') {
    console.error('Stack:', error.stack)
  }
}

module.exports = {
  logRequest,
  logResponse,
  logError,
  getTimestamp
}

