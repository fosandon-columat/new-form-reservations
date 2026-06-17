import { IconPackage, IconArchive } from '@tabler/icons-react'
import type { Mode } from '@/lib/types'

const options = [
  // { id: 'orders', label: 'Order reservation', Icon: IconPackage },
  { id: 'storage', label: 'Storage reservation', Icon: IconArchive },
] as const

interface Props {
  mode: Mode
  onChange: (mode: Mode) => void
}

export default function ModeSwitcher({ mode, onChange }: Props) {
      return (
            <div className="mx-auto mt-5 flex w-fit overflow-hidden rounded-[10px] border-[1.5px] border-navy">
                  {
                      options.map(({ id, label, Icon }, i) => (
                            <button
                                  key={id}
                                  // onClick={() => onChange(id)}
                                  className={`flex items-center gap-[6px] px-8 py-[10px] text-[13px] font-semibold transition-colors ${
                                    i === 0 ? 'border-r border-navy' : ''
                                  } ${mode === id ? 'bg-navy text-white' : 'bg-white text-navy'}`}
                            >
                                  <Icon size={13} aria-hidden="true" />
                                  {label}
                            </button>
                      ))
                  }
            </div>
      )
}
