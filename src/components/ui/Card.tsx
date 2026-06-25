import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('rounded-lg border border-border bg-white shadow-card', className)}
    {...props}
  />
)
Card.displayName = 'Card'

const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1 p-5 pb-3', className)}
    {...props}
  />
)
CardHeader.displayName = 'CardHeader'

const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-base font-semibold text-text-primary uppercase tracking-wide', className)}
    {...props}
  />
)
CardTitle.displayName = 'CardTitle'

const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
)
CardDescription.displayName = 'CardDescription'

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5 pt-2', className)} {...props} />
)
CardContent.displayName = 'CardContent'

const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center p-5 pt-0', className)}
    {...props}
  />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
