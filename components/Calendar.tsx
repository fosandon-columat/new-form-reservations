import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { months, dayLabels, buildMonthCells } from '@/lib/date'
import type { Mode } from '@/lib/types'

interface Props {
  mode: Mode
  start: Date | null
  end: Date | null
  today: Date
  minDate: Date
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
  onPick: (date: Date) => void
}

type Variant = 'single' | 'start' | 'end' | 'range' | 'normal'

const variantClass: Record<Variant, string> = {
  single: 'bg-navy text-white rounded-lg',
  start: 'bg-navy text-white rounded-l-lg rounded-r-none',
  end: 'bg-navy text-white rounded-r-lg rounded-l-none',
  range: 'bg-[#EEF3FF] text-accent rounded-none',
  normal: 'text-ink rounded-lg',
}

export default function Calendar({
  mode,
  start,
  end,
  today,
  minDate,
  year,
  month,
  onPrev,
  onNext,
  onPick,
}: Props) {
  const cells = buildMonthCells(year, month)
  const t = today.getTime()

  const resolve = (date: Date) => {
    const dow = date.getDay()
    const time = date.getTime()
    const disabled = time < minDate.getTime() || (mode === 'orders' && (dow === 0 || dow === 6))

    let variant: Variant = 'normal'
    if (start && time === start.getTime()) {
      variant = mode === 'storage' && end ? 'start' : 'single'
    } else if (end && time === end.getTime()) {
      variant = 'end'
    } else if (start && end && time > start.getTime() && time < end.getTime()) {
      variant = 'range'
    }
    return { disabled, isToday: time === t, variant }
  }

  return (
    <div className="mb-1 rounded-xl border border-line bg-[#fafbff] p-4">
      <div className="mb-[14px] flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-field bg-white text-slate hover:bg-[#f0f4ff] hover:text-navy"
        >
          <IconChevronLeft size={15} aria-hidden="true" />
        </button>
        <div className="text-[14px] font-bold text-navy">
          {months[month]} {year}
        </div>
        <button
          onClick={onNext}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] border border-field bg-white text-slate hover:bg-[#f0f4ff] hover:text-navy"
        >
          <IconChevronRight size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {dayLabels.map((d) => (
          <div key={d} className="py-1 text-center text-[10px] font-semibold uppercase text-muted">
            {d}
          </div>
        ))}

        {cells.map((date, i) => {
          if (!date) return <div key={`e${i}`} className="cursor-default" />
          const { disabled, isToday, variant } = resolve(date)
          const interactive = !disabled && variant === 'normal'

          return (
            <div
              key={date.getTime()}
              onClick={disabled ? undefined : () => onPick(date)}
              className={`relative px-0.5 py-[7px] text-center text-[13px] transition-colors ${
                disabled
                  ? 'cursor-not-allowed text-[#d0d5e8]'
                  : `cursor-pointer ${variantClass[variant]} ${
                      interactive ? 'hover:bg-[#EEF3FF] hover:text-accent' : ''
                    }`
              }`}
            >
              {date.getDate()}
              {isToday && (
                <span
                  className={`absolute bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                    variant === 'normal' || disabled ? 'bg-accent' : 'bg-cyan'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
