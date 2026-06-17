'use client'

import { useReservation } from '@/hooks/useReservation'
import ModeSwitcher from '@/components/ModeSwitcher'
import StepIndicator from '@/components/StepIndicator'
import DateStep from '@/components/steps/DateStep'
import CompartmentStep from '@/components/steps/CompartmentStep'
import DataStep from '@/components/steps/DataStep'
import ConfirmStep from '@/components/steps/ConfirmStep'

function Logo() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <rect x="4" y="4" width="10" height="10" rx="2" fill="#001C54" />
      <rect x="18" y="4" width="10" height="10" rx="2" fill="#0045CE" />
      <rect x="4" y="18" width="10" height="10" rx="2" fill="#0045CE" />
      <rect x="18" y="18" width="10" height="10" rx="2" fill="#56F6F4" />
    </svg>
  )
}

export default function ReservationForm() {
  const res = useReservation()
  const { mode, step } = res.state

    const title = mode === 'orders' ? 'Order request' : 'Storage reservation'
    const subtitle =
      mode === 'orders'
        ? 'Select the pickup day and your reservation details'
        : 'Choose the storage period and your details'

    return (
    <>
      <h2 className="sr-only">User reservation form — Orders and Storage</h2>

      <ModeSwitcher mode={mode} onChange={res.setMode} />

      <div className="mx-auto mb-8 mt-5 max-w-[680px] px-4">
        <div className="overflow-hidden rounded-2xl border border-[#e2e6f0] bg-white">
          {/* Cabecera de marca */}
          <div className="bg-navy px-8 pb-6 pt-7">
            <div className="mb-[18px] flex items-center gap-3">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-white">
                <Logo />
              </div>
              <div>
                <div className="text-[15px] font-bold text-white">Hospital del Hierro</div>
                <div className="text-[11px] text-sky">Locker reservation system</div>
              </div>
            </div>
            <div className="text-[22px] font-bold tracking-[-0.3px] text-white">{title}</div>
            <div className="mt-1 text-[13px] text-sky">{subtitle}</div>
          </div>

          {/* Cuerpo */}
          <div className="px-8 py-7">
            <StepIndicator currentStep={step} />

            {step === 1 && <DateStep res={res} />}
            {step === 2 && <CompartmentStep res={res} />}
            {step === 3 && <DataStep res={res} />}
            {step === 4 && <ConfirmStep res={res} />}
          </div>
        </div>
      </div>
    </>
  )
}
