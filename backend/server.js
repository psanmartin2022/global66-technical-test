/**
 * Servidor Express para la API de Global66 Technical Test (Parte C)
 */

const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Importar configuración y servicios
const { initializeGoogleSheets } = require('./config/googleSheets')
const requestLogger = require('./middleware/requestLogger')
const { errorHandler, notFoundHandler } = require('./utils/errorHandler')

// Importar rutas
const ratesRoutes = require('./routes/ratesRoutes')
const subscribeRoutes = require('./routes/subscribeRoutes')

// Crear aplicación Express
const app = express()

// Configuración del puerto
const PORT = process.env.PORT || 3001

// Middlewares globales
app.use(cors()) // Permitir CORS
app.use(express.json()) // Parser de JSON
app.use(express.urlencoded({ extended: true })) // Parser de URL encoded
app.use(requestLogger) // Logging de requests

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Rutas de la API
app.use('/api/rates', ratesRoutes)
app.use('/api/subscribe', subscribeRoutes)

// Manejo de rutas no encontradas (404)
app.use(notFoundHandler)

// Manejo centralizado de errores
app.use(errorHandler)

// Inicializar Google Sheets API
initializeGoogleSheets()

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 Servidor iniciado')
  console.log(`📍 Puerto: ${PORT}`)
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`💱 Rates API: http://localhost:${PORT}/api/rates`)
  console.log(`📝 Subscribe API: http://localhost:${PORT}/api/subscribe`)
  console.log('')
  console.log('📋 Endpoints disponibles:')
  console.log(`   GET  /api/rates?base=USD&target=CLP`)
  console.log(`   POST /api/subscribe (body: { name, email })`)
})

module.exports = app

