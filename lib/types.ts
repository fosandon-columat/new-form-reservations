export type Mode = 'orders' | 'storage'

export type Step = 1 | 2 | 3 | 4

export type BadgeKind = 'std' | 'ref' | 'big'

export type TimeField = 'startH' | 'startM' | 'endH' | 'endM'

export interface Compartment {
  id: string
  size: string
  label: string
  badge: BadgeKind
  badgeText: string
  available: boolean
}

export interface ReservationState {
  mode: Mode
  step: Step
  year: number
  month: number
  start: Date | null
  end: Date | null
  pickingEnd: boolean
  comp: string | null
  startH: string
  startM: string
  endH: string
  endM: string
}
