# Cambios — 2026-11-03

- Borradores por rutina con guardado tras cada entrada y recuperación al iniciar. Se almacenan aparte en `fuerza77-drafts-v1`; `fuerza77-data-v1` y el formato de backup no cambian.
- Guardado de sesiones sin duplicados por ID, incluso si queda un borrador antiguo tras cerrar inesperadamente.
- Un fallo al escribir no confirma éxito ni descarta el entrenamiento. Datos ilegibles bloquean sobrescrituras.
- Validación de fechas reales, IDs únicos, estructura de ejercicios/series, valores numéricos, medidas y personalizaciones al importar v1.
- Entrada numérica sin reconstruir la vista al escribir, controles táctiles de 44 px, campos de 16 px, foco visible y rejilla adaptable.
- Editar ejercicios conserva las series en curso; la nueva cantidad de series se aplica al siguiente entrenamiento. Se pueden añadir series al actual.
- Caché v2 completa antes de activación, sin activación forzada durante la sesión; limpieza limitada a cachés propias y aviso de actualización disponible.
- Sin cambios en las rutinas A/B/C, spinning externo ni las 9 series semanales de core. Sin frameworks, backend o cuentas.

## Verificado

Node.js v24: 6 pruebas automatizadas correctas, más comprobación de sintaxis de app.js y sw.js. DOM, almacenamiento y confirmaciones simulados; pruebas de persistencia, JSON v1, progresión, cambios de rutina, guardado, duplicados y fallos de cuota/corrupción.

## Pendiente de verificar

Safari/iPhone físico y navegador real: teclado, foco, scroll, standalone, Archivos, funcionamiento offline y ciclo completo de actualización del service worker. No se ha desplegado en hosting. No hay sincronización entre ventanas. Los borradores no forman parte del backup JSON v1.
