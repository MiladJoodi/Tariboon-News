import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { getAuthorBySlug, authors } from '@/data/authors'
import { getArticlesByAuthor } from '@/data/articles'
import { formatPersianDate } from '@/utils/format'
import { User, Mail, FileText, Calendar } from 'lucide-react'
import Image from 'next/image'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) return { title: 'نویسنده یافت نشد' }
  return { title: author.name, description: author.bio }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) notFound()

  const authorArticles = getArticlesByAuthor(slug)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="rounded-3xl border border-border/60 bg-card/50 p-8 mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.52_0.22_22_/_0.08),transparent_50%)]" />
          <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/15 shrink-0">
            <Image
              src={author.avatar || '/placeholder-user.jpg'}
              alt={author.name}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div className="relative text-center md:text-right flex-1">
            <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">{author.name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{author.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                {author.email}
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                {authorArticles.length.toLocaleString('fa-IR')} مقاله
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                عضویت از {formatPersianDate(author.joinedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="w-1.5 h-5 bg-primary rounded-full inline-block" />
            مقالات {author.name}
          </h2>
          <span className="text-sm text-muted-foreground">
            {authorArticles.length.toLocaleString('fa-IR')} مقاله
          </span>
        </div>

        {authorArticles.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>هنوز مقاله‌ای منتشر نشده است</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {authorArticles.map((a) => (
              <NewsCard key={a.id} article={a} variant="featured" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
