import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: [number, number]
  onValueChange?: (value: [number, number]) => void
  className?: string
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ min = 0, max = 100, step = 1, value = [min, max], onValueChange, className }, ref) => {
    const handleChange = (index: number, newValue: number) => {
      const newRange: [number, number] = [value?.[0] ?? min, value?.[1] ?? max]
      newRange[index] = newValue
      
      // Ensure min is not greater than max
      if (index === 0 && newValue > newRange[1]) {
        newRange[0] = newRange[1]
      }
      // Ensure max is not less than min
      if (index === 1 && newValue < newRange[0]) {
        newRange[1] = newRange[0]
      }
      
      onValueChange?.(newRange)
    }

    const rangeValue = value || [min, max]

    return (
      <div ref={ref} className={cn('space-y-3', className)}>
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">Min: ${rangeValue[0]}</label>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={rangeValue[0]}
            onChange={(e) => handleChange(0, Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">Max: ${rangeValue[1]}</label>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={rangeValue[1]}
            onChange={(e) => handleChange(1, Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    )
  }
)

Slider.displayName = 'Slider'

export { Slider }
