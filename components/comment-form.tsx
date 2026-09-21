'use client'

import { toast } from 'sonner'

export function CommentForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('نظر شما ثبت شد و پس از بررسی نمایش داده می‌شود.')
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <input
          type="text"
          required
          placeholder="نام شما"
          className="border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="email"
          placeholder="ایمیل (اختیاری)"
          className="border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          dir="ltr"
        />
      </div>
      <textarea
        required
        placeholder="نظر خود را بنویسید..."
        rows={3}
        className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
      >
        ارسال دیدگاه
      </button>
    </form>
  )
}
