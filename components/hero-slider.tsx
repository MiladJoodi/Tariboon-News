'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { Article } from '@/types'
import { SafeImage } from '@/components/safe-image'
import { formatViewCount } from '@/utils/format'
import { cn } from '@/lib/utils'

interface HeroSliderProps {
  slides: Article[]
  latest: Article[]
}

export function HeroSlider({ slides, latest }: HeroSliderProps) {
  const items = slides.slice(0, 6)
  const sideItems = latest.slice(0, 6)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(items.length, 1))
  }, [items.length])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % Math.max(items.length, 1))
  }, [items.length])

  useEffect(() => {
    if (paused || items.length < 2) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next, items.length])

  const current = items[index]
  if (!current) return null

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:items-stretch">
      <div
        className="lg:col-span-8 box overflow-hidden flex flex-col"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative group flex-1 min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
          <Link href={`/post/${current.slug}`} className="absolute inset-0 block">
            <SafeImage
              src={current.image}
              alt={current.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            <div className="absolute bottom-0 right-0 left-0 p-3.5 md:p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="chip bg-primary text-primary-foreground">{current.category}</span>
                {current.breaking && <span className="chip bg-white text-primary">فوری</span>}
                <span className="text-[11px] text-white/70 mr-auto">
                  {formatViewCount(current.views)} بازدید
                </span>
              </div>
              <h2 className="text-white text-lg sm:text-xl md:text-2xl font-black leading-snug line-clamp-2 mb-1.5">
                {current.title}
              </h2>
              <p className="text-white/75 text-[12px] md:text-[13px] line-clamp-2 max-w-2xl hidden sm:block">
                {current.excerpt}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={prev}
            className="absolute top-1/2 right-2 -translate-y-1/2 z-10 h-8 w-8 rounded-md bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute top-1/2 left-2 -translate-y-1/2 z-10 h-8 w-8 rounded-md bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="absolute top-2.5 left-2.5 z-10 flex gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all cursor-pointer',
                  i === index ? 'w-5 bg-primary' : 'w-1.5 bg-white/55 hover:bg-white'
                )}
                aria-label={`اسلاید ${(i + 1).toLocaleString('fa-IR')}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-border border-t border-border shrink-0">
          {items.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                'relative block w-full h-[70px] sm:h-[78px] overflow-hidden cursor-pointer bg-muted p-0 text-right',
                i === index ? 'ring-2 ring-inset ring-primary z-[1]' : 'opacity-85 hover:opacity-100'
              )}
            >
              <SafeImage src={s.image} alt={s.title} fill className="object-cover" sizes="160px" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <span className="absolute inset-x-0 bottom-0 px-1.5 pb-1 text-[10px] text-white font-semibold line-clamp-2 leading-snug z-[1]">
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 box overflow-hidden flex flex-col">
        <div className="box-head shrink-0">
          <h2 className="text-[13px] font-bold flex items-center gap-2">
            <span className="w-1 h-3.5 bg-primary rounded-sm" />
            آخرین اخبار
          </h2>
          <Link href="/archive" className="text-[11px] text-muted-foreground hover:text-primary">
            بیشتر »
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {sideItems.map((a) => (
            <li key={a.id}>
              <Link
                href={`/post/${a.slug}`}
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 group"
              >
                <div className="relative w-11 h-11 shrink-0 overflow-hidden rounded-sm bg-muted">
                  <SafeImage src={a.image} alt={a.title} fill className="object-cover" sizes="44px" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold line-clamp-2 group-hover:text-primary leading-snug block">
                    {a.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {formatViewCount(a.views)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/live"
          className="mt-auto flex items-center justify-center gap-1.5 py-2 text-[12px] font-bold bg-[#243447] text-white hover:opacity-95 shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          پخش زنده اخبار
        </Link>
      </div>
    </section>
  )
}
