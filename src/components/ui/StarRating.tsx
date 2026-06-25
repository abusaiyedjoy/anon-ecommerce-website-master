import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  count?: number
  className?: string
}

const sizeMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

export function StarRating({
  rating,
  max = 5,
  size = 'md',
  showCount = false,
  count,
  className,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className={cn('flex', sizeMap[size])}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating)
          const half = !filled && i < rating
          return (
            <span
              key={i}
              className={cn(
                filled ? 'text-gold' : half ? 'text-gold opacity-60' : 'text-gray-300'
              )}
            >
              ★
            </span>
          )
        })}
      </div>
      {showCount && count !== undefined && (
        <span className={cn('text-text-secondary', sizeMap[size])}>({count})</span>
      )}
    </div>
  )
}
