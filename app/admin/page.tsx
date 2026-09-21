'use client'

import { useAdminStore } from '@/store/admin-store'
import Link from 'next/link'
import {
  FileText, Users, FolderOpen, MessageSquare, Eye, AlertCircle, Plus, ArrowUpLeft
} from 'lucide-react'
import { formatPersianDate, formatViewCount } from '@/utils/format'
import { SafeImage } from '@/components/safe-image'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

export default function AdminDashboard() {
  const { articles, authors, categories, comments } = useAdminStore()

  const published = articles.filter((a) => a.status === 'published')
  const drafts = articles.filter((a) => a.status === 'draft')
  const pending = comments.filter((c) => !c.approved)
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0)

  const stats = [
    { icon: FileText, label: 'منتشرشده', value: published.length, color: '#2563eb', href: '/admin/articles' },
    { icon: AlertCircle, label: 'پیش‌نویس', value: drafts.length, color: '#ca8a04', href: '/admin/articles' },
    { icon: MessageSquare, label: 'نظرات منتظر', value: pending.length, color: '#c8102e', href: '/admin/comments' },
    { icon: Eye, label: 'کل بازدید', value: formatViewCount(totalViews), color: '#0891b2', href: '/trending' },
    { icon: Users, label: 'نویسندگان', value: authors.length, color: '#16a34a', href: '/admin/authors' },
    { icon: FolderOpen, label: 'دسته‌ها', value: categories.length, color: '#7c3aed', href: '/admin/categories' },
  ]

  const chartData = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 6)
    .map((a) => ({
      name: a.title.slice(0, 14) + '…',
      views: a.views,
    }))

  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6)

  const recentComments = [...comments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-foreground">داشبورد تحریریه</h1>
          <p className="text-sm text-muted-foreground mt-1">وضعیت لحظه‌ای محتوا و تعامل مخاطبان</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-1.5 h-9 px-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 cursor-pointer rounded-md"
          >
            <Plus className="w-4 h-4" />
            مطلب جدید
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 h-9 px-3 border border-border text-sm hover:bg-accent cursor-pointer rounded-md"
          >
            <ArrowUpLeft className="w-4 h-4" />
            مشاهده سایت
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="box p-3.5 hover:border-primary/40 transition-colors cursor-pointer"
          >
            <div
              className="w-9 h-9 flex items-center justify-center mb-2.5"
              style={{ backgroundColor: stat.color + '18' }}
            >
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <div className="text-xl font-black text-foreground tabular-nums">{stat.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 box p-4">
          <h2 className="font-bold text-sm mb-4 flex items-center gap-2">
            <span className="w-1 h-3.5 bg-primary rounded-sm" />
            بازدید برترین مطالب
          </h2>
          <div className="h-56" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="views" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 box overflow-hidden">
          <div className="box-head">
            <h2 className="font-bold text-[13px]">نظرات اخیر</h2>
            <Link href="/admin/comments" className="text-[11px] text-primary hover:underline cursor-pointer">
              مدیریت
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentComments.map((comment) => (
              <div key={comment.id} className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{comment.authorName}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 ${
                      comment.approved
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}
                  >
                    {comment.approved ? 'تایید' : 'انتظار'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="box overflow-hidden">
        <div className="box-head">
          <h2 className="font-bold text-[13px]">آخرین مقالات</h2>
          <Link href="/admin/articles" className="text-[11px] text-primary hover:underline cursor-pointer">
            همه مقالات
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentArticles.map((article) => (
            <div key={article.id} className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent/30">
              <div className="relative w-14 h-11 shrink-0 overflow-hidden rounded-sm bg-muted">
                <SafeImage src={article.image} alt={article.title} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  className="text-sm font-medium hover:text-primary line-clamp-1 cursor-pointer"
                >
                  {article.title}
                </Link>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                  <span>{article.author.name}</span>
                  <span>·</span>
                  <span>{formatPersianDate(article.publishedAt)}</span>
                  <span>·</span>
                  <span>{article.category}</span>
                </div>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 shrink-0 ${
                  article.status === 'published'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {article.status === 'published' ? 'منتشر' : 'پیش‌نویس'}
              </span>
              <span className="text-xs text-muted-foreground tabular-nums w-12 text-left shrink-0">
                {formatViewCount(article.views)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
