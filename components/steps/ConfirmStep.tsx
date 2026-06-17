import type { ComponentType } from 'react'
import {
  IconCircleCheck,
  IconCalendar,
  IconCalendarEvent,
  IconCalendarOff,
  IconBox,
  IconPlus,
  type IconProps,
} from '@tabler/icons-react'
import { compartments } from '@/lib/compartments'
import { formatDate } from '@/lib/date'
import type { ReservationController } from '@/hooks/useReservation'

interface SummaryRow {
  Icon: ComponentType<IconProps>
  label: string
  val: string
}

export default function ConfirmStep({ res }: { res: ReservationController }) {
  const { state, reset } = res
  const { mode, start, end, comp, startH, startM, endH, endM } = state

  const c = compartments.find((x) => x.id === comp)
  const compLabel = c ? `${c.size} (${c.badgeText})` : '—'

  const rows: SummaryRow[] =
    mode === 'orders'
      ? [
          { Icon: IconCalendar, label: 'Pickup date', val: start ? formatDate(start) : '—' },
          { Icon: IconBox, label: 'Compartment', val: compLabel },
        ]
      : [
          {
            Icon: IconCalendarEvent,
            label: 'Start',
            val: start ? `${formatDate(start)} · ${startH}:${startM}` : '—',
          },
          {
            Icon: IconCalendarOff,
            label: 'End',
            val: end ? `${formatDate(end)} · ${endH}:${endM}` : '—',
          },
          { Icon: IconBox, label: 'Compartment', val: compLabel },
        ]

  return (
    <div className="py-5 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f8f0]">
        <IconCircleCheck size={32} className="text-success" aria-hidden="true" />
      </div>
      <div className="mb-2 text-[20px] font-extrabold text-navy">Reservation confirmed!</div>
      <div className="mb-5 text-[13px] text-slate">
        You&apos;ll receive an email with the locker access code.
      </div>

      <div className="mb-5 rounded-xl bg-page p-4 px-5 text-left">
        <div className="mb-[10px] text-[11px] font-bold uppercase tracking-[0.5px] text-muted">
          Summary
        </div>
        <div className="flex flex-col gap-2 text-[13px]">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-[10px]">
              <r.Icon size={16} className="w-[18px] text-accent" aria-hidden="true" />
              <span className="min-w-[130px] text-muted">{r.label}</span>
              <strong className="text-navy">{r.val}</strong>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={reset}
        className="mx-auto flex items-center gap-2 rounded-[10px] bg-navy px-7 py-[13px] text-[14px] font-bold text-white hover:bg-accent"
      >
        <IconPlus size={16} aria-hidden="true" /> New reservation
      </button>
    </div>
  )
}
