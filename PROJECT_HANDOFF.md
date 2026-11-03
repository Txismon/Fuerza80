# Fuerza 77 — Traspaso técnico y funcional a Codex

Fecha del traspaso: 2026-11-03. Estado: código existente recuperado del ZIP original; no se afirma validación en iPhone real ni pruebas end-to-end.

## 1. Propósito y alcance
PWA personal, en español, para gestionar un programa avanzado de recomposición corporal: tres sesiones de fuerza semanales de 40–50 minutos, dos sesiones de spinning externas al registro de fuerza, seguimiento de peso/cintura, progresión y copias de seguridad. Usuario objetivo: 45 años, 1,76 m, 82 kg iniciales, objetivo orientativo 77 kg. La app no prescribe dieta ni registra spinning como ejercicio de fuerza.

## 2. Stack y arquitectura actual
- HTML semántico en `index.html`, estilos en `styles.css`, lógica en `app.js`, manifiesto en `manifest.webmanifest`, service worker en `sw.js`, iconos PNG.
- Sin npm, framework, compilación, API, autenticación ni backend.
- Estado persistido en `localStorage`, clave `fuerza77-data-v1`. Estado de sesión en curso (`draft`) **solo en memoria**.
- Navegación por cuatro vistas generadas en JS: Entrenar, Historial, Medidas, Ajustes.
- Service worker cache-first para activos locales con caché `fuerza77-v1`. Necesita HTTPS o localhost para registro y uso offline.
- Cualquier cambio de versión de archivos estáticos debe revisar estrategia de invalidación de caché del SW.

## 3. Modelo de datos persistido
```json
{"version":1,"sessions":[],"body":[],"custom":{},"goal":77}
```
- `sessions[]`: `{id, date, day, started, exercises:[{id,name,sets:[{kg,reps,rir,done}]}]}`. `day` es `A`, `B` o `C`.
- `body[]`: `{id,date,weight,waist}`; `waist` puede ser null.
- `custom`: mapa por ID de ejercicio con posibles `{name,count,min,max,rest}`.
- `goal`: peso objetivo numérico.
- Exportación añade `exportedAt`. Importación exige `version===1` y una estructura básica válida, y **reemplaza** los datos existentes.
- Precaución: diseñar migraciones antes de cambiar estructura; no romper las copias JSON v1 existentes.

## 4. Programa incorporado (fuente de verdad: PLANS en app.js)
Martes A — Torso dominante, 45–50 min:
1. Press banca con barra 3×5–7, descanso 120 s, RIR 2.
2. Dominadas lastradas/jalón 3×6–8, 120 s, RIR 2.
3. Sentadilla búlgara 2×8–10, 90 s, RIR 3.
4. Remo con pecho apoyado 2×8–12, 75 s, RIR 2.
5. Elevaciones laterales 2×12–15, 45 s, RIR 2.
6. Ab wheel 3×8–12, 60 s, RIR 2.

Miércoles B — Cadena posterior y tirón, 40–45 min:
1. Peso muerto rumano 3×6–8, 120 s, RIR 3.
2. Jalón neutro 3×8–10, 75 s, RIR 2.
3. Press inclinado mancuernas 3×8–10, 75 s, RIR 2.
4. Curl femoral 2×10–12, 60 s, RIR 2.
5. Curl bíceps 2×10–12, 45 s, RIR 2.
6. Pallof press 3×10–12, 45 s, RIR 2.

Sábado C — Full body, 45–50 min:
1. Sentadilla/hack squat 3×6–8, 120 s, RIR 2.
2. Press militar 3×6–8, 90 s, RIR 2.
3. Remo en máquina 3×8–10, 75 s, RIR 2.
4. Press pecho máquina 2×10–12, 75 s, RIR 2.
5. Extensión de cuádriceps 2×12–15, 60 s, RIR 2.
6. Crunch en polea 3×10–15, 45 s, RIR 2.

Spinning lunes y jueves, no añadir cardio a las sesiones de fuerza. El core tiene 9 series directas/semana (ab wheel, Pallof, crunch).

