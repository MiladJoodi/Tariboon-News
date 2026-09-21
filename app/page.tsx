import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSlider } from '@/components/hero-slider'
import { GalleryMarquee } from '@/components/gallery-marquee'
import { MarketTeaser } from '@/components/live-market-ticker'
import { NewsletterForm } from '@/components/newsletter-form'
import {
  getFeaturedArticles,
  getLatestArticles,
  getPopularArticles,
  getBreakingNews,
  getArticlesByCategory,
} from '@/data/articles'
import { categories } from '@/data/categories'
import { tags } from '@/data/tags'
import { formatViewCount } from '@/utils/format'
import { SafeImage } from '@/components/safe-image'
import { MessageCircle, Radio } from 'lucide-react'
import { Article } from '@/types'

function BoxHead({ title, href }: { title: string; href?: string }) {
  return (
    <div className="box-head">
      <h2 className="text-[13px] font-bold text-foreground flex items-center gap-2 leading-none">
        <span className="w-1 h-3.5 bg-primary rounded-sm shrink-0" />
        {title}
      </h2>
      {href && (
        <Link href={href} className="text-[11px] text-muted-foreground hover:text-primary shrink-0">
          بیشتر »
        </Link>
      )}
    </div>
  )
}

function ThumbLinks({ items }: { items: Article[] }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((a) => (
        <li key={a.id}>
          <Link
            href={`/post/${a.slug}`}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 group"
          >
            <div className="relative w-14 h-11 shrink-0 overflow-hidden rounded-sm bg-muted">
              <SafeImage src={a.image} alt={a.title} fill className="object-cover" sizes="56px" />
            </div>
            <span className="text-[12px] font-medium line-clamp-2 group-hover:text-primary flex-1 min-w-0 leading-snug">
              {a.title}
            </span>
            <span className="text-[10px] text-muted-foreground shrink-0 tabular-nums whitespace-nowrap">
              {formatViewCount(a.views)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function CategoryBlock({
  title,
  slug,
  items,
}: {
  title: string
  slug: string
  items: Article[]
}) {
  const lead = items[0]
  const rest = items.slice(1, 5)

  return (
    <div className="box overflow-hidden">
      <BoxHead title={title} href={`/category/${slug}`} />
      {lead && (
        <Link href={`/post/${lead.slug}`} className="block group border-b border-border">
          <div className="relative h-[130px] overflow-hidden bg-muted">
            <SafeImage
              src={lead.image}
              alt={lead.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <h3 className="absolute bottom-0 right-0 left-0 p-2.5 text-white text-[13px] font-bold leading-snug line-clamp-2">
              {lead.title}
            </h3>
          </div>
        </Link>
      )}
      <ThumbLinks items={rest} />
    </div>
  )
}

export default function HomePage() {
  const featured = getFeaturedArticles()
  const latest = getLatestArticles(16)
  const popular = getPopularArticles(12)
  const breaking = getBreakingNews()
  const politics = getArticlesByCategory('politics').slice(0, 5)
  const economy = getArticlesByCategory('economy').slice(0, 5)
  const sports = getArticlesByCategory('sports').slice(0, 5)
  const social = getArticlesByCategory('social').slice(0, 5)
  const science = getArticlesByCategory('science').slice(0, 5)
  const tech = getArticlesByCategory('technology').slice(0, 5)
  const gallery = getLatestArticles(12)
  const sliderItems = [...featured, ...latest]
    .filter((a, i, arr) => arr.findIndex((x) => x.id === a.id) === i)
    .slice(0, 6)
  const moreRead = latest.slice(8, 13)
  const editorPick = (featured.length >= 6 ? featured : [...featured, ...popular])
    .filter((a, i, arr) => arr.findIndex((x) => x.id === a.id) === i)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-3 py-2 space-y-2">
        <Link
          href="/live"
          className="flex items-center gap-2 rounded-md bg-[#243447] text-white px-3 py-1.5 text-[12px] hover:opacity-95"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <Radio className="w-3.5 h-3.5 text-red-400 shrink-0" />
          <span className="font-bold">پخش زنده اخبار</span>
          <span className="text-white/55 hidden sm:inline">— به‌روزرسانی خودکار</span>
          <span className="mr-auto text-[11px] text-white/70">ورود »</span>
        </Link>

        <HeroSlider slides={sliderItems} latest={latest} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          <div className="lg:col-span-8 box overflow-hidden">
            <BoxHead title="فوری / ویژه" href="/trending" />
            <ul className="divide-y divide-border">
              {(breaking.length ? breaking : popular).slice(0, 6).map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/post/${a.slug}`}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 group"
                  >
                    <div className="relative w-14 h-11 shrink-0 overflow-hidden rounded-sm bg-muted">
                      <SafeImage src={a.image} alt={a.title} fill className="object-cover" sizes="56px" />
                    </div>
                    <span className="chip bg-primary text-primary-foreground shrink-0">فوری</span>
                    <span className="text-[12px] font-semibold line-clamp-2 group-hover:text-primary flex-1 min-w-0 leading-snug">
                      {a.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0 tabular-nums">
                      {formatViewCount(a.views)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 box overflow-hidden">
            <BoxHead title="پربازدید" href="/trending" />
            <ol>
              {popular.slice(0, 7).map((a, i) => (
                <li key={a.id} className="border-b border-border last:border-0">
                  <Link
                    href={`/post/${a.slug}`}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 group"
                  >
                    <span className="text-primary font-black text-sm w-4 text-center shrink-0">
                      {(i + 1).toLocaleString('fa-IR')}
                    </span>
                    <div className="relative w-12 h-10 shrink-0 overflow-hidden rounded-sm bg-muted">
                      <SafeImage src={a.image} alt={a.title} fill className="object-cover" sizes="48px" />
                    </div>
                    <span className="text-[12px] font-semibold line-clamp-2 group-hover:text-primary flex-1 min-w-0 leading-snug">
                      {a.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0 tabular-nums whitespace-nowrap">
                      {formatViewCount(a.views)}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-start">
          <div className="lg:col-span-8 box overflow-hidden">
            <BoxHead title="بیشتر بخوانید" href="/archive" />
            <div className="divide-y divide-border">
              {moreRead.map((article) => (
                <Link
                  key={`more-${article.id}`}
                  href={`/post/${article.slug}`}
                  className="flex gap-2.5 px-2.5 py-2 hover:bg-accent/40 group"
                >
                  <div className="relative w-28 h-[72px] shrink-0 overflow-hidden rounded-sm bg-muted">
                    <SafeImage
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="112px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-primary mb-0.5">{article.category}</span>
                    <h3 className="font-bold text-[13px] leading-snug line-clamp-2 group-hover:text-primary">
                      {article.title}
                    </h3>
                    <span className="text-[10px] text-muted-foreground mt-1">
                      {formatViewCount(article.views)} بازدید
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-2">
            <MarketTeaser />
            <div className="box overflow-hidden">
              <BoxHead title="گفت‌وگوی خوانندگان" />
              <ul className="divide-y divide-border">
                {popular.slice(0, 4).map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/post/${a.slug}`}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 group"
                    >
                      <div className="relative w-11 h-11 shrink-0 overflow-hidden rounded-sm bg-muted">
                        <SafeImage src={a.image} alt={a.title} fill className="object-cover" sizes="44px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[12px] font-semibold line-clamp-2 group-hover:text-primary leading-snug block">
                          {a.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MessageCircle className="w-3 h-3 text-primary" />
                          {(a.likes % 35 + 4).toLocaleString('fa-IR')} دیدگاه
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <GalleryMarquee items={gallery} />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <CategoryBlock title="سیاسی" slug="politics" items={politics} />
          <CategoryBlock title="اقتصادی" slug="economy" items={economy} />
          <CategoryBlock title="ورزشی" slug="sports" items={sports} />
          <CategoryBlock title="اجتماعی" slug="social" items={social} />
          <CategoryBlock title="علمی" slug="science" items={science} />
          <CategoryBlock title="فناوری" slug="technology" items={tech} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          <div className="lg:col-span-8 box overflow-hidden">
            <BoxHead title="پیشنهاد سردبیر" href="/archive" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
              {editorPick.map((a) => (
                <Link
                  key={a.id}
                  href={`/post/${a.slug}`}
                  className="group bg-card hover:bg-accent/30 transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <SafeImage
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-2">
                    <span className="text-[10px] font-bold text-primary">{a.category}</span>
                    <h3 className="text-[12px] font-bold leading-snug line-clamp-2 mt-0.5 group-hover:text-primary">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-2">
            <div className="box overflow-hidden">
              <div className="px-3 py-2 bg-[#243447] text-white text-[13px] font-bold">خبرنامه</div>
              <div className="p-3 bg-[#243447]">
                <p className="text-[11px] text-white/70 mb-2">خلاصه اخبار هر صبح در ایمیل شما</p>
                <NewsletterForm variant="dark" showDescription={false} />
              </div>
            </div>
            <div className="box p-2.5">
              <h3 className="text-[13px] font-bold mb-2 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-primary rounded-sm" />
                برچسب‌ها
              </h3>
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 18).map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="text-[11px] border border-border px-2 py-0.5 rounded-sm hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="box p-2.5">
          <h3 className="text-[13px] font-bold mb-2 flex items-center gap-2">
            <span className="w-1 h-3.5 bg-primary rounded-sm" />
            همه سرویس‌ها
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-center border border-border rounded-md py-2 px-1 text-[11px] font-semibold hover:border-primary hover:text-primary"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
