'use client'

import Link from 'next/link'
import { Article } from '@/types'
import { SafeImage } from '@/components/safe-image'

interface GalleryMarqueeProps {
  items: Article[]
}

export function GalleryMarquee({ items }: GalleryMarqueeProps) {
  const row = [...items, ...items]

  return (
    <div className="box overflow-hidden">
      <div className="box-head">
        <h2 className="text-[13px] font-bold flex items-center gap-2">
          <span className="w-1 h-3.5 bg-primary rounded-sm" />
          گالری خبری
        </h2>
      </div>
      <div className="overflow-hidden py-1.5 bg-muted/20">
        <div className="gallery-marquee-track px-1">
          {row.map((a, i) => (
            <Link
              key={`${a.id}-${i}`}
              href={`/post/${a.slug}`}
              className="relative w-40 h-24 shrink-0 overflow-hidden rounded-sm group"
            >
              <SafeImage
                src={a.image}
                alt={a.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="160px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <p className="absolute bottom-0 p-1.5 text-[10px] text-white font-bold line-clamp-2 leading-snug">
                {a.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
