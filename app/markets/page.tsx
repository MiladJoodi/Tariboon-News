import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MarketsDashboard } from '@/components/markets-dashboard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'بازار لحظه‌ای ارز و طلا',
  description: 'نرخ زنده دلار، یورو، طلا، سکه و رمزارزها در تریبون',
}

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-[#121a24]">
      <Header />
      <main className="container mx-auto px-3 py-3 pb-8">
        <MarketsDashboard />
      </main>
      <Footer />
    </div>
  )
}
