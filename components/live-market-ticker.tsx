'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TrendingDown, TrendingUp, Activity, RefreshCw, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

type RateItem = {
  id: string
  name: string
  short: string
  unit: string
  base: number
  decimals?: number
  group: 'currency' | 'gold' | 'crypto'
}

const BASE_RATES: RateItem[] = [
  { id: 'usd', name: 'دلار آمریکا', short: 'USD', unit: 'تومان', base: 91500, group: 'currency' },
  { id: 'eur', name: 'یورو', short: 'EUR', unit: 'تومان', base: 99200, group: 'currency' },
  { id: 'gbp', name: 'پوند', short: 'GBP', unit: 'تومان', base: 116800, group: 'currency' },
  { id: 'try', name: 'لیر ترکیه', short: 'TRY', unit: 'تومان', base: 2680, group: 'currency' },
  { id: 'aed', name: 'درهم امارات', short: 'AED', unit: 'تومان', base: 24920, group: 'currency' },
  { id: 'cny', name: 'یوان چین', short: 'CNY', unit: 'تومان', base: 12640, group: 'currency' },
  { id: 'gold18', name: 'طلای ۱۸ عیار', short: 'طلا ۱۸', unit: 'تومان', base: 6850000, group: 'gold' },
  { id: 'gold24', name: 'طلای ۲۴ عیار', short: 'طلا ۲۴', unit: 'تومان', base: 9130000, group: 'gold' },
  { id: 'coin', name: 'سکه امامی', short: 'سکه', unit: 'تومان', base: 68500000, group: 'gold' },
  { id: 'half', name: 'نیم‌سکه', short: 'نیم', unit: 'تومان', base: 37200000, group: 'gold' },
  { id: 'quarter', name: 'ربع‌سکه', short: 'ربع', unit: 'تومان', base: 21500000, group: 'gold' },
  { id: 'gram', name: 'سکه گرمی', short: 'گرمی', unit: 'تومان', base: 11800000, group: 'gold' },
  { id: 'btc', name: 'بیت‌کوین', short: 'BTC', unit: 'دلار', base: 84200, decimals: 0, group: 'crypto' },
  { id: 'eth', name: 'اتریوم', short: 'ETH', unit: 'دلار', base: 3180, decimals: 0, group: 'crypto' },
  { id: 'usdt', name: 'تتر', short: 'USDT', unit: 'تومان', base: 91200, group: 'crypto' },
]

