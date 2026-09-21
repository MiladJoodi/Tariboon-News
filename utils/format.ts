export function formatPersianDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatPersianDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fa-IR', {
    month: 'short',
    day: 'numeric',
  })
}

export function formatPersianNumber(n: number): string {
  return n.toLocaleString('fa-IR')
}

export function formatViewCount(n: number): string {
  if (n >= 1000000) {
    return `${(n / 1000000).toLocaleString('fa-IR', { maximumFractionDigits: 1 })} میلیون`
  }
  if (n >= 1000) {
    return `${(n / 1000).toLocaleString('fa-IR', { maximumFractionDigits: 1 })} هزار`
  }
  return n.toLocaleString('fa-IR')
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const text = content.replace(/<[^>]*>/g, '')
  const wordCount = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]/g, '')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'لحظاتی پیش'
  if (minutes < 60) return `${minutes} دقیقه پیش`
  if (hours < 24) return `${hours} ساعت پیش`
  if (days < 7) return `${days} روز پیش`
  return formatPersianDate(dateStr)
}
