'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('لطفاً تمام فیلدهای ضروری را پر کنید')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('پیام شما با موفقیت ارسال شد. به زودی پاسخ خواهیم داد.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-black text-foreground mb-3">تماس با ما</h1>
            <p className="text-muted-foreground">برای ارتباط با تریبون از روش‌های زیر استفاده کنید</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: Mail, title: 'ایمیل', value: 'miladjoodi@gmail.com', href: 'mailto:miladjoodi@gmail.com' },
                { icon: Github, title: 'گیت‌هاب پروژه', value: 'MiladJoodi/Tariboon-News', href: 'https://github.com/MiladJoodi/Tariboon-News' },
                { icon: Linkedin, title: 'لینکدین', value: 'linkedin.com/in/joodi', href: 'https://www.linkedin.com/in/joodi/' },
              ].map((item) => (
                <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-2xl p-4 flex gap-3 hover:border-primary transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground mb-0.5">{item.title}</div>
                    <div className="text-sm text-muted-foreground" dir="ltr">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-bold mb-5">ارسال پیام</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">نام *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="نام شما"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">ایمیل *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">موضوع</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="موضوع پیام"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">پیام *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="پیام خود را بنویسید..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-[#b91c1c] transition-colors disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'در حال ارسال...' : 'ارسال پیام'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
