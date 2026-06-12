export const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
] as const

export const dayLabels = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'] as const

/** Devuelve la fecha de hoy a medianoche (sin horas). */
export function startOfToday(): Date {
  const t = new Date()
  t.setHours(0, 0, 0, 0)
  return t
}

/** Formatea una fecha como "13 Jun. 2026". */
export function formatDate(d: Date): string {
  return `${d.getDate()} ${months[d.getMonth()].slice(0, 3)}. ${d.getFullYear()}`
}

/** Genera las celdas del mes: huecos iniciales (null) + días (Date). */
export function buildMonthCells(year: number, month: number): (Date | null)[] {
  const firstDow = new Date(year, month, 1).getDay()
  const offset = firstDow === 0 ? 6 : firstDow - 1 // semana empieza en lunes
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = Array.from({ length: offset }, () => null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }
  return cells
}

/** Diferencia en días completos entre dos fechas. */
export function diffInDays(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
}

export const hourOptions = Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0'))
export const minuteOptions = ['00', '15', '30', '45'] as const
