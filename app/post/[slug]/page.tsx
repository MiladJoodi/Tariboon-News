import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PostContent } from '@/components/post-content'
import { ReadingProgress } from '@/components/reading-progress'
import { getArticleBySlug, getRelatedArticles, articles, getPopularArticles } from '@/data/articles'
import { getCommentsForArticle } from '@/data/comments'
import { tags } from '@/data/tags'
import { formatViewCount } from '@/utils/format'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'مقاله یافت نشد' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(article, 3)
  const popular = getPopularArticles(6)
  const articleComments = getCommentsForArticle(article.id, article.slug)

  return (
    <div className="min-h-screen">
      <ReadingProgress />
      <Header />

      <main className="container mx-auto px-3 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          <div className="lg:col-span-8 box p-3 md:p-5">
            <PostContent article={article} related={related} comments={articleComments} />
          </div>

          <aside className="lg:col-span-4 space-y-2">
            <div className="box overflow-hidden sticky top-14">
              <div className="box-head">
                <h3 className="font-bold text-[13px] flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-primary rounded-sm" />
                  پربازدید
                </h3>
              </div>
              <div className="divide-y divide-border">
                {popular.map((a, i) => (
                  <Link
                    key={a.id}
                    href={`/post/${a.slug}`}
                    className="flex gap-2.5 p-3 hover:bg-accent/40 group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-sm font-black flex items-center justify-center shrink-0">
                      {(i + 1).toLocaleString('fa-IR')}
                    </span>
                    <div>
                      <span className="text-xs font-medium line-clamp-2 leading-snug group-hover:text-primary block">
                        {a.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-1 block">
                        {formatViewCount(a.views)} بازدید
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="box overflow-hidden">
              <div className="box-head">
                <h3 className="font-bold text-[13px] flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-primary rounded-sm" />
                  برچسب‌ها
                </h3>
              </div>
              <div className="p-3 flex flex-wrap gap-1.5">
                {tags.slice(0, 14).map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="chip bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag.name}
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
