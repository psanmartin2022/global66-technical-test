# Growth Thinking - Global66 Technical Test

## 1. Metas técnicas y de negocio a monitorear en /precio/*

Para una página como esta, donde el objetivo principal es convertir visitantes en usuarios de la app, me enfocaría en estas métricas:

**Métricas técnicas:**
- **Core Web Vitals**: LCP, FID/CLS, TTFB. Especialmente LCP porque tenemos imágenes grandes en el hero. Si está por encima de 2.5s, estamos perdiendo usuarios.
- **Tiempo de carga total**: Aunque el SSR ayuda, quiero ver cuánto tarda desde que el usuario hace clic hasta que ve contenido útil.
- **Tasa de error 404/500**: Si hay problemas técnicos, necesito saberlo rápido.
- **Rendimiento por dispositivo**: Mobile vs Desktop. En Chile y Perú, el tráfico móvil suele ser alto, así que si mobile está lento, estamos perdiendo conversiones.

**Métricas de negocio:**
- **CTR a los botones de app stores**: Este es el objetivo principal. Si solo el 2% hace clic, hay un problema de diseño o copy.
- **Scroll depth**: Quiero saber si llegan hasta el bloque de conversión o se van antes. Si el 80% no llega al CTA, el hero está muy largo o aburrido.
- **Tiempo en página**: Si están menos de 10 segundos, probablemente no encontraron lo que buscaban o la página carga muy lento.
- **Tasa de rebote**: Si rebotan rápido, puede ser que el contenido no coincida con la búsqueda o hay un problema técnico.
- **Conversiones por divisa**: CLP vs PEN. Si CLP convierte mejor, puedo optimizar más esa página o entender por qué PEN no funciona igual.

**Métricas SEO:**
- **Posición promedio en Google** para "precio dólar CLP" y variaciones. Si caemos de posición 1 a posición 3, perdemos mucho tráfico.
- **Impresiones vs Clics**: Si tenemos muchas impresiones pero pocos clics, el título o meta description no están funcionando.
- **Tráfico orgánico por divisa**: Para saber qué páginas necesitan más atención.
- **Consultas de búsqueda**: Qué keywords están trayendo tráfico real vs qué keywords esperábamos.

**Herramientas que usaría:**
- Google Analytics 4 para eventos y comportamiento
- Google Search Console para SEO
- Hotjar o similar para ver grabaciones de sesiones (especialmente cuando hay caídas)
- Lighthouse CI para monitoreo continuo de performance
- Datadog o New Relic si tengo presupuesto para APM

---

## 2. Caída del 20% orgánico en "precio dólar" para CLP: investigación y acciones en 72h

Esto es crítico. Si perdemos 20% de tráfico orgánico, probablemente estamos perdiendo posición en Google. Mi plan de acción sería:

**Primeras 24 horas - Diagnóstico rápido:**

1. **Verificar Google Search Console**: 
   - ¿Cuándo empezó la caída exactamente? Comparar últimos 7 días vs 7 días anteriores.
   - ¿Es solo "precio dólar CLP" o también otras keywords relacionadas?
   - ¿Hay algún cambio en impresiones, CTR o posición promedio?

2. **Revisar cambios técnicos recientes**:
   - ¿Hubo algún deploy en los últimos días? Revisar logs y commits.
   - ¿Cambió algo en los meta tags, estructura de datos, o canonical URLs?
   - ¿Hay errores 404 o 500 que aparecieron recientemente?

3. **Comparar con competencia**:
   - ¿También perdieron tráfico o solo nosotros? Si solo nosotros, es algo específico de nuestro sitio.
   - ¿Qué están haciendo diferente ahora? Revisar sus títulos, meta descriptions, contenido.

4. **Verificar Core Web Vitals**:
   - ¿Empeoró el LCP o CLS? Google penaliza páginas lentas.
   - Revisar PageSpeed Insights para ver si hay problemas nuevos.

**Siguientes 24-48 horas - Acciones inmediatas:**

1. **Si es problema técnico**:
   - Si hay errores 404/500, arreglarlos inmediatamente.
   - Si la página carga lento, optimizar imágenes, reducir JavaScript, o mejorar el SSR.
   - Si hay problemas de indexación, revisar robots.txt y sitemap.

2. **Si es problema de contenido/SEO**:
   - Verificar que los meta tags dinámicos estén funcionando correctamente.
   - Asegurarme de que el contenido sea único y útil (no solo mostrar la tasa, sino contexto).
   - Revisar si necesitamos agregar más contenido relevante (tablas históricas, gráficos, explicaciones).

