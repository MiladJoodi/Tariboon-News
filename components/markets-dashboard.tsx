'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Activity,
  Coins,
  Bitcoin,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Group = 'currency' | 'gold' | 'crypto'

type RateItem = {
  id: string
  name: string
  short: string
  unit: string
  base: number
  decimals?: number
  group: Group
}

const BASE_RATES: RateItem[] = [
  { id: 'usd', name: 'دلار آمریکا', short: 'USD', unit: 'تومان', base: 91500, group: 'currency' },
  { id: 'eur', name: 'یورو', short: 'EUR', unit: 'تومان', base: 99200, group: 'currency' },
  { id: 'gbp', name: 'پوند انگلیس', short: 'GBP', unit: 'تومان', base: 116800, group: 'currency' },
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

type PriceState = RateItem & {
  price: number
  change: number
  flash: '' | 'up' | 'down'
  history: number[]
}

function formatPrice(n: number, decimals = 0) {
  return n.toLocaleString('fa-IR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })
}

function Sparkline({
  data,
  up,
  id,
  className,
}: {
  data: number[]
  up: boolean
  id: string
  className?: string
}) {
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 120
  const h = 36
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(' ')
  const fillPoints = `0,${h} ${points} ${w},${h}`
  const stroke = up ? '#34d399' : '#f87171'
  const gradId = `spark-${id}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('w-full h-9', className)} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#${gradId})`} />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function useMarketEngine() {
  const [prices, setPrices] = useState<PriceState[]>(() =>
    BASE_RATES.map((r) => ({
      ...r,
      price: r.base,
      change: 0,
      flash: '' as const,
      history: Array.from({ length: 18 }, (_, i) => r.base * (1 + (Math.sin(i) * 0.004))),
    }))
  )
  const [updatedAt, setUpdatedAt] = useState(new Date())
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setPrices((prev) =>
        prev.map((item) => {
          const swing = item.base * (0.0009 + Math.random() * 0.003)
          const dir = Math.random() > 0.47 ? 1 : -1
          const next = Math.max(1, item.price + dir * swing)
          const change = ((next - item.base) / item.base) * 100
          const history = [...item.history.slice(-23), next]
          return {
            ...item,
            price: next,
            change,
            flash: (dir > 0 ? 'up' : 'down') as 'up' | 'down',
            history,
          }
        })
      )
      setUpdatedAt(new Date())
      setTick((t) => t + 1)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return { prices, updatedAt, tick }
}

const TABS: { id: 'all' | Group; label: string; icon: typeof Landmark }[] = [
  { id: 'all', label: 'همه بازار', icon: Activity },
  { id: 'currency', label: 'ارز', icon: Landmark },
  { id: 'gold', label: 'طلا و سکه', icon: Coins },
  { id: 'crypto', label: 'رمزارز', icon: Bitcoin },
]

export function MarketsDashboard() {
  const { prices, updatedAt, tick } = useMarketEngine()
  const [tab, setTab] = useState<'all' | Group>('all')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const filtered = useMemo(
    () => (tab === 'all' ? prices : prices.filter((p) => p.group === tab)),
    [prices, tab]
  )

  const featured = useMemo(
    () =>
      ['usd', 'gold18', 'coin', 'btc']
        .map((id) => prices.find((p) => p.id === id))
        .filter(Boolean) as PriceState[],
    [prices]
  )

  const sorted = useMemo(
    () => [...prices].sort((a, b) => b.change - a.change),
    [prices]
  )
  const gainers = sorted.slice(0, 4)
  const losers = [...sorted].reverse().slice(0, 4)

  const marketBias = useMemo(() => {
    const avg = prices.reduce((s, p) => s + p.change, 0) / prices.length
    return avg
  }, [prices])

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-teal-400/8 blur-3xl" />
      </div>

      <div className="relative space-y-3">
        {/* Hero */}
        <section className="overflow-hidden rounded-lg border border-[#1a2634] bg-[#1b2838] text-white">
          <div className="relative p-4 md:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(52,211,153,0.18),_transparent_45%),radial-gradient(ellipse_at_bottom_left,_rgba(251,191,36,0.14),_transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            <div className="relative flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-400/15 border border-emerald-400/30 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    زنده
                  </span>
                  <span className="text-[11px] text-white/50 tabular-nums">
                    تیک #{tick.toLocaleString('fa-IR')}
                  </span>
                  <span
                    className={cn(
                      'text-[11px] font-bold px-2 py-0.5 rounded-sm',
                      marketBias >= 0
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-red-500/15 text-red-300'
                    )}
                  >
                    جو بازار {marketBias >= 0 ? 'صعودی' : 'نزولی'}{' '}
                    {marketBias >= 0 ? '+' : ''}
                    {marketBias.toFixed(2)}٪
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-2">
                  بازار لحظه‌ای ارز و طلا
                </h1>
                <p className="text-sm text-white/60 max-w-xl leading-relaxed">
                  داشبورد زنده نرخ دلار، یورو، طلا، سکه و رمزارز — قیمت‌ها هر چند ثانیه به‌روز می‌شوند.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 shrink-0">
                <div className="rounded-md bg-white/5 border border-white/10 px-3 py-2.5">
                  <div className="text-[10px] text-white/45 mb-1">ساعت تهران</div>
                  <div className="text-lg font-black tabular-nums tracking-wide">
                    {now.toLocaleTimeString('fa-IR')}
                  </div>
                </div>
                <div className="rounded-md bg-white/5 border border-white/10 px-3 py-2.5">
                  <div className="text-[10px] text-white/45 mb-1 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    آخرین آپدیت
                  </div>
                  <div className="text-lg font-black tabular-nums">
                    {updatedAt.toLocaleTimeString('fa-IR')}
                  </div>
                </div>
                <div className="rounded-md bg-white/5 border border-white/10 px-3 py-2.5 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-white/45 mb-1">نمادهای فعال</div>
                  <div className="text-lg font-black tabular-nums">
                    {prices.length.toLocaleString('fa-IR')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
          {featured.map((p, i) => {
            const accents = [
              'from-emerald-500/20 to-transparent border-emerald-500/25',
              'from-amber-400/20 to-transparent border-amber-400/25',
              'from-yellow-300/15 to-transparent border-yellow-300/20',
              'from-orange-400/20 to-transparent border-orange-400/25',
            ]
            return (
              <div
                key={p.id}
                className={cn(
                  'relative overflow-hidden rounded-lg border bg-[#1e2d3d] text-white p-3.5 transition-colors duration-500',
                  accents[i],
                  p.flash === 'up' && 'ring-1 ring-emerald-400/40',
                  p.flash === 'down' && 'ring-1 ring-red-400/40'
                )}
              >
                <div className={cn('absolute inset-0 bg-gradient-to-bl opacity-80', accents[i])} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-[11px] text-white/50 font-medium">{p.short}</div>
                      <div className="text-[13px] font-bold">{p.name}</div>
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center gap-0.5 text-[11px] font-black tabular-nums px-1.5 py-0.5 rounded-sm',
                        p.change >= 0
                          ? 'bg-emerald-400/15 text-emerald-300'
                          : 'bg-red-400/15 text-red-300'
                      )}
                    >
                      {p.change >= 0 ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      )}
                      {p.change >= 0 ? '+' : ''}
                      {p.change.toFixed(2)}٪
                    </span>
                  </div>
                  <div className="text-2xl md:text-[1.7rem] font-black tabular-nums tracking-tight mb-1">
                    {formatPrice(Math.round(p.price), p.decimals ?? 0)}
                  </div>
                  <div className="text-[10px] text-white/40 mb-2">{p.unit}</div>
                  <Sparkline data={p.history} up={p.change >= 0} id={`feat-${p.id}`} />
                </div>
              </div>
            )
          })}
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-2">
          {/* Main board */}
          <div className="xl:col-span-8 space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#1e2d3d] border border-[#2a3c50]">
              {TABS.map((t) => {
                const Icon = t.icon
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-bold transition-colors cursor-pointer',
                      active
                        ? 'bg-emerald-400 text-[#143024]'
                        : 'text-white/65 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                )
              })}
            </div>

            <div className="overflow-hidden rounded-lg border border-[#2a3c50] bg-[#1b2838]">
              <div className="hidden sm:grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-bold text-white/40 border-b border-white/10">
                <div className="col-span-4">نماد</div>
                <div className="col-span-3 text-left">قیمت</div>
                <div className="col-span-2 text-left">تغییر</div>
                <div className="col-span-3 text-left">نمودار</div>
              </div>
              <ul>
                {filtered.map((p) => (
                  <li
                    key={p.id}
                    className={cn(
                      'grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2 items-center px-3 py-2.5 border-b border-white/5 last:border-0 transition-colors duration-400',
                      p.flash === 'up' && 'bg-emerald-500/10',
                      p.flash === 'down' && 'bg-red-500/10'
                    )}
                  >
                    <div className="sm:col-span-4 flex items-center gap-2.5 min-w-0">
                      <div
                        className={cn(
                          'w-9 h-9 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 border',
                          p.group === 'currency' && 'bg-teal-400/10 border-teal-400/25 text-teal-300',
                          p.group === 'gold' && 'bg-amber-400/10 border-amber-400/25 text-amber-300',
                          p.group === 'crypto' && 'bg-orange-400/10 border-orange-400/25 text-orange-300'
                        )}
                      >
                        {p.short.slice(0, 3)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-bold text-white truncate">{p.name}</div>
                        <div className="text-[10px] text-white/40">{p.unit}</div>
                      </div>
                    </div>
                    <div className="sm:col-span-3 sm:text-left">
                      <div className="text-[15px] font-black tabular-nums text-white">
                        {formatPrice(Math.round(p.price), p.decimals ?? 0)}
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:text-left">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 text-[12px] font-black tabular-nums px-2 py-0.5 rounded-sm',
                          p.change >= 0
                            ? 'bg-emerald-400/15 text-emerald-300'
                            : 'bg-red-400/15 text-red-300'
                        )}
                      >
                        {p.change >= 0 ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        {p.change >= 0 ? '+' : ''}
                        {p.change.toFixed(2)}٪
                      </span>
                    </div>
                    <div className="sm:col-span-3">
                      <Sparkline data={p.history} up={p.change >= 0} id={`row-${p.id}`} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Side panels */}
          <div className="xl:col-span-4 space-y-2">
            <aside className="rounded-lg border border-[#2a3c50] bg-[#1b2838] overflow-hidden">
              <div className="px-3 py-2.5 border-b border-white/10 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h2 className="text-[13px] font-bold text-white">بیشترین رشد</h2>
              </div>
              <ul className="divide-y divide-white/5">
                {gainers.map((p, i) => (
                  <li key={p.id} className="flex items-center gap-2 px-3 py-2.5">
                    <span className="text-emerald-400/70 text-[11px] font-black w-4 tabular-nums">
                      {(i + 1).toLocaleString('fa-IR')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-bold text-white truncate">{p.name}</div>
                      <div className="text-[10px] text-white/40 tabular-nums">
                        {formatPrice(Math.round(p.price), p.decimals ?? 0)}
                      </div>
                    </div>
                    <span className="text-[12px] font-black text-emerald-300 tabular-nums">
                      +{p.change.toFixed(2)}٪
                    </span>
                  </li>
                ))}
              </ul>
            </aside>

            <aside className="rounded-lg border border-[#2a3c50] bg-[#1b2838] overflow-hidden">
              <div className="px-3 py-2.5 border-b border-white/10 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <h2 className="text-[13px] font-bold text-white">بیشترین افت</h2>
              </div>
              <ul className="divide-y divide-white/5">
                {losers.map((p, i) => (
                  <li key={p.id} className="flex items-center gap-2 px-3 py-2.5">
                    <span className="text-red-400/70 text-[11px] font-black w-4 tabular-nums">
                      {(i + 1).toLocaleString('fa-IR')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-bold text-white truncate">{p.name}</div>
                      <div className="text-[10px] text-white/40 tabular-nums">
                        {formatPrice(Math.round(p.price), p.decimals ?? 0)}
                      </div>
                    </div>
                    <span className="text-[12px] font-black text-red-300 tabular-nums">
                      {p.change.toFixed(2)}٪
                    </span>
                  </li>
                ))}
              </ul>
            </aside>

            <aside className="rounded-lg border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-[#1b2838] p-3.5 text-white">
              <div className="text-[11px] font-bold text-amber-300 mb-1">نکته بازار</div>
              <p className="text-[12px] text-white/70 leading-relaxed">
                نرخ‌های این صفحه به‌صورت شبیه‌سازی زنده برای نمایش خبرگزاری به‌روز می‌شوند و مبنای تصمیم مالی نیستند.
              </p>
            </aside>
          </div>
        </div>

        {/* Category cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {(
            [
              { key: 'currency' as const, title: 'بازار ارز', tone: 'teal' },
              { key: 'gold' as const, title: 'طلا و سکه', tone: 'amber' },
              { key: 'crypto' as const, title: 'رمزارز', tone: 'orange' },
            ] as const
          ).map((sec) => {
            const items = prices.filter((p) => p.group === sec.key).slice(0, 4)
            return (
              <div
                key={sec.key}
                className="rounded-lg border border-[#2a3c50] bg-[#1b2838] overflow-hidden"
              >
                <div className="px-3 py-2.5 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-white">{sec.title}</h3>
                  <button
                    type="button"
                    onClick={() => setTab(sec.key)}
                    className="text-[10px] font-bold text-emerald-300 hover:text-emerald-200 cursor-pointer"
                  >
                    فیلتر »
                  </button>
                </div>
                <ul className="divide-y divide-white/5">
                  {items.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-2 px-3 py-2">
                      <span className="text-[12px] font-semibold text-white/85">{p.short}</span>
                      <span className="text-[12px] font-black tabular-nums text-white">
                        {formatPrice(Math.round(p.price), p.decimals ?? 0)}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] font-bold tabular-nums w-14 text-left',
                          p.change >= 0 ? 'text-emerald-300' : 'text-red-300'
                        )}
                      >
                        {p.change >= 0 ? '+' : ''}
                        {p.change.toFixed(2)}٪
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}
