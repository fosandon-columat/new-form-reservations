# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm install      # instalar dependencias (también existe pnpm-lock.yaml / pnpm-workspace.yaml)
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build
```

No hay configuración de linter ni de tests en el proyecto; la única red de
seguridad es el chequeo de tipos de `next build` (TypeScript en modo `strict`).

## Arquitectura

Formulario público de reserva de taquillas (Hospital del Hierro / Columat) sobre
**Next.js 16 (App Router) + React 19 + Tailwind CSS v4**. Es un wizard de 4 pasos
con **dos modos** que cambian las etiquetas y la lógica de selección de fechas.

### Frontera servidor/cliente
- `app/page.tsx` es un **Server Component** que solo monta `ReservationForm`.
- `components/ReservationForm.tsx` lleva `'use client'` y es la raíz interactiva;
  todos sus hijos (steps, Calendar, etc.) heredan el límite de cliente y **no
  deben repetir** la directiva `'use client'`.

### Estado: una única fuente de verdad
Todo el estado del wizard vive en `hooks/useReservation.ts` mediante `useReducer`,
con acciones como **unión discriminada** (tipo `Action`). El hook devuelve un
objeto `ReservationController` (`{ state, ...acciones }`) que se pasa entero como
prop `res` a cada step. Para cambiar comportamiento del wizard, modifica el
reducer — no añadas `useState` locales en los steps.

Detalles del estado inicial relevantes: arranca en `mode: 'orders'`, `step: 1`,
y en `year: 2026, month: 5` (Junio, mes 0-indexado). `minDate` = hoy + 3 días.

### Los dos modos (`Mode = 'orders' | 'storage'`)
Es la abstracción central; casi toda la UI condicional depende de `mode`:
- **`orders`** (Solicitud de pedido): se elige **un solo día** de recogida.
  `PICK_DATE` fija `start` y limpia `end`.
- **`storage`** (Reserva de almacenamiento): se elige un **rango** inicio→fin más
  horas de inicio/fin. La máquina de estados usa el flag `pickingEnd` para saber
  si el siguiente clic fija el inicio o el fin (ver `PICK_DATE` en el reducer).
  Los selectores de hora solo se muestran cuando ya hay `start` y `end`.

`SET_MODE` y `RESET` reinician la selección (`start`/`end`/`comp`/`pickingEnd`)
pero `SET_MODE` además vuelve al paso 1.

### Pasos del wizard
`step` (1–4) controla qué componente de `components/steps/` se renderiza:
DateStep → CompartmentStep → DataStep → ConfirmStep. La navegación es vía
`goStep(n)`.

### Datos y utilidades (`lib/`)
- `types.ts` — fuente de todos los tipos compartidos (`Mode`, `Step`,
  `Compartment`, `ReservationState`, `TimeField`, `BadgeKind`).
- `compartments.ts` — lista estática de taquillas (`compartments`) y el mapa
  `badgeClasses` (clases Tailwind por tipo de badge).
- `date.ts` — utilidades de calendario sin librerías externas: `buildMonthCells`
  (la semana empieza en **lunes**), `formatDate`, `diffInDays`, `startOfToday`,
  y las opciones de hora/minuto.

### Estilos
Tailwind v4 vía `@import "tailwindcss"` en `app/globals.css`. Los colores de marca
se definen como tokens en el bloque `@theme` (p. ej. `--color-navy`) y se consumen
como utilidades (`bg-navy`, `text-accent`, …). La fuente Inter se inyecta con
`next/font` como variable CSS `--font-inter`.