3. **Si es competencia**:
   - Mejorar el título y meta description para que sean más atractivos.
   - Agregar structured data (JSON-LD) si no lo tenemos.
   - Asegurarme de que la tasa se actualice frecuentemente (Google valora contenido fresco).

**Últimas 24 horas - Optimizaciones rápidas:**

1. **Mejorar el contenido**:
   - Agregar una sección breve explicando por qué la tasa cambia.
   - Incluir datos históricos o comparación con días anteriores.
   - Hacer el contenido más completo que la competencia.

2. **Optimizar técnicamente**:
   - Si el LCP está mal, hacer las imágenes más pequeñas o usar WebP.
   - Si hay mucho JavaScript, hacer code splitting más agresivo.
   - Asegurarme de que el SSR esté funcionando perfectamente.

3. **Monitoreo intensivo**:
   - Configurar alertas en Search Console para cambios de posición.
   - Revisar Analytics cada 4-6 horas para ver si las acciones están funcionando.
   - Preparar un reporte ejecutivo con hipótesis y acciones tomadas.

**Lo que NO haría**:
- No cambiaría la estructura de URLs (eso puede empeorar las cosas).
- No haría cambios grandes sin entender primero la causa raíz.
- No ignoraría el problema esperando que se solucione solo.

---

## 3. Tres mejoras de velocidad sin sacrificar SEO

**1. Optimización de imágenes con WebP y lazy loading más agresivo**

Las imágenes del hero y del banner son grandes. Puedo:
- Convertir todas las imágenes a WebP (con fallback a PNG/SVG para navegadores antiguos).
- Usar `srcset` para servir tamaños diferentes según el viewport.
- Hacer lazy loading más agresivo: solo cargar el banner cuando el usuario está cerca de hacer scroll (usando Intersection Observer).
- Comprimir las imágenes sin perder calidad visual.

Esto puede reducir el peso de la página en un 40-60% sin afectar el SEO, porque Google indexa bien WebP y el lazy loading no afecta el crawling.

**2. Code splitting y tree shaking más agresivo**

Aunque Nuxt ya hace code splitting, puedo:
- Separar el código del hero del código del bloque de conversión, para que el hero cargue primero.
- Usar dynamic imports para componentes que no son críticos (como el ConversionBlock).
- Eliminar código no usado con tree shaking más agresivo.
- Mover las traducciones i18n a chunks separados que solo se carguen cuando se necesiten.

El SEO no se afecta porque el contenido crítico (el hero con la tasa) sigue cargando primero con SSR.

**3. Preload de recursos críticos y mejorar el SSR**

- Preload de fuentes críticas (Poppins y Montserrat) con `rel="preload"` y `font-display: swap`.
- Preconnect a Google Fonts antes de que se necesiten.
- Optimizar el endpoint SSR para que responda más rápido (cachear el JSON de tasas en memoria si es posible).
- Usar HTTP/2 Server Push para recursos críticos (aunque esto depende del servidor).

Esto mejora el TTFB y el LCP sin afectar el SEO, porque seguimos sirviendo contenido completo en el HTML inicial.

**Bonus - Caché inteligente:**
- Implementar Service Worker para cachear assets estáticos.
- Usar CDN para servir assets (si no lo estamos haciendo ya).
- Cachear el JSON de tasas en el cliente con un TTL corto (5-10 minutos) para evitar requests innecesarios.

---

## 4. Dos hipótesis para mejorar conversión del hero y cómo A/B testearlas

**Hipótesis 1: El mensaje de conversión es demasiado genérico**

**Problema actual**: El hero muestra "1 USD = 987,62 CLP" pero no hay un CTA claro ni un beneficio específico. El usuario ve la tasa pero no sabe qué hacer después.

**Hipótesis**: Si agregamos un CTA más específico y visible en el hero (por ejemplo, "Abre tu cuenta gratis" o "Envíate dinero ahora"), aumentaremos las conversiones porque el usuario tiene una acción clara.

**Cómo testearlo**:
- **Variante A (control)**: Hero actual sin cambios.
- **Variante B**: Agregar un botón CTA prominente en el hero que diga "Abre tu cuenta gratis" con link directo a registro.
- **Variante C**: Cambiar el copy del subtítulo a algo más orientado a acción, como "Envía dinero al mejor tipo de cambio" en lugar de solo "Valor del dólar hoy".

**Métricas a medir**:
- CTR al botón CTA (si lo agregamos).
- Scroll depth hasta el bloque de conversión.
- Tasa de conversión final (descargas de app).
- Tiempo hasta primera interacción.

**Duración del test**: 2 semanas mínimo, con al menos 10,000 visitantes por variante para tener significancia estadística.

