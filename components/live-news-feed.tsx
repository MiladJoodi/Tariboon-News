'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Film, Radio, RefreshCw } from 'lucide-react'
import { articles } from '@/data/articles'
import { cn } from '@/lib/utils'

const SOURCES = [
  'همشهری آنلاین',
  'افکار نیوز',
  'اکوایران',
  'ایسنا',
  'تسنیم',
  'فارس',
  'مهر',
  'ایرنا',
  'خبرگزاری تریبون',
  'اقتصادنیوز',
]

type LiveItem = {
  id: string
  title: string
  slug: string
  source: string
  minutesAgo: number
  hasFilm: boolean
  category: string
}

function buildFeed(seed: number): LiveItem[] {
  const pool = [...articles]
  // rotate based on seed so refresh feels live
  const offset = seed % pool.length
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)]
  return rotated.slice(0, 28).map((a, i) => ({
    id: `${a.id}-${seed}-${i}`,
    title: a.title,
    slug: a.slug,
    source: SOURCES[(i + seed) % SOURCES.length],
    minutesAgo: Math.max(1, (i * 2 + (seed % 5) + 1) % 48),
    hasFilm: (i + seed) % 4 === 0,
    category: a.category,
  }))
}

function formatMinutesAgo(m: number) {
  if (m < 1) return 'لحظاتی پیش'
  return `${m.toLocaleString('fa-IR')} دقیقه پیش`
}

export function LiveNewsFeed() {
  const [tick, setTick] = useState(0)
  const [now, setNow] = useState(() => new Date())
  const feed = useMemo(() => buildFeed(tick), [tick])

  useEffect(() => {
    const refresh = setInterval(() => {
      setTick((t) => t + 1)
      setNow(new Date())
    }, 18000)
    const clock = setInterval(() => setNow(new Date()), 1000)
    return () => {
      clearInterval(refresh)
      clearInterval(clock)
    }
  }, [])

  return (
    <div className="space-y-3">
      <div className="box overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 bg-[#243447] text-white">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <div>
              <h1 className="text-sm md:text-base font-black leading-none">پخش زنده جدیدترین اخبار</h1>
              <p className="text-[10px] text-white/55 mt-1">
                این صفحه به‌صورت خودکار به‌روزرسانی می‌شود
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/70">
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              {now.toLocaleTimeString('fa-IR')}
            </span>
            <button
              type="button"
              onClick={() => {
                setTick((t) => t + 1)
                setNow(new Date())
              }}
              className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 cursor-pointer"
            >
              بروزرسانی
            </button>
          </div>
        </div>

        <ul className="divide-y divide-border">
          {feed.map((item, i) => (
            <li key={item.id}>
              <Link
                href={`/post/${item.slug}`}
                className={cn(
                  'flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-3 py-2.5 hover:bg-accent/40 group',
                  i === 0 && 'bg-primary/[0.03]'
                )}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[13px] font-bold text-foreground group-hover:text-primary leading-snug">
                      {item.title}
                    </span>
                    {item.hasFilm && (
                      <span className="chip bg-primary/10 text-primary shrink-0 gap-0.5 mt-0.5">
                        <Film className="w-3 h-3" />
                        فیلم
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground shrink-0 sm:min-w-[200px] sm:justify-end">
                  <span className="tabular-nums">{formatMinutesAgo(item.minutesAgo)}</span>
                  <span className="text-border">|</span>
                  <span className="font-medium text-foreground/70">{item.source}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
        <Radio className="w-3.5 h-3.5 text-primary" />
        جریان خبری تریبون — اتصال زنده به سرویس‌های خبری
      </p>
    </div>
  )
}
