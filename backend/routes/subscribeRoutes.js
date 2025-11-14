/**
 * Rutas para el endpoint de suscripción
 */

const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const { subscribe } = require('../controllers/subscribeController')
const { HttpError } = require('../utils/errorHandler')

/**
 * Validaciones para el endpoint de suscripción
 */
const subscribeValidations = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('El email debe ser válido')
    .normalizeEmail()
]

/**
 * Middleware para manejar errores de validación
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(errors)
  }
  next()
}

/**
 * POST /api/subscribe
 * Guarda name y email en Google Spreadsheet
 */
router.post('/', subscribeValidations, handleValidationErrors, subscribe)

module.exports = router

