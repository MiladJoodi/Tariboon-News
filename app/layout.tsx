import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "تریبون | اخبار ایران و جهان",
    template: "%s | تریبون",
  },
  description: "تریبون — پایگاه خبری جامع برای آخرین اخبار ایران و جهان با پوشش سیاسی، اقتصادی، ورزشی و فناوری",
  keywords: ["اخبار", "خبر", "ایران", "سیاست", "اقتصاد", "ورزش", "فرهنگ", "تریبون"],
  authors: [{ name: "تریبون" }],
  creator: "تریبون",
  metadataBase: new URL("https://tribune.ir"),
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://tribune.ir",
    siteName: "تریبون",
    title: "تریبون | اخبار ایران و جهان",
    description: "تریبون — پایگاه خبری جامع برای آخرین اخبار ایران و جهان",
  },
  twitter: {
    card: "summary_large_image",
    title: "تریبون | اخبار ایران و جهان",
    description: "تریبون — پایگاه خبری جامع برای آخرین اخبار ایران و جهان",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lalezar&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster position="bottom-left" richColors dir="rtl" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
