'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function NewsletterForm({
  compact = false,
  variant = 'dark',
  showDescription = true,
}: {
  compact?: boolean
  variant?: 'dark' | 'light'
  showDescription?: boolean
}) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const dark = variant === 'dark'

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      toast.error('ایمیل معتبر وارد کنید')
      return
    }
    const list = JSON.parse(localStorage.getItem('tariboon-newsletter') || '[]') as string[]
    if (!list.includes(email.trim())) {
      list.push(email.trim())
      localStorage.setItem('tariboon-newsletter', JSON.stringify(list))
    }
    setDone(true)
    setEmail('')
    toast.success('عضویت خبرنامه ثبت شد')
  }

  if (done) {
    return (
      <div className={cn('flex items-center gap-2 text-sm', dark ? 'text-emerald-300' : 'text-emerald-600')}>
        <Check className="h-4 w-4" />
        با موفقیت عضو شدید
      </div>
    )
  }

  return (
    <form onSubmit={submit} className={compact ? 'flex gap-2' : 'space-y-3'}>
      {!compact && showDescription && (
        <p className={cn('text-sm leading-relaxed', dark ? 'text-white/75' : 'text-muted-foreground')}>
          خلاصه مهم‌ترین اخبار هر روز صبح در ایمیل شما.
        </p>
      )}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4',
              dark ? 'text-slate-500' : 'text-muted-foreground'
            )}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل شما"
            className={cn(
              'w-full rounded-md border pr-10 pl-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40',
              dark
                ? 'bg-white text-slate-800 border-white/20 placeholder:text-slate-400'
                : 'bg-background text-foreground border-border placeholder:text-muted-foreground'
            )}
            dir="ltr"
          />
        </div>
        <Button
          type="submit"
          className={cn(
            'rounded-md shrink-0 cursor-pointer',
            dark ? 'bg-primary text-white hover:bg-primary/90' : 'bg-primary text-primary-foreground'
          )}
        >
          عضویت
        </Button>
      </div>
    </form>
  )
}
