import type { BadgeKind, Compartment } from './types'

// Compartimentos disponibles: talla + tipología fusionadas en una sola tarjeta.
export const compartments: Compartment[] = [
  { id: 's-std', size: 'S', label: 'Small', badge: 'std', badgeText: 'Standard', available: true },
  { id: 'm-std', size: 'M', label: 'Medium', badge: 'std', badgeText: 'Standard', available: true },
  { id: 'l-std', size: 'L', label: 'Large', badge: 'std', badgeText: 'Standard', available: true },
  { id: 's-ref', size: 'S', label: 'Small', badge: 'ref', badgeText: 'Refrigerated', available: true },
  { id: 'm-ref', size: 'M', label: 'Medium', badge: 'ref', badgeText: 'Refrigerated', available: true },
  { id: 'xl-std', size: 'XL', label: 'Extra large', badge: 'big', badgeText: 'Standard', available: false },
]

// Clases Tailwind para cada tipo de badge (estado normal de la tarjeta).
export const badgeClasses: Record<BadgeKind, string> = {
  std: 'bg-[#e8f0ff] text-accent',
  ref: 'bg-[#e0f8f7] text-success',
  big: 'bg-[#fff4e0] text-[#b07800]',
}
