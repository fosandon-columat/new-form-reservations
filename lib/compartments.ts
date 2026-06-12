import type { BadgeKind, Compartment } from './types'

// Compartimentos disponibles: talla + tipología fusionadas en una sola tarjeta.
export const compartments: Compartment[] = [
  { id: 's-std', size: 'S', label: 'Pequeño', badge: 'std', badgeText: 'Estándar', available: true },
  { id: 'm-std', size: 'M', label: 'Mediano', badge: 'std', badgeText: 'Estándar', available: true },
  { id: 'l-std', size: 'L', label: 'Grande', badge: 'std', badgeText: 'Estándar', available: true },
  { id: 's-ref', size: 'S', label: 'Pequeño', badge: 'ref', badgeText: 'Refrigerado', available: true },
  { id: 'm-ref', size: 'M', label: 'Mediano', badge: 'ref', badgeText: 'Refrigerado', available: true },
  { id: 'xl-std', size: 'XL', label: 'Extra grande', badge: 'big', badgeText: 'Estándar', available: false },
]

// Clases Tailwind para cada tipo de badge (estado normal de la tarjeta).
export const badgeClasses: Record<BadgeKind, string> = {
  std: 'bg-[#e8f0ff] text-accent',
  ref: 'bg-[#e0f8f7] text-success',
  big: 'bg-[#fff4e0] text-[#b07800]',
}
