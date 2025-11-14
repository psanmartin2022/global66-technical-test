/**
 * Middleware para logging de requests
 */

const { logRequest, logResponse } = require('../utils/logger')

/**
 * Middleware que registra cada request entrante
 */
function requestLogger(req, res, next) {
  // Log del request
  logRequest(req)

  // Interceptar el método end para loggear la respuesta
  const originalEnd = res.end
  res.end = function(chunk, encoding) {
    logResponse(req, res.statusCode)
    originalEnd.call(this, chunk, encoding)
  }

  next()
}

module.exports = requestLogger

