'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, FileText, FolderOpen, User, Hash } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import { authors } from '@/data/authors'
import { tags } from '@/data/tags'

export function CommandSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('tariboon:open-search', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('tariboon:open-search', onOpen)
    }
  }, [])

  const go = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  const latest = useMemo(() => articles.slice(0, 8), [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="جستجوی خبر، دسته، نویسنده..." />
      <CommandList>
        <CommandEmpty>نتیجه‌ای پیدا نشد.</CommandEmpty>
        <CommandGroup heading="آخرین اخبار">
          {latest.map((a) => (
            <CommandItem key={a.id} value={`${a.title} ${a.excerpt}`} onSelect={() => go(`/post/${a.slug}`)}>
              <FileText className="ml-2 h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{a.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="دسته‌بندی‌ها">
          {categories.map((c) => (
            <CommandItem key={c.slug} value={c.name} onSelect={() => go(`/category/${c.slug}`)}>
              <FolderOpen className="ml-2 h-4 w-4 shrink-0" />
              {c.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="نویسندگان">
          {authors.map((a) => (
            <CommandItem key={a.slug} value={a.name} onSelect={() => go(`/author/${a.slug}`)}>
              <User className="ml-2 h-4 w-4 shrink-0" />
              {a.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="برچسب‌ها">
          {tags.slice(0, 12).map((t) => (
            <CommandItem key={t.slug} value={t.name} onSelect={() => go(`/tag/${t.slug}`)}>
              <Hash className="ml-2 h-4 w-4 shrink-0" />
              {t.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="صفحات">
          <CommandItem value="جستجو پیشرفته" onSelect={() => go('/search')}>
            <Search className="ml-2 h-4 w-4" />
            صفحه جستجو
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export function openCommandSearch() {
  window.dispatchEvent(new Event('tariboon:open-search'))
}
