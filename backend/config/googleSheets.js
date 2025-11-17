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
    let credentials = null
    
    // Opción 1: Leer desde variable de entorno (base64) - para Railway/producción
    if (process.env.GOOGLE_SHEETS_CREDENTIALS_BASE64) {
      const credentialsJson = Buffer.from(process.env.GOOGLE_SHEETS_CREDENTIALS_BASE64, 'base64').toString('utf-8')
      credentials = JSON.parse(credentialsJson)
    }
    // Opción 2: Leer desde archivo - para desarrollo local
    else {
      const credentialsPath = process.env.GOOGLE_SHEETS_CREDENTIALS_PATH || 
        path.join(__dirname, 'google-credentials.json')
      
      // Si existe el archivo, leerlo
      if (require('fs').existsSync(credentialsPath)) {
        credentials = require(credentialsPath)
      }
    }
    
    if (!credentials) {
      throw new Error('No se encontraron credenciales de Google Sheets')
    }
    
    auth = new google.auth.GoogleAuth({
      credentials: credentials,
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

