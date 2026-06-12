# Columat · Reserva de taquillas (Next.js + TypeScript)

Versión en **Next.js (App Router) + TypeScript** del formulario público de
reserva. Mismo wizard de 4 pasos y dos modos (**Orders** / **Storage**) que la
variante Vite, pero sobre el framework de React con renderizado en servidor.

## Stack

- **Next.js 16** (App Router)
- **React 19.2**
- **TypeScript 5** (modo `strict`)
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **next/font** para Inter (self-hosting, sin layout shift)
- **@tabler/icons-react** para la iconografía

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:3000)
npm run build    # build de producción
npm run start    # servir el build
```

## Estructura

```
app/
├── layout.tsx          # layout raíz + next/font (Inter)
├── page.tsx            # Server Component → monta el formulario
└── globals.css         # @import "tailwindcss" + tokens (@theme)
components/
├── ReservationForm.tsx # 'use client' — raíz interactiva del wizard
├── ModeSwitcher.tsx
├── StepIndicator.tsx
├── Calendar.tsx
└── steps/
    ├── DateStep.tsx
    ├── CompartmentStep.tsx
    ├── DataStep.tsx
    └── ConfirmStep.tsx
hooks/
└── useReservation.ts   # estado del wizard (useReducer) + tipos
lib/
├── types.ts            # Mode, Step, Compartment, ReservationState…
├── compartments.ts
└── date.ts
```

## Notas de arquitectura

- `page.tsx` es un **Server Component**; la interactividad vive en
  `ReservationForm` marcado con `'use client'`. Sus hijos heredan el límite de
  cliente, por lo que no necesitan repetir la directiva.
- El estado del wizard está centralizado y **totalmente tipado** en
  `useReservation` (acciones como unión discriminada).
- Los colores de marca se definen como tokens en `@theme` dentro de
  `globals.css` y se consumen vía utilidades de Tailwind.

> ¿Por qué Next.js y no solo Vite? Vite optimiza el *bundling* (SPA cliente);
> Next.js añade renderizado en servidor (SSR/SSG), mejor SEO/TTFB, optimización
> de fuentes/imágenes y routing por archivos — útil para un formulario público.
