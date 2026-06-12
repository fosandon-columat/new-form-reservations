import type { ComponentType } from 'react'
import {
  IconCalendarEvent,
  IconClock,
  IconClockCheck,
  IconArrowRight,
  type IconProps,
} from '@tabler/icons-react'
import Calendar from '@/components/Calendar'
import { formatDate, hourOptions, minuteOptions, diffInDays } from '@/lib/date'
import type { ReservationController } from '@/hooks/useReservation'

function TimeSelect({
  value,
  options,
  onChange,
}: {
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-14 cursor-pointer border-none bg-transparent text-center text-[20px] font-bold text-navy outline-none"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

function TimeBlock({
  label,
  Icon,
  h,
  m,
  onH,
  onM,
}: {
  label: string
  Icon: ComponentType<IconProps>
  h: string
  m: string
  onH: (value: string) => void
  onM: (value: string) => void
}) {
  return (
    <div className="flex-1">
      <div className="mb-[6px] text-[11px] font-semibold uppercase tracking-[0.4px] text-slate">
        {label}
      </div>
      <div className="flex items-center gap-[6px] rounded-[10px] border-[1.5px] border-field bg-white px-3 py-[10px] focus-within:border-accent">
        <Icon size={17} className="text-accent" aria-hidden="true" />
        <TimeSelect value={h} options={hourOptions} onChange={onH} />
        <span className="text-[20px] font-bold text-navy">:</span>
        <TimeSelect value={m} options={minuteOptions} onChange={onM} />
      </div>
    </div>
  )
}

function DateChip({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div
      className={`rounded-[9px] border-[1.5px] px-[14px] py-[10px] ${
        active ? 'border-accent bg-[#EEF3FF]' : 'border-[#c8d5f5] bg-[#f0f4ff]'
      }`}
    >
      <div className="mb-[3px] text-[10px] font-semibold uppercase tracking-[0.4px] text-muted">
        {label}
      </div>
      <div className={`text-[14px] ${value ? 'font-bold text-navy' : 'font-normal text-[#c0c8d8]'}`}>
        {value || 'Elige fecha'}
      </div>
    </div>
  )
}

export default function DateStep({ res }: { res: ReservationController }) {
  const { state, today, minDate, pickDate, prevMonth, nextMonth, goStep, setTime } = res
  const { mode, start, end, pickingEnd } = state

  const isStorage = mode === 'storage'
  const showTimes = isStorage && start && end
  const durationDays = start && end ? diffInDays(start, end) : null

  return (
    <div>
      <div className="mb-[14px] flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.5px] text-navy">
        <IconCalendarEvent size={16} className="text-accent" aria-hidden="true" />
        {isStorage ? 'Período de reserva' : 'Día de recogida'}
      </div>

      {isStorage && (
        <div>
          <div className="mb-[14px] grid grid-cols-[1fr_auto_1fr] items-center gap-[10px]">
            <DateChip label="Fecha inicio" value={start ? formatDate(start) : ''} active={pickingEnd} />
            <div className="text-center text-[18px] text-muted">→</div>
            <DateChip
              label="Fecha fin"
              value={end ? formatDate(end) : ''}
              active={!pickingEnd && !!end}
            />
          </div>
          {durationDays !== null && (
            <div className="mb-[14px]">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#c8d5f5] bg-[#f0f4ff] px-3 py-1 text-[12px] font-semibold text-accent">
                <IconClock size={11} aria-hidden="true" />
                {durationDays} día{durationDays !== 1 ? 's' : ''} de almacenamiento
              </span>
            </div>
          )}
        </div>
      )}

      <Calendar
        mode={mode}
        start={start}
        end={end}
        today={today}
        minDate={minDate}
        year={state.year}
        month={state.month}
        onPrev={prevMonth}
        onNext={nextMonth}
        onPick={pickDate}
      />

      {showTimes && (
        <div className="mt-[14px] flex gap-3">
          <TimeBlock
            label="Hora de inicio"
            Icon={IconClock}
            h={state.startH}
            m={state.startM}
            onH={(v) => setTime('startH', v)}
            onM={(v) => setTime('startM', v)}
          />
          <TimeBlock
            label="Hora de fin"
            Icon={IconClockCheck}
            h={state.endH}
            m={state.endM}
            onH={(v) => setTime('endH', v)}
            onM={(v) => setTime('endM', v)}
          />
        </div>
      )}

      <div className="mt-7 flex items-center justify-between">
        <div />
        <button
          onClick={() => goStep(2)}
          className="flex items-center gap-2 rounded-[10px] bg-navy px-7 py-[13px] text-[14px] font-bold text-white hover:bg-accent"
        >
          Continuar <IconArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