function formatPrice(n: number, decimals = 0) {
  return n.toLocaleString('fa-IR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })
}

type PriceState = RateItem & { price: number; change: number; flash: '' | 'up' | 'down' }

function useLivePrices(intervalMs = 2800) {
  const [prices, setPrices] = useState<PriceState[]>(() =>
    BASE_RATES.map((r) => ({ ...r, price: r.base, change: 0, flash: '' as const }))
  )
  const [updatedAt, setUpdatedAt] = useState(new Date())

  useEffect(() => {
    const tick = () => {
      setPrices((prev) =>
        prev.map((item) => {
          const swing = item.base * (0.0008 + Math.random() * 0.0025)
          const dir = Math.random() > 0.48 ? 1 : -1
          const next = Math.max(1, item.price + dir * swing)
          const change = ((next - item.base) / item.base) * 100
          return {
            ...item,
            price: next,
            change,
            flash: (dir > 0 ? 'up' : 'down') as 'up' | 'down',
          }
        })
      )
      setUpdatedAt(new Date())
    }
    const id = setInterval(tick, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return { prices, updatedAt }
}

export function LiveMarketBoard({ filter }: { filter?: RateItem['group'] }) {
  const { prices, updatedAt } = useLivePrices()
  const list = filter ? prices.filter((p) => p.group === filter) : prices

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="w-3.5 h-3.5" />
          آخرین بروزرسانی: {updatedAt.toLocaleTimeString('fa-IR')}
        </div>
        <span className="chip bg-teal/15 text-teal gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal" />
          </span>
          زنده
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((p) => (
          <div
            key={p.id}
            className={cn(
              'rounded-md border border-border bg-card p-3.5 transition-colors duration-500',
              p.flash === 'up' && 'bg-emerald-500/8 border-emerald-500/25',
              p.flash === 'down' && 'bg-red-500/8 border-red-500/25'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{p.name}</span>
              {p.change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className="text-2xl font-black tabular-nums text-foreground mb-1">
              {formatPrice(Math.round(p.price), p.decimals ?? 0)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{p.unit}</span>
              <span
                className={cn(
                  'text-xs font-bold tabular-nums rounded-full px-2 py-0.5',
                  p.change >= 0 ? 'bg-emerald-500/15 text-emerald-600' : 'bg-red-500/15 text-red-600'
                )}
              >
                {p.change >= 0 ? '+' : ''}
                {p.change.toFixed(2)}٪
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Compact scrolling strip for header top */
export function MarketTopStrip() {
  const { prices } = useLivePrices(3200)
  const strip = prices.filter((p) => ['usd', 'eur', 'gold18', 'coin', 'btc', 'usdt'].includes(p.id))
  const loop = [...strip, ...strip]

  return (
    <Link
      href="/markets"
      className="flex items-center gap-2 min-w-0 flex-1 hover:opacity-95 group"
      title="بازار لحظه‌ای ارز و طلا"
    >
      <span className="hidden sm:inline-flex items-center gap-1.5 shrink-0 text-[11px] font-bold text-emerald-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        بازار لحظه‌ای
      </span>
      <div className="marquee-container flex-1 min-w-0">
        <div className="marquee-content text-[11px]">
          {loop.map((p, i) => (
            <span key={`${p.id}-${i}`} className="inline-flex items-center gap-1.5 mx-2.5">
              <span className="text-white/55">{p.short}</span>
              <span className="font-bold tabular-nums text-white">
                {formatPrice(Math.round(p.price), p.decimals ?? 0)}
              </span>
              <span
                className={cn(
                  'tabular-nums text-[10px] font-bold',
                  p.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                )}
              >
                {p.change >= 0 ? '▲' : '▼'}
                {Math.abs(p.change).toFixed(1)}٪
              </span>
              <span className="text-white/25">|</span>
            </span>
          ))}
        </div>
      </div>
      <span className="shrink-0 text-[10px] font-bold text-amber-300 group-hover:text-amber-200 hidden md:inline">
        جزئیات »
      </span>
    </Link>
  )
}

/** Compact teaser card for home — links to /markets */
export function MarketTeaser() {
  const { prices, updatedAt } = useLivePrices(2600)
  const spotlight = prices.filter((p) =>
    ['usd', 'eur', 'aed', 'gold18', 'coin', 'usdt'].includes(p.id)
  )

  return (
    <Link
      href="/markets"
      className="block overflow-hidden rounded-md border border-[#1a2634] bg-[#243447] text-white shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="relative px-3 pt-3 pb-2">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(45,212,191,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(251,191,36,0.12),_transparent_50%)] pointer-events-none" />
        <div className="relative flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <h3 className="font-black text-[13px] tracking-tight">بازار لحظه‌ای ارز و طلا</h3>
            </div>
            <p className="text-[10px] text-white/50">
              بروزرسانی {updatedAt.toLocaleTimeString('fa-IR')}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#243447] bg-amber-300 px-2 py-1 rounded-sm shrink-0 group-hover:bg-amber-200 transition-colors">
            <Activity className="w-3 h-3" />
            صفحه بازار
            <ArrowLeft className="w-3 h-3" />
          </span>
        </div>

        <div className="relative grid grid-cols-2 gap-1.5">
          {spotlight.map((p) => (
            <div
              key={p.id}
              className={cn(
                'rounded-md border border-white/10 bg-white/5 px-2 py-2 transition-colors duration-400',
                p.flash === 'up' && 'bg-emerald-500/20 border-emerald-400/30',
                p.flash === 'down' && 'bg-red-500/15 border-red-400/25'
              )}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] text-white/60 font-medium">{p.short}</span>
                {p.change >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400 shrink-0" />
                )}
              </div>
              <div className="text-[13px] font-black tabular-nums leading-none mb-1">
                {formatPrice(Math.round(p.price), p.decimals ?? 0)}
              </div>
              <div
                className={cn(
                  'text-[10px] font-bold tabular-nums',
                  p.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                )}
              >
                {p.change >= 0 ? '+' : ''}
                {p.change.toFixed(2)}٪
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-1.5 bg-black/25 border-t border-white/10 text-[10px]">
        <span className="text-white/45">ارز · طلا · رمزارز</span>
        <span className="font-bold text-teal-300 group-hover:text-teal-200">مشاهده همه نرخ‌ها »</span>
      </div>
    </Link>
  )
}
