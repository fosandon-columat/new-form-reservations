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
  { label: 'Nombre', required: true, type: 'text', placeholder: 'Nombre' },
  { label: 'Apellidos', required: true, type: 'text', placeholder: 'Apellidos' },
  { label: 'DNI / Documento', required: true, type: 'text', placeholder: '00000000A' },
  { label: 'Historia clínica', required: false, type: 'text', placeholder: 'Nº de historia clínica' },
  { label: 'Email', required: true, type: 'email', placeholder: 'correo@ejemplo.com' },
  { label: 'Teléfono', required: false, type: 'tel', placeholder: '+34 600 000 000' },
]

export default function DataStep({ res }: { res: ReservationController }) {
  const { goStep } = res

  return (
    <div>
      <div className="mb-4 flex items-start gap-2 rounded-[9px] border border-[#c8d5f5] bg-[#EEF3FF] px-[14px] py-[11px] text-[12px] text-slate">
        <IconInfoCircle size={15} className="mt-px flex-shrink-0 text-accent" aria-hidden="true" />
        <span>
          Rellena los datos del solicitante. Los campos con{' '}
          <strong className="text-danger">*</strong> son obligatorios.
        </span>
      </div>

      <div className="mb-[14px] flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.5px] text-navy">
        <IconUser size={16} className="text-accent" aria-hidden="true" />
        Datos del solicitante
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
          <label className="text-[12px] font-semibold text-slate">Observaciones</label>
          <textarea
            className={`${inputClass} min-h-[72px] resize-y`}
            placeholder="Cualquier indicación adicional..."
          />
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <button
          onClick={() => goStep(2)}
          className="flex items-center gap-1 rounded-[10px] border-[1.5px] border-field bg-transparent px-5 py-[11px] text-[13px] font-medium text-slate hover:bg-[#f5f7ff]"
        >
          <IconArrowLeft size={13} aria-hidden="true" /> Volver
        </button>
        <button
          onClick={() => goStep(4)}
          className="flex items-center gap-2 rounded-[10px] bg-success px-7 py-[13px] text-[14px] font-bold text-white hover:brightness-110"
        >
          <IconSend size={16} aria-hidden="true" /> Confirmar reserva
        </button>
      </div>
    </div>
  )
}
