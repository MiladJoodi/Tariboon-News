import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { authors } from '@/data/authors'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import Link from 'next/link'
import Image from 'next/image'
import { FileText, Users, Layers, Award } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'درباره ما',
  description: 'درباره تریبون، تیم ما و ماموریت ما',
}

export default function AboutPage() {
  const stats = [
    { icon: FileText, label: 'مقاله منتشرشده', value: articles.filter((a) => a.status === 'published').length + '+' },
    { icon: Users, label: 'نویسنده', value: authors.length },
    { icon: Layers, label: 'دسته‌بندی', value: categories.length },
    { icon: Award, label: 'سال فعالیت', value: '۵+' },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 relative">
          <div className="w-16 h-16 brand-mark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/25">
            <span className="text-white font-display text-3xl leading-none">ت</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">درباره تریبون</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            تریبون یک پایگاه خبری جامع و مستقل است که با هدف ارائه اخبار دقیق، سریع و بی‌طرفانه به مخاطبان فارسی‌زبان فعالیت می‌کند.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <a
              href="https://github.com/MiladJoodi/Tariboon-News"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-white text-sm rounded-xl hover:bg-ink/90 transition-colors"
            >
              گیت‌هاب پروژه
            </a>
            <Link
              href="/authors"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-sm rounded-xl hover:bg-accent transition-colors"
            >
              تیم تحریریه
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/60 bg-card/50 p-6 text-center hover-lift"
            >
              <stat.icon className="w-7 h-7 text-primary mx-auto mb-3" />
              <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-16 rounded-2xl border border-border/60 bg-card/50 p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-primary rounded-full" />
            ماموریت ما
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            ما در تریبون باور داریم که دسترسی به اطلاعات صحیح یک حق اساسی است. تیم ما متشکل از روزنامه‌نگاران باتجربه و متعهد است که هر روز تلاش می‌کنند تا واقعیت‌ها را بدون سوگیری به مردم منتقل کنند.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            تریبون در حوزه‌های سیاسی، اقتصادی، فرهنگی، ورزشی و بین‌الملل فعالیت می‌کند و هر روز اخبار تازه و تحلیل‌های ژرف به مخاطبان ارائه می‌دهد.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-5 bg-primary rounded-full" />
              تیم تحریریه
            </h2>
            <Link href="/authors" className="text-xs text-primary hover:underline">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/author/${author.slug}`}
                className="rounded-2xl border border-border/60 bg-card/50 p-5 hover-lift text-center group"
              >
                <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-primary/15">
                  <Image
                    src={author.avatar || '/placeholder-user.jpg'}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {author.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{author.bio}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
