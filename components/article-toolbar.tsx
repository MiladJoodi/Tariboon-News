'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bookmark, Heart, Minus, Plus, Printer, Share2 } from 'lucide-react'
import { useBookmarkStore } from '@/store/bookmark-store'
import { Tag as TagType } from '@/types'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ArticleToolbarProps {
  articleId: string
  title: string
  slug: string
  initialLikes: number
  onSizeChange: (size: 'sm' | 'md' | 'lg') => void
  size: 'sm' | 'md' | 'lg'
  tags?: TagType[]
}

export function ArticleToolbar({
  articleId,
  title,
  slug,
  initialLikes,
  onSizeChange,
  size,
  tags = [],
}: ArticleToolbarProps) {
  const bookmarked = useBookmarkStore((s) => s.ids.includes(articleId))
  const toggle = useBookmarkStore((s) => s.toggle)
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)

  const like = () => {
    if (liked) {
      setLiked(false)
      setLikes((n) => n - 1)
    } else {
      setLiked(true)
      setLikes((n) => n + 1)
      toast.success('پسندیده شد')
    }
  }

  const share = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/post/${slug}` : ''
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await navigator.clipboard.writeText(url)
      toast.success('لینک کپی شد')
    }
  }

  const btn =
    'inline-flex items-center gap-1.5 h-8 px-3 text-[11px] font-medium rounded-md border border-border bg-card hover:bg-accent transition-colors cursor-pointer'

  return (
    <div className="flex flex-wrap items-center gap-2 pt-5 mt-6 border-t border-border">
      <button type="button" className={cn(btn, liked && 'border-primary text-primary')} onClick={like}>
        <Heart className={cn('h-3.5 w-3.5', liked && 'fill-current')} />
        {likes.toLocaleString('fa-IR')}
      </button>
      <button
        type="button"
        className={cn(btn, bookmarked && 'border-primary text-primary')}
        onClick={() => {
          toggle(articleId)
          toast.success(bookmarked ? 'از نشان‌ها حذف شد' : 'نشان‌گذاری شد')
        }}
      >
        <Bookmark className={cn('h-3.5 w-3.5', bookmarked && 'fill-current')} />
        نشان
      </button>
      <button type="button" className={btn} onClick={share}>
        <Share2 className="h-3.5 w-3.5" />
        اشتراک
      </button>
      <button type="button" className={btn} onClick={() => window.print()}>
        <Printer className="h-3.5 w-3.5" />
        چاپ
      </button>

      {tags.length > 0 && (
        <>
          <span className="w-px h-5 bg-border mx-0.5 hidden sm:inline-block" />
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="chip border border-border bg-muted/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </>
      )}

      <div className="mr-auto flex items-center rounded-md border border-border h-8 overflow-hidden bg-card">
        <button
          type="button"
          className="px-2.5 h-full hover:bg-accent cursor-pointer"
          onClick={() => onSizeChange(size === 'lg' ? 'md' : size === 'md' ? 'sm' : 'sm')}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="text-[10px] text-muted-foreground px-1">فونت</span>
        <button
          type="button"
          className="px-2.5 h-full hover:bg-accent cursor-pointer"
          onClick={() => onSizeChange(size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'lg')}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
