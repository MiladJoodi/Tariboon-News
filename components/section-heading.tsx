import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  href?: string
  hrefLabel?: string
  accent?: string
  className?: string
}

export function SectionHeading({
  title,
  href,
  hrefLabel = 'مشاهده همه',
  accent,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex items-end justify-between gap-4 mb-5', className)}>
      <div className="flex items-center gap-3">
        <span
          className="w-1.5 h-7 rounded-full shrink-0"
          style={{ backgroundColor: accent || 'var(--color-primary)' }}
        />
        <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="text-xs font-medium text-primary hover:underline underline-offset-4 shrink-0"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  )
}
