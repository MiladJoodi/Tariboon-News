import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { authors } from '@/data/authors'
import { getArticlesByAuthor } from '@/data/articles'
import Image from 'next/image'
import Link from 'next/link'
import { Users, FileText } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'نویسندگان',
  description: 'تیم تحریریه تریبون',
}

export default function AuthorsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Users className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wide">EDITORIAL</span>
          </div>
          <h1 className="text-3xl font-black">نویسندگان تریبون</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg">
            تیم تحریریه با پوشش تخصصی حوزه‌های سیاسی، اقتصادی، ورزشی و فناوری
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {authors.map((author) => {
            const count = getArticlesByAuthor(author.slug).length
            return (
              <Link
                key={author.id}
                href={`/author/${author.slug}`}
                className="group rounded-2xl border border-border/60 bg-card/50 p-6 hover-lift text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                  <Image
                    src={author.avatar || '/placeholder-user.jpg'}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h2 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                  {author.name}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                  {author.bio}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <FileText className="w-3 h-3" />
                  {count.toLocaleString('fa-IR')} مطلب
                </span>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
