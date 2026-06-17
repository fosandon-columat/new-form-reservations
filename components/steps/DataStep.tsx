import { IconInfoCircle, IconUser, IconArrowLeft, IconSend } from '@tabler/icons-react'
import type { ReservationController } from '@/hooks/useReservation'

const inputClass =
  'w-full rounded-[9px] border-[1.5px] border-field bg-[#fafbfc] px-[13px] py-[10px] text-[13px] text-ink outline-none transition-colors focus:border-accent focus:bg-white'

interface FieldDef {
  label: string
  required: boolean
  type: string
  placeholder: string
}

const fields: FieldDef[] = [
  { label: 'First name', required: true, type: 'text', placeholder: 'First name' },
  { label: 'Last name', required: true, type: 'text', placeholder: 'Last name' },
  { label: 'ID / Document', required: true, type: 'text', placeholder: '00000000A' },
  { label: 'Medical record', required: false, type: 'text', placeholder: 'Medical record no.' },
  { label: 'Email', required: true, type: 'email', placeholder: 'name@example.com' },
  { label: 'Phone', required: false, type: 'tel', placeholder: '+34 600 000 000' },
]

export default function DataStep({ res }: { res: ReservationController }) {
  const { goStep } = res

  return (
    <div>
      <div className="mb-4 flex items-start gap-2 rounded-[9px] border border-[#c8d5f5] bg-[#EEF3FF] px-[14px] py-[11px] text-[12px] text-slate">
        <IconInfoCircle size={15} className="mt-px flex-shrink-0 text-accent" aria-hidden="true" />
        <span>
          Fill in the applicant&apos;s details. Fields marked with{' '}
          <strong className="text-danger">*</strong> are required.
        </span>
      </div>

      <div className="mb-[14px] flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.5px] text-navy">
        <IconUser size={16} className="text-accent" aria-hidden="true" />
        Applicant details
      </div>

      <div className="grid grid-cols-2 gap-[14px]">
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold text-slate">
              {f.label}
              {f.required && <span className="ml-0.5 text-danger">*</span>}
            </label>
            <input type={f.type} className={inputClass} placeholder={f.placeholder} />
          </div>
        ))}
        <div className="col-span-2 flex flex-col gap-[5px]">
          <label className="text-[12px] font-semibold text-slate">Notes</label>
          <textarea
            className={`${inputClass} min-h-[72px] resize-y`}
            placeholder="Any additional notes..."
          />
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <button
          onClick={() => goStep(2)}
          className="flex items-center gap-1 rounded-[10px] border-[1.5px] border-field bg-transparent px-5 py-[11px] text-[13px] font-medium text-slate hover:bg-[#f5f7ff]"
        >
          <IconArrowLeft size={13} aria-hidden="true" /> Back
        </button>
        <button
          onClick={() => goStep(4)}
          className="flex items-center gap-2 rounded-[10px] bg-success px-7 py-[13px] text-[14px] font-bold text-white hover:brightness-110"
        >
          <IconSend size={16} aria-hidden="true" /> Confirm reservation
        </button>
      </div>
    </div>
  )
}
