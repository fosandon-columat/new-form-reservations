import { IconCalendarCheck, IconBox, IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { compartments, badgeClasses } from '@/lib/compartments'
import { formatDate } from '@/lib/date'
import type { ReservationController } from '@/hooks/useReservation'

export default function CompartmentStep({ res }: { res: ReservationController }) {
  const { state, goStep, setComp } = res
  const { mode, start, end, comp } = state

  let banner: React.ReactNode
  if (mode === 'orders' && start) {
    banner = (
      <>
        Pickup on <strong className="font-bold text-navy">{formatDate(start)}</strong>
      </>
    )
  } else if (mode === 'storage' && start && end) {
    banner = (
      <>
        Storage from <strong className="font-bold text-navy">{formatDate(start)}</strong> to{' '}
        <strong className="font-bold text-navy">{formatDate(end)}</strong>
      </>
    )
  } else {
    banner = 'Selected date'
  }

  return (
    <div>
      <div className="mb-4 flex items-start gap-2 rounded-[9px] border border-[#c8d5f5] bg-[#EEF3FF] px-[14px] py-[11px] text-[12px] text-slate">
        <IconCalendarCheck size={15} className="mt-px flex-shrink-0 text-accent" aria-hidden="true" />
        <span>{banner}</span>
      </div>

      <div className="mb-[14px] flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.5px] text-navy">
        <IconBox size={16} className="text-accent" aria-hidden="true" />
        Select a compartment
      </div>

      <div className="grid grid-cols-3 gap-[10px]">
        {compartments.map((c) => {
          const selected = c.id === comp
          return (
            <div
              key={c.id}
              onClick={c.available ? () => setComp(c.id) : undefined}
              className={`relative rounded-xl border-2 px-[10px] pb-3 pt-[14px] text-center transition-all ${
                !c.available
                  ? 'cursor-not-allowed border-field opacity-35'
                  : selected
                    ? 'cursor-pointer border-navy bg-navy'
                    : 'cursor-pointer border-field hover:border-accent hover:bg-[#f0f4ff]'
              }`}
            >
              {!c.available && (
                <span className="absolute right-2 top-[6px] rounded-[10px] bg-[#fde8e8] px-[6px] py-0.5 text-[9px] font-bold text-danger">
                  Unavailable
                </span>
              )}
              <div
                className={`mb-1 text-[26px] font-extrabold leading-none ${
                  selected ? 'text-white' : 'text-ink'
                }`}
              >
                {c.size}
              </div>
              <div className={`text-[11px] leading-snug ${selected ? 'text-sky' : 'text-muted'}`}>
                {c.label}
              </div>
              <span
                className={`mt-[6px] inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  selected ? 'bg-cyan/20 text-cyan' : badgeClasses[c.badge]
                }`}
              >
                {c.badgeText}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-7 flex items-center justify-between">
        <button
          onClick={() => goStep(1)}
          className="flex items-center gap-1 rounded-[10px] border-[1.5px] border-field bg-transparent px-5 py-[11px] text-[13px] font-medium text-slate hover:bg-[#f5f7ff]"
        >
          <IconArrowLeft size={13} aria-hidden="true" /> Back
        </button>
        <button
          onClick={() => goStep(3)}
          className="flex items-center gap-2 rounded-[10px] bg-navy px-7 py-[13px] text-[14px] font-bold text-white hover:bg-accent"
        >
          Continue <IconArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
