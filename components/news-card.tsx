import Link from 'next/link'
import { Clock, Eye } from 'lucide-react'
import { Article } from '@/types'
import { formatPersianDate, formatViewCount } from '@/utils/format'
import { cn } from '@/lib/utils'
import { BookmarkButton } from '@/components/bookmark-button'
import { SafeImage } from '@/components/safe-image'

interface NewsCardProps {
  article: Article
  variant?: 'featured' | 'compact' | 'minimal' | 'hero' | 'horizontal'
  className?: string
  showBookmark?: boolean
}

export function NewsCard({
  article,
  variant = 'featured',
  className,
  showBookmark = true,
}: NewsCardProps) {
  if (variant === 'hero') {
    return (
      <Link
        href={`/post/${article.slug}`}
        className={cn('group relative block overflow-hidden rounded-md min-h-[280px]', className)}
      >
        <SafeImage
          src={article.image || '/placeholder.svg'}
          alt={article.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        {showBookmark && (
          <div className="absolute top-3 left-3 z-10">
            <BookmarkButton articleId={article.id} title={article.title} size="sm" />
          </div>
        )}
        {article.breaking && (
          <div className="absolute top-3 right-3 z-10 chip bg-primary text-primary-foreground animate-pulse">
            فوری
          </div>
        )}
        <div className="absolute bottom-0 right-0 left-0 p-4 md:p-6">
          <span className="chip bg-primary text-primary-foreground mb-2">{article.category}</span>
          <h2 className="text-white text-xl md:text-3xl font-black leading-snug mb-2 group-hover:text-red-100 transition-colors">
            {article.title}
          </h2>
          <p className="text-white/70 text-sm line-clamp-2 mb-3 max-w-2xl hidden sm:block">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-2 text-white/55 text-[11px]">
            <span>{article.author.name}</span>
            <span>·</span>
            <span>{formatPersianDate(article.publishedAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViewCount(article.views)}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/post/${article.slug}`}
        className={cn('group flex gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors', className)}
      >
        <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded-md bg-muted">
          <SafeImage
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="112px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-primary">{article.category}</span>
          <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/post/${article.slug}`}
        className={cn(
          'group relative block overflow-hidden rounded-md bg-card border border-border',
          className
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <SafeImage
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {article.breaking && (
            <div className="absolute top-2 right-2 chip bg-primary text-primary-foreground">فوری</div>
          )}
          {showBookmark && (
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <BookmarkButton articleId={article.id} title={article.title} size="sm" />
            </div>
          )}
        </div>
        <div className="p-3">
          <span className="text-[10px] font-bold text-primary mb-1 block">{article.category}</span>
          <h3 className="font-bold text-sm text-foreground leading-snug line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{article.excerpt}</p>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{formatPersianDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViewCount(article.views)}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex gap-2.5 group p-1.5 rounded-md hover:bg-accent/50', className)}>
        <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted">
          <SafeImage
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="64px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={`/post/${article.slug}`}
            className="font-semibold text-xs text-foreground hover:text-primary line-clamp-2 leading-snug block mb-1"
          >
            {article.title}
          </Link>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Clock className="w-2.5 h-2.5" />
            <span>{formatPersianDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={`/post/${article.slug}`}
      className={cn(
        'block text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug',
        className
      )}
    >
      {article.title}
    </Link>
  )
}
