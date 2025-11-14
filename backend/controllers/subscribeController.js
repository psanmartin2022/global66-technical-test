/**
 * Controller para el endpoint de suscripción
 */

const { saveToSpreadsheet } = require('../services/googleSheetsService')
const { HttpError } = require('../utils/errorHandler')

/**
 * POST /api/subscribe
 * Guarda name y email en Google Spreadsheet
 * Body: { name: string, email: string }
 */
async function subscribe(req, res, next) {
  try {
    const { name, email } = req.body

    // Validaciones básicas (express-validator manejará las validaciones detalladas)
    if (!name || !email) {
      throw new HttpError(400, 'Los campos name y email son requeridos')
    }

    // Guardar en Google Sheets
    const result = await saveToSpreadsheet(name, email)

    res.status(201).json({
      success: true,
      message: result.message,
      data: {
        name,
        email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3') // Ocultar email parcialmente
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  subscribe
}

