'use client'

import Link from 'next/link'
import { categories } from '@/data/categories'
import { ArrowUp } from 'lucide-react'
import { NewsletterForm } from '@/components/newsletter-form'

const SOCIAL_LINKS = [
  { label: 'گیت‌هاب', href: 'https://github.com/MiladJoodi/Tariboon-News' },
  { label: 'لینکدین', href: 'https://www.linkedin.com/in/joodi/' },
]

export function Footer() {
  const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' })

  return (
    <footer className="mt-6 bg-[#243447] text-[#e8edf4]">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 brand-mark rounded-md flex items-center justify-center">
                <span className="text-white font-black text-sm">ت</span>
              </div>
              <span className="text-xl font-black text-white">تریبون</span>
            </div>
            <p className="text-sm leading-relaxed text-[#b7c2d0] mb-5 max-w-sm">
              پایگاه خبری جامع برای پوشش اخبار ایران و جهان.
            </p>
            <NewsletterForm variant="dark" />
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-3 text-sm">دسترسی</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'صفحه اصلی' },
                { href: '/live', label: 'پخش زنده' },
                { href: '/markets', label: 'بازار لحظه‌ای' },
                { href: '/trending', label: 'پربازدید' },
                { href: '/archive', label: 'آرشیو' },
                { href: '/authors', label: 'نویسندگان' },
                { href: '/privacy', label: 'حریم خصوصی' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#b7c2d0] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-3 text-sm">سرویس‌ها</h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {categories.slice(0, 10).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-[#b7c2d0] hover:text-white">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-3 text-sm">ارتباط</h3>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#b7c2d0] hover:text-white"
                >
                  {s.label}
                </a>
              ))}
              <Link href="/admin" className="text-sm text-[#b7c2d0] hover:text-white">
                پنل مدیریت
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between text-xs text-[#8a97a8]">
          <span>© {year} تریبون</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 hover:text-white cursor-pointer"
          >
            <ArrowUp className="w-3 h-3" />
            بالا
          </button>
        </div>
      </div>
    </footer>
  )
}
