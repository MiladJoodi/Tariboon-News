'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article, Comment } from '@/types'
import { ArticleToolbar } from '@/components/article-toolbar'
import { CommentForm } from '@/components/comment-form'
import { NewsCard } from '@/components/news-card'
import { SafeImage } from '@/components/safe-image'
import { formatPersianDate, formatViewCount, timeAgo } from '@/utils/format'
import { ChevronLeft, Clock, Eye, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostContentProps {
  article: Article
  related: Article[]
  comments: Comment[]
}

export function PostContent({ article, related, comments }: PostContentProps) {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')

  return (
    <article className={cn(`article-size-${size}`)}>
      <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-5">
        <Link href="/" className="hover:text-primary">خانه</Link>
        <ChevronLeft className="w-3 h-3 opacity-40" />
        <Link href={`/category/${article.categorySlug}`} className="hover:text-primary">
          {article.category}
        </Link>
      </nav>

      <header className="mb-5">
        <h1 className="text-2xl md:text-[1.9rem] font-black text-foreground leading-snug mb-3">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-4">
            {article.subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2.5 text-[12px]">
          <Link
            href={`/category/${article.categorySlug}`}
            className="chip bg-primary text-primary-foreground"
          >
            {article.category}
          </Link>
          {article.breaking && (
            <span className="chip bg-amber/20 text-amber-800 dark:text-amber">فوری</span>
          )}
          <Link
            href={`/author/${article.author.slug}`}
            className="inline-flex items-center gap-2 rounded-md bg-muted pr-1 pl-2.5 py-1 hover:bg-accent transition-colors"
          >
            <span className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
              <Image
                src={article.author.avatar || '/placeholder-user.jpg'}
                alt={article.author.name}
                fill
                className="object-cover"
                sizes="28px"
              />
            </span>
            <span className="font-semibold text-foreground">{article.author.name}</span>
          </Link>
          <span className="inline-flex items-center gap-1 text-muted-foreground rounded-md bg-muted px-2 py-1">
            <Clock className="w-3.5 h-3.5" />
            {formatPersianDate(article.publishedAt)}
          </span>
          <span className="text-muted-foreground rounded-md bg-muted px-2 py-1">
            {article.readingTime} دقیقه
          </span>
          <span className="inline-flex items-center gap-1 text-muted-foreground rounded-md bg-muted px-2 py-1">
            <Eye className="w-3.5 h-3.5" />
            {formatViewCount(article.views)}
          </span>
        </div>
      </header>

      <figure className="mb-5">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-muted border border-border">
          <SafeImage
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>
      </figure>

      <div
        className="prose-news text-foreground max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Actions + tags in one row under post */}
      <ArticleToolbar
        articleId={article.id}
        title={article.title}
        slug={article.slug}
        initialLikes={article.likes}
        size={size}
        onSizeChange={setSize}
        tags={article.tags}
      />

      <div className="mt-6 box p-4 flex gap-4">
        <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0">
          <Image
            src={article.author.avatar || '/placeholder-user.jpg'}
            alt={article.author.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div>
          <Link href={`/author/${article.author.slug}`} className="font-bold hover:text-primary">
            {article.author.name}
          </Link>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{article.author.bio}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          دیدگاه‌ها
          <span className="text-xs font-normal text-muted-foreground">
            ({comments.length.toLocaleString('fa-IR')})
          </span>
        </h3>

        <div className="space-y-2.5 mb-4">
          {comments.map((c) => (
            <div key={c.id} className="box p-3.5">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[13px] font-bold text-foreground">{c.authorName}</span>
                <span className="text-[10px] text-muted-foreground">{timeAgo(c.createdAt)}</span>
              </div>
              <p className="text-[13px] text-foreground/85 leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>

        <div className="box p-4 max-w-lg">
          <p className="text-[12px] font-semibold mb-3 text-muted-foreground">نظر خود را بنویسید</p>
          <CommentForm />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            اخبار مرتبط
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {related.map((a) => (
              <NewsCard key={a.id} article={a} variant="featured" />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
