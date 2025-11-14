/**
 * Google Sheets API Configuration
 * 
 * Para configurar:
 * 1. Crear un proyecto en Google Cloud Console
 * 2. Habilitar Google Sheets API
 * 3. Crear credenciales de Service Account
 * 4. Descargar el JSON de credenciales y guardarlo como config/google-credentials.json
 * 5. Compartir el Google Spreadsheet con el email del Service Account
 */

const { google } = require('googleapis')
const path = require('path')
require('dotenv').config()

let sheets = null
let auth = null

/**
 * Inicializa la autenticación de Google Sheets
 */
function initializeGoogleSheets() {
  try {
    const credentialsPath = process.env.GOOGLE_SHEETS_CREDENTIALS_PATH || 
      path.join(__dirname, 'google-credentials.json')
    
    auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    sheets = google.sheets({ version: 'v4', auth })
    
    console.log('✅ Google Sheets API inicializada correctamente')
    return { sheets, auth }
  } catch (error) {
    console.error('❌ Error al inicializar Google Sheets API:', error.message)
    console.warn('⚠️  El endpoint POST /api/subscribe no funcionará sin credenciales')
    return { sheets: null, auth: null }
  }
}

/**
 * Obtiene la instancia de Google Sheets
 */
function getSheetsInstance() {
  if (!sheets) {
    return initializeGoogleSheets()
  }
  return { sheets, auth }
}

module.exports = {
  initializeGoogleSheets,
  getSheetsInstance
}

