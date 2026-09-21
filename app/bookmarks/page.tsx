'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { useBookmarkStore } from '@/store/bookmark-store'
import { articles } from '@/data/articles'
import { Bookmark, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BookmarksPage() {
  const ids = useBookmarkStore((s) => s.ids)
  const clear = useBookmarkStore((s) => s.clear)
  const saved = articles.filter((a) => ids.includes(a.id))

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Bookmark className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-wide">BOOKMARKS</span>
            </div>
            <h1 className="text-3xl font-black">نشان‌های من</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {saved.length.toLocaleString('fa-IR')} مطلب ذخیره شده
            </p>
          </div>
          {saved.length > 0 && (
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5" onClick={clear}>
              <Trash2 className="w-3.5 h-3.5" />
              پاک کردن همه
            </Button>
          )}
        </div>

        {saved.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-16 text-center">
            <Bookmark className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">هنوز مطلبی نشان نکرده‌اید</p>
            <Link href="/" className="text-primary text-sm font-medium hover:underline">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {saved.map((a) => (
              <NewsCard key={a.id} article={a} variant="featured" />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
