import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md',
        outline:
          'border border-border bg-transparent text-text-primary hover:border-primary hover:text-primary',
        ghost:
          'bg-transparent text-text-secondary hover:bg-primary-light hover:text-primary',
        link:
          'bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto',
        dark:
          'bg-text-primary text-white hover:bg-slate-800',
        secondary:
          'bg-surface text-text-primary border border-border hover:border-primary hover:text-primary',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-5 text-sm',
        lg: 'h-12 px-8 text-sm tracking-wide uppercase',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      // Render children directly with button styles applied via wrapper
      const child = children as React.ReactElement
      return (
        <child.type
          {...child.props}
          className={cn(buttonVariants({ variant, size }), className, child.props.className)}
          ref={ref}
        />
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
