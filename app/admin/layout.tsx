'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, FolderOpen, Tag, Users, MessageSquare, Settings, ChevronLeft, ExternalLink, RotateCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { useAdminStore } from '@/store/admin-store'
import { toast } from 'sonner'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'داشبورد' },
  { href: '/admin/articles', icon: FileText, label: 'مقالات' },
  { href: '/admin/categories', icon: FolderOpen, label: 'دسته‌بندی‌ها' },
  { href: '/admin/tags', icon: Tag, label: 'برچسب‌ها' },
  { href: '/admin/authors', icon: Users, label: 'نویسندگان' },
  { href: '/admin/comments', icon: MessageSquare, label: 'نظرات' },
  { href: '/admin/settings', icon: Settings, label: 'تنظیمات' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const resetToSeed = useAdminStore((s) => s.resetToSeed)

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      <aside
        className={cn(
          'bg-[#243447] text-white flex flex-col transition-all duration-200 shrink-0 border-l border-white/5',
          sidebarOpen ? 'w-56' : 'w-14'
        )}
      >
        <div className="h-12 flex items-center gap-2 px-3 border-b border-white/10">
          <div className="w-8 h-8 brand-mark rounded-md flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">ت</span>
          </div>
          {sidebarOpen && (
            <div className="leading-none">
              <span className="font-black text-base block">تریبون</span>
              <span className="text-[9px] text-white/45">پنل مدیریت</span>
            </div>
          )}
        </div>

        <nav className="flex-1 py-2 space-y-0.5 px-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-[#b7c2d0] hover:text-white hover:bg-white/10'
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="px-2 pb-3 space-y-1">
          {sidebarOpen && (
            <button
              type="button"
              onClick={() => {
                resetToSeed()
                toast.success('داده‌ها به حالت اولیه بازگشت')
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-[#b7c2d0] hover:text-white hover:bg-white/10 transition-colors text-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              بازنشانی داده
            </button>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-md text-[#b7c2d0] hover:text-white hover:bg-white/10 transition-colors text-sm cursor-pointer"
          >
            <ChevronLeft className={cn('w-4 h-4 transition-transform', !sidebarOpen && 'rotate-180')} />
            {sidebarOpen && 'بستن'}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="text-[13px] font-bold text-foreground flex items-center gap-2">
            <span className="w-1 h-3.5 bg-primary rounded-sm" />
            پنل مدیریت تریبون
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              مشاهده سایت
            </Link>
            <div className="w-7 h-7 brand-mark rounded-md flex items-center justify-center text-white text-xs font-bold">
              م
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-5">{children}</main>
      </div>

      <Toaster position="bottom-left" richColors dir="rtl" />
    </div>
  )
}
