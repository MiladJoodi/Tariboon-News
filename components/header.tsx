'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, Search, ChevronDown, Zap, Bookmark, TrendingUp
} from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { CommandSearch, openCommandSearch } from './command-search'
import { MarketTopStrip } from '@/components/live-market-ticker'
import { categories } from '@/data/categories'
import { getBreakingNews } from '@/data/articles'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBookmarkStore } from '@/store/bookmark-store'

const navLinks = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/live', label: 'پخش زنده' },
  { href: '/trending', label: 'پربازدید' },
  { href: '/markets', label: 'بازار لحظه‌ای' },
  { href: '/archive', label: 'آرشیو' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatOpen, setIsCatOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const catRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const breakingNews = getBreakingNews()
  const bookmarkCount = useBookmarkStore((s) => s.ids.length)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 8)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsCatOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isCatOpen) return
    const onDoc = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setIsCatOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [isCatOpen])

  return (
    <>
      <CommandSearch />

      {/* Non-sticky — scrolls away naturally, no height jump */}
      <div className="bg-[#243447] text-white text-[11px]">
        <div className="container mx-auto px-3 py-1.5 flex items-center gap-3">
          <span className="text-white/55 hidden lg:inline shrink-0">
            {new Date().toLocaleDateString('fa-IR', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <MarketTopStrip />
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {breakingNews.length > 0 && (
        <div className="bg-primary text-primary-foreground text-sm">
          <div className="container mx-auto flex items-center gap-2 px-3 py-1.5">
            <span className="flex items-center gap-1 font-bold whitespace-nowrap bg-white text-primary px-2 py-0.5 text-[11px] shrink-0 rounded-sm">
              <Zap className="w-3 h-3" />
              فوری
            </span>
            <div className="marquee-container flex-1">
              <div className="marquee-content">
                {[...breakingNews, ...breakingNews].map((n, i) => (
                  <span key={`${n.id}-${i}`}>
                    <Link href={`/post/${n.slug}`} className="hover:underline">
                      {n.title}
                    </Link>
                    <span className="mx-4 opacity-40">|</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Only the main bar sticks — fixed height, no collapse bounce */}
      <header className="sticky top-0 z-50 w-full">
        <div
          className={cn(
            'bg-card border-b border-border transition-shadow duration-200',
            isScrolled && 'shadow-md'
          )}
        >
          <div className="container mx-auto px-3 h-12 flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 brand-mark rounded-md flex items-center justify-center">
                <span className="text-white font-black text-base leading-none">ت</span>
              </div>
              <span className="text-lg font-black text-foreground">تریبون</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-2.5 py-1.5 text-[13px] font-medium rounded-md transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/5'
                      : 'text-foreground/80 hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div
                ref={catRef}
                className="relative"
                onMouseEnter={() => setIsCatOpen(true)}
                onMouseLeave={() => setIsCatOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-medium text-foreground/80 hover:text-primary rounded-md"
                  onClick={() => setIsCatOpen((v) => !v)}
                >
                  دسته‌ها
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', isCatOpen && 'rotate-180')} />
                </button>
                <div className={cn('absolute top-full right-0 pt-1 z-50', isCatOpen ? 'block' : 'hidden')}>
                  <div className="w-[26rem] bg-card border border-border rounded-lg shadow-lg p-2 grid grid-cols-3 gap-0.5">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="px-2.5 py-2 text-[13px] rounded-md hover:bg-accent flex items-center gap-2"
                        onClick={() => setIsCatOpen(false)}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md" onClick={openCommandSearch}>
                <Search className="h-4 w-4" />
              </Button>
              <Link href="/bookmarks" className="relative inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent">
                <Bookmark className="h-4 w-4" />
                {bookmarkCount > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 h-3.5 min-w-3.5 px-1 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
                    {bookmarkCount.toLocaleString('fa-IR')}
                  </span>
                )}
              </Link>
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center px-2.5 py-1 text-[11px] font-semibold bg-[#243447] text-white rounded-md"
              >
                مدیریت
              </Link>
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-muted/90 border-b border-border hidden md:block backdrop-blur-sm">
          <div className="container mx-auto px-3">
            <div className="flex items-center gap-0.5 overflow-x-auto py-1 scrollbar-hide">
              <Link
                href="/markets"
                className={cn(
                  'px-2.5 py-1 text-[11px] font-medium whitespace-nowrap rounded-md flex items-center gap-1',
                  pathname === '/markets' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                بازار لحظه‌ای
              </Link>
              <Link
                href="/live"
                className={cn(
                  'px-2.5 py-1 text-[11px] font-medium whitespace-nowrap rounded-md flex items-center gap-1',
                  pathname === '/live' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                زنده
              </Link>
              <Link
                href="/trending"
                className={cn(
                  'px-2.5 py-1 text-[11px] font-medium whitespace-nowrap rounded-md flex items-center gap-1',
                  pathname === '/trending' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                <TrendingUp className="w-3 h-3" />
                داغ‌ترین
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={cn(
                    'px-2.5 py-1 text-[11px] font-medium whitespace-nowrap rounded-md',
                    pathname === `/category/${cat.slug}`
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-card border-b border-border">
            <div className="container mx-auto px-3 py-2 space-y-0.5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-1 grid grid-cols-2 gap-0.5">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`} className="px-3 py-2 text-sm rounded-md hover:bg-accent flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
