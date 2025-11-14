/**
 * Manejo centralizado de errores HTTP
 */

const { logError } = require('./logger')

/**
 * Clase personalizada para errores HTTP
 */
class HttpError extends Error {
  constructor(statusCode, message, details = null) {
    super(message)
    this.statusCode = statusCode
    this.details = details
    this.name = 'HttpError'
  }
}

/**
 * Middleware de manejo de errores
 */
function errorHandler(err, req, res, next) {
  // Log del error
  logError(err, `${req.method} ${req.originalUrl}`)

  // Si es un HttpError personalizado
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: true,
      statusCode: err.statusCode,
      message: err.message,
      ...(err.details && { details: err.details })
    })
  }

  // Si es un error de validación de express-validator
  if (err.array && typeof err.array === 'function') {
    const errors = err.array()
    return res.status(400).json({
      error: true,
      statusCode: 400,
      message: 'Error de validación',
      details: errors.map(e => ({
        field: e.param || e.path,
        message: e.msg,
        value: e.value
      }))
    })
  }

  // Error genérico del servidor
  const statusCode = err.statusCode || 500
  const message = process.env.NODE_ENV === 'production' 
    ? 'Error interno del servidor' 
    : err.message

  res.status(statusCode).json({
    error: true,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

/**
 * Middleware para rutas no encontradas (404)
 */
function notFoundHandler(req, res, next) {
  const error = new HttpError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`)
  next(error)
}

module.exports = {
  HttpError,
  errorHandler,
  notFoundHandler
}

