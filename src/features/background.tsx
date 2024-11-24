'use client'

import { AnimatePresence, useScroll, useTransform } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { Image as NextImage } from '~/lib/media/image'
import { motion } from '~/lib/motion/motion'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type BackgroundContextValue = {
  setBackgroundUrl: (url?: string) => void
}

export const [BackgroundContext, useBackgroundContext] =
  createStrictContext<BackgroundContextValue>({
    name: 'BackgroundContext',
  })

export const useBackgroundEffect = (url: string) => {
  const { setBackgroundUrl } = useBackgroundContext()

  useEffect(() => {
    setBackgroundUrl(url)
  }, [setBackgroundUrl, url])
}

const MotionImage = motion.create(NextImage)

export function BackgroundProvider({
  children,
  defaultUrl = '/images/icon-512.png',
}: PropsWithChildren & {
  defaultUrl?: string
}) {
  const [url, setUrl] = useState(defaultUrl)
  const pathname = usePathname()
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  const value: BackgroundContextValue = useMemo(
    () => ({
      setBackgroundUrl: (bgUrl = defaultUrl) => {
        const image = new Image()
        image.src = bgUrl
        image.onload = () => void setUrl(bgUrl)
      },
    }),
    [defaultUrl],
  )

  useEffect(() => {
    setUrl(pathname && defaultUrl)
  }, [pathname, defaultUrl])

  return (
    <BackgroundContext.Provider value={value}>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <AnimatePresence>
          <MotionImage
            key={url}
            src={url}
            alt="Background"
            fill
            style={{
              // @ts-expect-error @see https://github.com/motiondivision/motion/issues/2887
              y,
            }}
            initial={{ opacity: 0, rotate: 0, scale: 2 }}
            animate={{ opacity: 1, rotate: 360, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
              rotate: {
                duration: 120,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
              },
            }}
            className="absolute size-[200%] -top-1/2 -left-1/2 blur-[72px]"
          />
        </AnimatePresence>
      </div>
      {children}
    </BackgroundContext.Provider>
  )
}