## 5. Funciones existentes y limitaciones
- Entrenar: seleccionar A/B/C; registrar kg/reps/RIR y marcar cada serie; añadir series; editar configuración de ejercicio; guardar sesión completa.
- Historial: ver sesiones, series realizadas y tonelaje aproximado (`sum(kg*reps)`), eliminar sesiones.
- Progresión: heurística basada en última sesión del ejercicio. Si todas las series previstas están completadas al máximo del rango y RIR registrado >= objetivo, propone subir 2,5 kg (1 kg en laterales/bíceps); de otro modo mantener carga. **No equivale a un algoritmo de periodización validado**.
- Descanso: temporizador en pantalla con vibración cuando navegador/dispositivo lo permite. No prometer notificaciones fiables en segundo plano en iOS.
- Medidas: fecha, peso, cintura opcional; lista y diferencia respecto a primera medición; barra de progreso con 82 kg iniciales codificados en la interfaz.
- Ajustes: objetivo editable, personalización, copia JSON export/import, borrado total con doble confirmación.
- No hay login, sincronización, gráficos de tendencia avanzados, tests automatizados ni garantía de persistencia si se borran datos del navegador.

## 6. Riesgos y deuda técnica prioritaria
P0: Guardado automático y recuperación de sesión en curso (sin perder datos al recargar/cerrar); conservar la compatibilidad con backups v1.
P0: Pruebas en Safari iOS, instalación desde pantalla de inicio, importación/exportación con Archivos y persistencia offline.
P0: Pruebas de integridad de datos y validación más estricta de copias importadas; manejar errores de cuota y corrupción.
P1: Evitar que cambiar de día descarte silenciosamente el borrador en curso; confirmación o borradores independientes por día.
P1: Separar UI, modelo, almacenamiento y cálculos para facilitar tests; agregar tests unitarios y de flujos críticos.
P1: Ajustar cálculo de progreso de peso para que use una línea base configurable, no 82 kg fijos.
P1: Registro de tiempos reales de sesión, duración, tendencias y progreso por ejercicio.
P1: Mejorar accesibilidad, entradas numéricas y UX de botones para iPhone.
P2: Evolución gráfica, exportación CSV, duplicar ejercicios, reordenar rutina, alternativas por equipo.
P2: Actualización segura del service worker y mecanismo visible de nueva versión.

## 7. Comandos para trabajar
```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```
Para despliegue, publicar **el contenido** de esta carpeta en GitHub Pages, Netlify o Cloudflare Pages bajo HTTPS. Verificar que manifiesto, SW y rutas relativas resuelven bien. En Safari iPhone: Compartir → Añadir a pantalla de inicio.

## 8. Criterios de aceptación para siguiente iteración
1. Una sesión parcialmente completada sobrevive a recarga y cierre de la PWA, sin duplicados al guardar.
2. Cada serie conserva kg/reps/RIR/done y se refleja fielmente en el historial.
3. Progresión calculada solo sobre datos válidos y con pruebas de los casos límite.
4. Exportar JSON, borrar estado, importar JSON restaura exactamente sesiones, medidas y ajustes.
5. La app abre offline tras primera carga HTTPS; el SW se actualiza sin servir versiones mezcladas.
6. Todo es usable con una mano en pantalla iPhone, sin desbordamiento horizontal.
7. No se pierden datos antiguos al desplegar una versión nueva ni al migrar el esquema.

## 9. Seguridad y privacidad
No hay transmisión de datos personales al servidor de la app. Los datos se almacenan localmente sin cifrado de aplicación; las copias JSON tampoco están cifradas. No subir backups reales de usuarios a repositorios públicos. Si se introduce backend, pedir consentimiento explícito antes de sincronizar.

## 10. Cómo iniciar en Codex
Abrir este directorio como proyecto/repo. Leer `README.md`, `PROJECT_HANDOFF.md`, `CODEX_TASK.md` y el código antes de refactorizar. Implementar primero P0 y tests, manteniendo la UI y rutinas salvo mejora justificada. Ejecutar pruebas y documentar exactamente qué se ha validado.
