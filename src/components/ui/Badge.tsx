import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center font-semibold text-xs uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-text-primary text-white px-2 py-0.5 rounded-sm',
        sale: 'bg-text-primary text-white px-2 py-0.5 rounded-sm',
        new: 'bg-primary text-white px-2 py-0.5 rounded-sm',
        percent: 'bg-green-500 text-white px-2 py-0.5 rounded-sm',
        outline: 'border border-border text-text-secondary px-2 py-0.5 rounded-sm',
        secondary: 'bg-primary-light text-primary px-2 py-0.5 rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
