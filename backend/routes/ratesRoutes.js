/**
 * Rutas para el endpoint de tasas de cambio
 */

const express = require('express')
const router = express.Router()
const { getRates } = require('../controllers/ratesController')

/**
 * GET /api/rates
 * Obtiene tasas de cambio
 * Query params opcionales: base, target
 */
router.get('/', getRates)

module.exports = router

