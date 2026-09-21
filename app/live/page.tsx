import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LiveNewsFeed } from '@/components/live-news-feed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'پخش زنده اخبار',
  description: 'پخش زنده جدیدترین اخبار — به‌روزرسانی خودکار',
}

export default function LivePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 py-3 max-w-4xl">
        <LiveNewsFeed />
      </main>
      <Footer />
    </div>
  )
}
