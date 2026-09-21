import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'حریم خصوصی',
  description: 'سیاست حفظ حریم خصوصی تریبون',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wide">PRIVACY</span>
          </div>
          <h1 className="text-3xl font-black">حریم خصوصی</h1>
        </div>

        <div className="prose-news space-y-6 rounded-2xl border border-border/60 bg-card/50 p-6 md:p-8">
          <section>
            <h2 className="text-lg font-bold mb-2">جمع‌آوری اطلاعات</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              تریبون ممکن است اطلاعات تماس مانند ایمیل عضویت خبرنامه و نظرات کاربران را برای بهبود سرویس ذخیره کند.
              نشان‌گذاری مطالب به‌صورت محلی در مرورگر شما نگه‌داری می‌شود.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2">استفاده از داده‌ها</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              از اطلاعات صرفاً برای ارسال خبرنامه، پاسخ به تماس‌ها و بهبود تجربه کاربری استفاده می‌شود و به اشخاص ثالث فروخته نمی‌شود.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2">کوکی و ذخیره‌سازی محلی</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              برای تم تاریک/روشن، نشان‌ها و تنظیمات نمایش از localStorage مرورگر استفاده می‌شود. می‌توانید این داده‌ها را از تنظیمات مرورگر پاک کنید.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2">تماس</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              برای درخواست حذف داده یا سوالات حریم خصوصی از صفحه تماس با ما استفاده کنید.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
