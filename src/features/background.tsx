'use client'

import { AnimatePresence, type HTMLMotionProps } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { type ImageProps, Image as NextImage } from '~/lib/media/image'
import { motion } from '~/lib/motion/motion'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { cx } from '~/lib/react/cx'

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

export function BackgroundProvider({
  children,
  defaultUrl = '/images/icon-512.png',
}: PropsWithChildren & {
  defaultUrl?: string
}) {
  const [url, setUrl] = useState(defaultUrl)
  const pathname = usePathname()

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

  const rotateProps = {
    transition: {
      duration: 120,
      ease: 'linear',
      repeat: Number.POSITIVE_INFINITY,
    },
    className: 'absolute w-[200%] aspect-square',
  } satisfies HTMLMotionProps<'div'>

  const imageProps = {
    src: url,
    alt: 'Background',
    fill: true,
    className: 'rounded-[50%] blur-[96px] opacity-60',
  } satisfies ImageProps

  return (
    <BackgroundContext.Provider value={value}>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
          key={url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            {...rotateProps}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            className={cx(rotateProps.className, 'top-0 right-0')}
          >
            <NextImage {...imageProps} />
          </motion.div>
          <motion.div
            {...rotateProps}
            initial={{ rotate: 360 }}
            animate={{ rotate: 0 }}
            className={cx(
              rotateProps.className,
              'bottom-0 left-0 mix-blend-luminosity',
            )}
          >
            <NextImage {...imageProps} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {children}
    </BackgroundContext.Provider>
  )
}