**Implementación técnica**: Usar Google Optimize, VWO, o implementar un sistema simple con cookies/localStorage para asignar variantes y trackear eventos en GA4.

---

**Hipótesis 2: La visualización de las banderas no comunica valor**

**Problema actual**: Las banderas y el pedestal son visualmente atractivos pero no comunican un beneficio claro. El usuario ve "USD → CLP" pero no entiende qué puede hacer con eso.

**Hipótesis**: Si reemplazamos o complementamos las banderas con un elemento que muestre un caso de uso concreto (por ejemplo, "Envía $100 USD y recibe 98,762 CLP" con un cálculo dinámico), aumentaremos las conversiones porque el usuario ve el valor inmediato.

**Cómo testearlo**:
- **Variante A (control)**: Hero actual con banderas.
- **Variante B**: Agregar un "calculadora rápida" debajo de la tasa que permita al usuario ingresar un monto y ver cuánto recibiría.
- **Variante C**: Cambiar las banderas por un ejemplo visual más concreto, como "Envía $100 USD → Recibe 98,762 CLP" con iconos de envío.

**Métricas a medir**:
- Uso de la calculadora (si la agregamos).
- Tiempo en página.
- Tasa de conversión.
- Engagement (scroll, clicks, interacciones).

**Duración del test**: 2-3 semanas, con al menos 8,000 visitantes por variante.

**Implementación técnica**: 
- Para la calculadora: componente Vue simple que multiplique el monto ingresado por la tasa.
- Para el ejemplo visual: cambiar el componente RateHero para mostrar el ejemplo en lugar de solo las banderas.
- Usar el mismo sistema de A/B testing mencionado arriba.

**Consideraciones adicionales**:
- Asegurarme de que las variantes carguen igual de rápido (no puedo sacrificar velocidad por conversión).
- Monitorear si alguna variante afecta negativamente el SEO (aunque no debería si el contenido sigue siendo relevante).
- Si una variante funciona mucho mejor, hacer un test de seguimiento para confirmar antes de implementarla permanentemente.

---

## 5. Tiempo invertido y uso de IA

**Tiempo total aproximado**: Entre 12-15 horas distribuidas en varios días.

**Desglose**:
- **Parte A (Figma)**: 3-4 horas. Diseñar los componentes, configurar auto-layouts, crear variantes y tokens llevó tiempo porque quería que fuera escalable.
- **Parte B (Frontend)**: 6-7 horas. La implementación en Nuxt fue lo más complejo. Configurar SSR, i18n, Tailwind con los tokens de Figma, y asegurarme de que todo funcionara bien tomó la mayor parte del tiempo.
- **Parte C (Backend)**: 2-3 horas. Express es más directo, pero configurar Google Sheets API y hacer que todo funcionara correctamente llevó su tiempo.
- **Parte D (Growth)**: 1 hora. Pensar en las respuestas basándome en experiencia real.

**Uso de IA**:

Usé IA principalmente como asistente de código, no como reemplazo de mi pensamiento:

- **Para código boilerplate**: Generar la estructura inicial de archivos, configuraciones de Nuxt, Express, etc. Ahorró tiempo en setup pero luego lo modifiqué según mis necesidades.
- **Para debugging**: Cuando tenía errores, le preguntaba a la IA para entender mejor el problema, pero siempre revisaba la solución antes de implementarla.
- **Para documentación**: Ayudó a estructurar el README y comentarios en el código, pero el contenido técnico lo escribí yo.
- **Para optimizaciones**: Sugerencias de cómo mejorar performance o SEO, pero siempre las validaba con mi conocimiento.

**Lo que NO usé IA**:
- Diseño en Figma (100% manual).
- Decisiones de arquitectura y estructura del proyecto.
- Estrategia de growth y respuestas de la Parte D (aunque la IA ayudó a estructurar mejor las ideas).
- Configuración de Google Sheets API (lo hice manualmente siguiendo la documentación).

**Balance**:
La IA me ahorró probablemente 3-4 horas en tareas repetitivas (setup, boilerplate, debugging básico), pero el trabajo real de pensar, diseñar y tomar decisiones fue 100% mío. Creo que es un buen balance: usar IA como herramienta de productividad sin depender de ella para el pensamiento crítico.

---

**Notas finales**:

Este tipo de prueba técnica me gusta porque combina habilidades técnicas con pensamiento estratégico. No es solo "haz que funcione", sino "haz que funcione bien y piensa en cómo mejorarlo". Eso es lo que hace un buen Lead: no solo implementar, sino pensar en el impacto real del trabajo.

