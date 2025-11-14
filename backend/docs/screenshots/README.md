# Screenshots - Evidencia de Pruebas

Esta carpeta contiene capturas de pantalla que demuestran el funcionamiento completo del backend API durante las pruebas manuales.

## Capturas incluidas

### Pruebas de Inicio y Health Check
- **evidencia-01.png** - Servidor iniciado correctamente con todos los endpoints disponibles
- **evidencia-02.png** - Health check exitoso (GET `/health`)

### Pruebas del Endpoint GET `/api/rates`
- **evidencia-03.png** - GET `/api/rates` retornando todas las tasas (CLP y PEN)
- **evidencia-04.png** - GET `/api/rates?target=CLP` filtrando correctamente
- **evidencia-05.png** - Manejo de errores: moneda inválida (400)

### Pruebas del Endpoint POST `/api/subscribe`
- **evidencia-06.png** - POST `/api/subscribe` exitoso guardando datos
- **evidencia-07.png** - Verificación en Google Sheets: datos guardados correctamente
- **evidencia-08.png** - Validación de campos faltantes (400)
- **evidencia-09.png** - Validación de email inválido (400)

### Logs del Servidor
- **evidencia-10.png** - Logs de requests en consola mostrando todos los endpoints probados
- **evidencia-11.png** - Logs detallados con timestamps y status codes
- **evidencia-12.png** - Logs de errores con stack traces (modo desarrollo)

## Resumen

Estas capturas demuestran que:
- ✅ Todos los endpoints funcionan correctamente
- ✅ El manejo de errores es coherente (400, 404, 500)
- ✅ La integración con Google Sheets funciona
- ✅ El logging de requests está operativo
- ✅ Las validaciones funcionan como se espera

