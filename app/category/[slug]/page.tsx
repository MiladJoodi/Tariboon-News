'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { Pagination } from '@/components/pagination'
import { getCategoryBySlug } from '@/data/categories'
import { getArticlesByCategory } from '@/data/articles'
import { categories } from '@/data/categories'
import { getPopularArticles } from '@/data/articles'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { formatViewCount } from '@/utils/format'
import type { SortOption } from '@/types'

const PAGE_SIZE = 12

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'oldest', label: 'قدیمی‌ترین' },
  { value: 'most-viewed', label: 'پربیننده‌ترین' },
  { value: 'most-liked', label: 'محبوب‌ترین' },
]

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortOption>('newest')

  const allArticles = getArticlesByCategory(slug)
  const sorted = [...allArticles].sort((a, b) => {
    if (sort === 'newest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    if (sort === 'oldest') return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    if (sort === 'most-viewed') return b.views - a.views
    if (sort === 'most-liked') return b.likes - a.likes
    return 0
  })
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const pageArticles = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const popular = getPopularArticles(5)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Category header */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden"
          style={{ backgroundColor: category.color }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
          <div className="relative">
          <h1 className="text-2xl md:text-3xl font-black mb-1">{category.name}</h1>
          <p className="text-white/80 text-sm mb-2">{category.description}</p>
          <span className="text-white/70 text-xs">{allArticles.length.toLocaleString('fa-IR')} خبر</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
              <div className="flex gap-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setPage(1) }}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      sort === opt.value
                        ? 'bg-[#DC2626] text-white'
                        : 'bg-accent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles grid */}
            {pageArticles.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">مقاله‌ای یافت نشد</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {pageArticles.map((a) => (
                  <NewsCard key={a.id} article={a} variant="featured" />
                ))}
              </div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} className="mt-6" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-400" />
                <h3 className="font-bold text-sm">پربیننده‌ترین</h3>
              </div>
              <div className="divide-y divide-border">
                {popular.map((a, i) => (
                  <div key={a.id} className="flex gap-2 p-3">
                    <span className="text-xl font-black text-muted-foreground/30 w-5 shrink-0 text-center leading-tight">
                      {(i + 1).toLocaleString('fa-IR')}
                    </span>
                    <Link href={`/post/${a.slug}`} className="text-xs font-medium text-foreground hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors">
                      {a.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-[#0F172A] text-white px-4 py-3">
                <h3 className="font-bold text-sm">سایر دسته‌بندی‌ها</h3>
              </div>
              <div className="p-3 space-y-1">
                {categories.filter((c) => c.slug !== slug).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent text-sm transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}