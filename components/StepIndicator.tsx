import { IconCheck } from '@tabler/icons-react'
import type { Step } from '@/lib/types'

const steps = ['Date', 'Compartment', 'Details'] as const

type DotState = 'done' | 'active' | 'pending'

const dotClass: Record<DotState, string> = {
  done: 'bg-navy text-white',
  active: 'bg-accent text-white shadow-[0_0_0_4px_rgba(0,69,206,0.15)]',
  pending: 'bg-line-soft text-muted',
}

const labelClass: Record<DotState, string> = {
  done: 'text-navy',
  active: 'text-accent',
  pending: 'text-muted',
}

export default function StepIndicator({ currentStep }: { currentStep: Step }) {
  // En el paso de confirmación (4) los tres pasos quedan como completados.
  const vis = currentStep > 3 ? 3 : currentStep

  return (
    <div className="mb-7 flex items-center">
      {steps.map((label, i) => {
        const n = i + 1
        const state: DotState = n < vis ? 'done' : n === vis ? 'active' : 'pending'
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-all ${dotClass[state]}`}
              >
                {state === 'done' ? <IconCheck size={12} aria-hidden="true" /> : n}
              </div>
              <span className={`text-[11px] font-medium ${labelClass[state]}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 h-0.5 flex-1 rounded-sm ${n < vis ? 'bg-navy' : 'bg-line'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
