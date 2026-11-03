# Fuerza 77 — PWA de entrenamiento

Aplicación web instalable, sin dependencias externas y sin backend.

## Funciones
- Rutinas A (martes), B (miércoles) y C (sábado), con series, repeticiones, RIR y descansos.
- Registro de kilos, repeticiones y RIR por serie; marcar series realizadas.
- Historial de sesiones y volumen de carga aproximado.
- Recomendaciones de progresión basadas en la última sesión guardada.
- Temporizador de descanso con aviso visual y vibración si está disponible.
- Peso, cintura y objetivo corporal configurable.
- Edición de ejercicios, series, rangos y descansos.
- Exportación e importación de todos los datos en JSON.
- Service worker para uso offline después de una primera carga por HTTPS.

## Instalar en iPhone
1. Publica el contenido de esta carpeta en un hosting estático HTTPS (GitHub Pages, Netlify o Cloudflare Pages). No hace falta servidor ni base de datos.
2. Abre la URL en Safari (no desde Archivos).
3. Pulsa Compartir > Añadir a pantalla de inicio.
4. Abre el icono de Fuerza 77.

## Probar en un ordenador
Desde esta carpeta: `python3 -m http.server 8080`, luego abre `http://localhost:8080`.

## Copias de seguridad
En Ajustes > Exportar copia JSON. Guarda el fichero en Archivos/iCloud Drive. Para restaurar, Ajustes > Importar copia. **La importación reemplaza todo el historial existente.** Haz una copia antes.

## Límites importantes
- Los datos se guardan solo en el navegador/dispositivo, en `localStorage`.
- No hay sincronización automática, cuenta de usuario ni copia en la nube.
- Borrar datos de Safari o eliminar la app puede borrar los registros.
- Los borradores se guardan automáticamente por rutina en este dispositivo. Guardar entrenamiento los incorpora al historial. No se incluyen en la copia JSON v1: guarda las sesiones antes de exportar.
- La recomendación de progresión es una heurística simple; usa tu criterio de RIR y técnica.
- La app no sustituye asesoramiento médico ni deportivo individual.


## Validación y desarrollo
Requiere Node.js 20 o superior solo para pruebas (la app no tiene dependencias):

```bash
node --test tests/*.test.cjs
node --check app.js
node --check sw.js
python3 -m http.server 8080
```

Las pruebas ejecutan la lógica de la app con DOM y almacenamiento simulados: recuperación, cambio de rutina, guardado, duplicados, progresión, validación, roundtrip JSON y errores de cuota/corrupción. No sustituyen pruebas de navegador.

## Actualizar un despliegue
Publica todos los archivos estáticos juntos bajo HTTPS, en la misma ruta y origen para conservar localStorage. No publiques copias personales. Configura `sw.js` con `Cache-Control: no-cache`. Cada nueva entrega que cambie assets debe cambiar el nombre de caché en `sw.js`.
La nueva caché se prepara completa y espera al cierre de todas las pestañas/PWA antiguas. Después, vuelve a abrir para usar la actualización. No se fuerza una recarga durante un entrenamiento. Las cachés ajenas a Fuerza 77 se conservan.

## Comprobación manual pendiente
En Safari iPhone físico, comprobar instalación standalone, teclado decimal, navegación entre campos, scroll a 320/375 px, recarga y cierre durante una serie, exportación/importación desde Archivos, y apertura en modo avión tras una primera visita completa. Verificar también la actualización con dos ventanas abiertas y el temporizador tras volver del segundo plano; iOS no garantiza avisos en segundo plano.

Si aparece una advertencia de datos ilegibles, no se sobrescribe el almacenamiento. Conserva su contenido original antes de repararlo; no borres los datos del sitio para intentar recuperarlos. Evita editar simultáneamente en varias ventanas: no hay sincronización entre ellas.
