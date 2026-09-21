'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function SafeImage({ src, alt, fill, width, height, className, priority, sizes }: SafeImageProps) {
  const [failed, setFailed] = useState(false)
  const fallback = `https://picsum.photos/seed/${encodeURIComponent(alt.slice(0, 24) || 'news')}/1200/675`

  return (
    <Image
      src={failed ? fallback : src || fallback}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={cn(className)}
      priority={priority}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  )
}
