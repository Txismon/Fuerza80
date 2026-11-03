# Encargo listo para Codex

Actúa como desarrollador senior de PWA mobile-first. Este repositorio contiene Fuerza 77, una aplicación ya implementada para seguimiento de fuerza. **No la reconstruyas desde cero ni elimines funcionalidades.** Lee `PROJECT_HANDOFF.md` y el código antes de cambiar nada.

Objetivo de esta iteración: hacer fiable la V1 para uso cotidiano en Safari iPhone.

1. Implementa persistencia de borrador de entrenamiento con recuperación tras recarga/cierre, sin afectar a sesiones ya guardadas. Si se cambia de rutina con un borrador pendiente, consérvalo por día o pide confirmación. Evita duplicados al guardar.
2. Introduce tests automatizados para persistencia, exportación/importación, cálculo de progresión, cambio de rutina y guardado de sesión. Usa dependencias mínimas y documenta cómo ejecutarlos.
3. Refuerza validación y compatibilidad de importación JSON v1; no cambies el formato de backup sin migración explícita.
4. Mejora experiencia iPhone: campos numéricos, foco, scroll, navegación, tamaño de controles, modo standalone, estados de error y funcionamiento offline.
5. Revisa el service worker y la actualización de assets. No sobrescribas ni borres datos de usuario.
6. Mantén las rutinas A/B/C, los dos días de spinning externos, 40–50 minutos, y 9 series de core semanales. No añadir cardio.
7. Entrega código, tests, instrucciones de despliegue y changelog. Identifica pruebas que no pudiste realizar (en especial iPhone físico).

Restricciones: sin backend ni cuentas; datos locales; exportación/importación JSON; español; compatibilidad con datos `fuerza77-data-v1`; no afirmar que algo funciona sin probarlo. Pregunta antes de introducir un framework o cambiar el esquema persistido.
