import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { getPopularArticles } from '@/data/articles'
import { TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'پربازدیدها',
  description: 'پرخواننده‌ترین اخبار تریبون',
}

export default function TrendingPage() {
  const popular = getPopularArticles(20)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wide">TRENDING</span>
          </div>
          <h1 className="text-3xl font-black">پربازدیدترین اخبار</h1>
          <p className="text-sm text-muted-foreground mt-2">
            مطالب با بیشترین بازدید در تریبون
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-10">
          {popular.slice(0, 2).map((a) => (
            <NewsCard key={a.id} article={a} variant="hero" className="min-h-[280px]" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popular.slice(2).map((a) => (
            <NewsCard key={a.id} article={a} variant="featured" />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
