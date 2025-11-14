/**
 * Controller para el endpoint de tasas de cambio
 */

const { getExchangeRates, isValidCurrency } = require('../services/exchangeRateService')
const { HttpError } = require('../utils/errorHandler')

/**
 * GET /api/rates
 * Obtiene tasas de cambio
 * Query params opcionales:
 * - base: Moneda base (default: USD)
 * - target: Moneda objetivo (opcional, filtra solo esa tasa)
 */
async function getRates(req, res, next) {
  try {
    const { base, target } = req.query

    // Validar base si se proporciona
    if (base && !isValidCurrency(base)) {
      throw new HttpError(400, `Moneda base inválida: ${base}`)
    }

    // Validar target si se proporciona
    if (target && !isValidCurrency(target)) {
      throw new HttpError(400, `Moneda objetivo inválida: ${target}`)
    }

    const baseCurrency = (base || 'USD').toUpperCase()
    const targetCurrency = target ? target.toUpperCase() : null

    // Obtener tasas
    const rates = await getExchangeRates(baseCurrency, targetCurrency)

    res.json({
      success: true,
      data: rates
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getRates
}

