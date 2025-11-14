/**
 * Servicio para interactuar con Google Sheets
 */

const { getSheetsInstance } = require('../config/googleSheets')
const { HttpError } = require('../utils/errorHandler')
const { logError } = require('../utils/logger')

/**
 * Guarda datos en Google Spreadsheet
 * @param {string} name - Nombre del usuario
 * @param {string} email - Email del usuario
 * @returns {Promise<Object>} Resultado de la operación
 */
async function saveToSpreadsheet(name, email) {
  const { sheets } = getSheetsInstance()

  if (!sheets) {
    throw new HttpError(
      503,
      'Google Sheets API no está configurada. Por favor, configura las credenciales.'
    )
  }

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:B'

  if (!spreadsheetId) {
    throw new HttpError(
      500,
      'GOOGLE_SHEETS_SPREADSHEET_ID no está configurado en las variables de entorno'
    )
  }

  try {
    // Extraer el nombre de la hoja del rango
    const sheetName = range.split('!')[0] || 'Sheet1'
    
    // Obtener valores actuales para verificar que el sheet existe
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1`
    })

    // Agregar nueva fila con timestamp
    const timestamp = new Date().toISOString()
    const values = [[timestamp, name, email]]

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:C`, // Usar rango específico para append
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values
      }
    })

    console.log(`✅ Datos guardados en Google Sheets: ${name} (${email})`)

    return {
      success: true,
      message: 'Datos guardados correctamente',
      updatedCells: response.data.updates?.updatedCells || 0
    }
  } catch (error) {
    logError(error, 'saveToSpreadsheet')

    // Manejo de errores específicos de Google Sheets API
    if (error.code === 404) {
      throw new HttpError(404, 'Spreadsheet no encontrado. Verifica el ID del spreadsheet.')
    }

    if (error.code === 403) {
      throw new HttpError(
        403,
        'Sin permisos para acceder al Spreadsheet. Asegúrate de compartir el sheet con el email del Service Account.'
      )
    }

    throw new HttpError(500, `Error al guardar en Google Sheets: ${error.message}`)
  }
}

module.exports = {
  saveToSpreadsheet
}

