import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { getLatestArticles } from '@/data/articles'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  const recent = getLatestArticles(4)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto mb-12">
          <div className="font-display text-8xl text-primary/20 mb-4 leading-none">۴۰۴</div>
          <h1 className="text-2xl font-black text-foreground mb-3">صفحه یافت نشد</h1>
          <p className="text-muted-foreground mb-8">
            متاسفیم، صفحه‌ای که دنبالش بودید وجود ندارد یا حذف شده است.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              صفحه اصلی
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors"
            >
              <Search className="w-4 h-4" />
              جستجو
            </Link>
          </div>
        </div>

        {recent.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-foreground">آخرین اخبار</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recent.map((a) => (
                <NewsCard key={a.id} article={a} variant="featured" />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
