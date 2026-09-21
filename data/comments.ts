import { Comment } from '@/types'

export const comments: Comment[] = [
  {
    id: '1',
    articleId: '1',
    articleSlug: 'majles-vote-budget-1404',
    authorName: 'محمد علوی',
    authorEmail: 'mohammad@example.com',
    content: 'خبر بسیار مفیدی بود. امیدواریم دولت بتواند این بودجه را به درستی اجرا کند.',
    createdAt: '2026-02-20T10:30:00Z',
    approved: true,
  },
  {
    id: '2',
    articleId: '1',
    articleSlug: 'majles-vote-budget-1404',
    authorName: 'سارا رحیمی',
    authorEmail: 'sara@example.com',
    content: 'چرا هیچ صحبتی از بخش آموزش نشد؟ این بخش به توجه بیشتری نیاز دارد.',
    createdAt: '2026-02-20T14:15:00Z',
    approved: true,
  },
  {
    id: '3',
    articleId: '2',
    articleSlug: 'bank-markazi-interest-rate-23',
    authorName: 'رضا کاظمی',
    authorEmail: 'reza@example.com',
    content: 'تحلیل بسیار دقیقی بود. این افزایش نرخ بهره روی بازار مسکن هم اثر می‌گذارد.',
    createdAt: '2026-02-21T09:00:00Z',
    approved: true,
  },
  {
    id: '4',
    articleId: '2',
    articleSlug: 'bank-markazi-interest-rate-23',
    authorName: 'مینا کرمی',
    authorEmail: 'mina@example.com',
    content: 'بالاخره یک تصمیم جدی برای کنترل تورم. باید دید در عمل چه می‌شود.',
    createdAt: '2026-02-21T11:20:00Z',
    approved: true,
  },
  {
    id: '5',
    articleId: '2',
    articleSlug: 'bank-markazi-interest-rate-23',
    authorName: 'حسین نادری',
    authorEmail: 'hosein@example.com',
    content: 'نگران تسهیلات تولید هستم؛ امیدوارم برای بنگاه‌های کوچک تسهیلاتی در نظر بگیرند.',
    createdAt: '2026-02-21T16:45:00Z',
    approved: true,
  },
  {
    id: '6',
    articleId: '3',
    articleSlug: 'earthquake-kermanshah-6-2',
    authorName: 'امیر جعفری',
    authorEmail: 'amir@example.com',
    content: 'خدا به بازماندگان صبر بدهد. امیدواریم کمک‌رسانی سریع انجام شود.',
    createdAt: '2026-02-22T20:00:00Z',
    approved: true,
  },
  {
    id: '7',
    articleId: '3',
    articleSlug: 'earthquake-kermanshah-6-2',
    authorName: 'ناصر موسوی',
    authorEmail: 'naser@example.com',
    content: 'باید زیرساخت‌های مقاوم‌سازی جدی‌تر دنبال شود.',
    createdAt: '2026-02-22T21:30:00Z',
    approved: true,
  },
  {
    id: '8',
    articleId: '4',
    articleSlug: 'persepolis-champion-league',
    authorName: 'دانیال حیدری',
    authorEmail: 'danial@example.com',
    content: 'افتخار می‌کنیم! بازی فوق‌العاده‌ای بود.',
    createdAt: '2026-02-23T11:00:00Z',
    approved: true,
  },
  {
    id: '9',
    articleId: '5',
    articleSlug: 'ai-revolution-iran-tech',
    authorName: 'لیلا احمدی',
    authorEmail: 'leila@example.com',
    content: 'ایران می‌تواند در حوزه هوش مصنوعی پیشرفت‌های بزرگی داشته باشد.',
    createdAt: '2026-02-24T08:00:00Z',
    approved: true,
  },
  {
    id: '10',
    articleId: '5',
    articleSlug: 'ai-revolution-iran-tech',
    authorName: 'پارسا نوری',
    authorEmail: 'parsa@example.com',
    content: 'کاش حمایت از استارتاپ‌های فناوری بیشتر شود.',
    createdAt: '2026-02-24T12:10:00Z',
    approved: true,
  },
]

/** Sample comments shown when an article has few/no specific comments */
export const sampleComments: Comment[] = [
  {
    id: 'sample-1',
    articleId: '0',
    articleSlug: '',
    authorName: 'علی محمدی',
    authorEmail: 'ali@example.com',
    content: 'ممنون از پوشش خبری دقیق. منتظر ادامه گزارش‌ها هستیم.',
    createdAt: '2026-02-25T08:00:00Z',
    approved: true,
  },
  {
    id: 'sample-2',
    articleId: '0',
    articleSlug: '',
    authorName: 'زهرا موسوی',
    authorEmail: 'zahra@example.com',
    content: 'کاش جزئیات بیشتری هم منتشر می‌کردید؛ موضوع خیلی مهم است.',
    createdAt: '2026-02-25T09:30:00Z',
    approved: true,
  },
  {
    id: 'sample-3',
    articleId: '0',
    articleSlug: '',
    authorName: 'کامران شریفی',
    authorEmail: 'kamran@example.com',
    content: 'تحلیل خوبی بود. دیدگاه کارشناسان را هم اضافه کنید.',
    createdAt: '2026-02-25T11:15:00Z',
    approved: true,
  },
]

export function getCommentsForArticle(articleId: string, articleSlug: string): Comment[] {
  const matched = comments.filter(
    (c) =>
      c.approved &&
      (c.articleId === articleId || c.articleSlug === articleSlug)
  )
  if (matched.length >= 2) return matched
  return [...matched, ...sampleComments].slice(0, 4)
}
