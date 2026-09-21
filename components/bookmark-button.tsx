'use client'

import { Bookmark } from 'lucide-react'
import { useBookmarkStore } from '@/store/bookmark-store'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface BookmarkButtonProps {
  articleId: string
  title?: string
  className?: string
  size?: 'sm' | 'md'
}

export function BookmarkButton({ articleId, title, className, size = 'md' }: BookmarkButtonProps) {
  const has = useBookmarkStore((s) => s.ids.includes(articleId))
  const toggle = useBookmarkStore((s) => s.toggle)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(articleId)
    toast.success(has ? 'از نشان‌ها حذف شد' : 'به نشان‌ها اضافه شد', {
      description: title,
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={has ? 'حذف از نشان‌ها' : 'افزودن به نشان‌ها'}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all',
        has
          ? 'bg-primary text-primary-foreground'
          : 'bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur',
        size === 'sm' ? 'h-8 w-8' : 'h-10 w-10',
        'cursor-pointer',
        className
      )}
    >
      <Bookmark className={cn(size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4', has && 'fill-current')} />
    </button>
  )
}
