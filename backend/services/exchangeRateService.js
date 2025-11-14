/**
 * Servicio para obtener tasas de cambio
 * Intenta obtener de API externa, si falla usa datos mockeados
 */

const { HttpError } = require('../utils/errorHandler')
const { logError } = require('../utils/logger')

// Datos mockeados como fallback (mismos datos que el frontend)
const MOCK_RATES = {
  base: 'USD',
  rates: {
    CLP: 987.62,
    PEN: 3.75
  },
  asOf: '2025-10-31T17:51:00Z'
}

/**
 * Obtiene tasas de cambio desde API externa
 * @param {string} base - Moneda base (default: USD)
 * @param {string} target - Moneda objetivo (opcional)
 * @returns {Promise<Object>} Objeto con tasas de cambio
 */
async function getRatesFromExternalAPI(base = 'USD', target = null) {
  const apiUrl = process.env.EXCHANGE_RATE_API_URL || 'https://api.exchangerate-api.com/v4/latest'
  const apiKey = process.env.EXCHANGE_RATE_API_KEY

  try {
    const url = `${apiUrl}/${base}${apiKey ? `?apikey=${apiKey}` : ''}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API externa respondió con status ${response.status}`)
    }

    const data = await response.json()

    // Formatear respuesta al formato esperado
    const formattedData = {
      base: data.base || base,
      rates: data.rates || {},
      asOf: data.date ? `${data.date}T00:00:00Z` : new Date().toISOString()
    }

    // Si se especifica un target, filtrar solo esa tasa
    if (target && formattedData.rates[target]) {
      return {
        base: formattedData.base,
        rates: { [target]: formattedData.rates[target] },
        asOf: formattedData.asOf
      }
    }

    return formattedData
  } catch (error) {
    logError(error, 'getRatesFromExternalAPI')
    throw error
  }
}

/**
 * Obtiene tasas de cambio (intenta API externa, fallback a mock)
 * @param {string} base - Moneda base (default: USD)
 * @param {string} target - Moneda objetivo (opcional)
 * @returns {Promise<Object>} Objeto con tasas de cambio
 */
async function getExchangeRates(base = 'USD', target = null) {
  // Si hay API key configurada, intentar usar API externa
  if (process.env.EXCHANGE_RATE_API_KEY && process.env.EXCHANGE_RATE_API_URL) {
    try {
      const rates = await getRatesFromExternalAPI(base, target)
      console.log('✅ Tasas obtenidas de API externa')
      return rates
    } catch (error) {
      console.warn('⚠️  Fallo al obtener tasas de API externa, usando datos mockeados')
    }
  } else {
    console.log('ℹ️  Usando datos mockeados (no hay API key configurada)')
  }

  // Fallback a datos mockeados
  const mockData = { ...MOCK_RATES }

  // Si se especifica un target, filtrar solo esa tasa
  if (target) {
    if (!mockData.rates[target]) {
      throw new HttpError(404, `Tasa no encontrada para ${target}`)
    }
    return {
      base: mockData.base,
      rates: { [target]: mockData.rates[target] },
      asOf: mockData.asOf
    }
  }

  return mockData
}

/**
 * Valida código de moneda
 * @param {string} currency - Código de moneda
 * @returns {boolean}
 */
function isValidCurrency(currency) {
  const validCurrencies = ['USD', 'CLP', 'PEN', 'EUR', 'GBP', 'JPY', 'BRL', 'ARS', 'MXN']
  return validCurrencies.includes(currency.toUpperCase())
}

module.exports = {
  getExchangeRates,
  getRatesFromExternalAPI,
  isValidCurrency,
  MOCK_RATES
}

