'use client'

import { Match } from 'effect'
import { useAtomValue } from 'jotai'
import { AnimatePresence } from 'motion/react'
import { memo } from 'react'
import {
  type AssetImageDynamicWithState,
  type AssetImageStaticWithState,
  type AssetTextWithState,
  usePostPage,
} from '~/app/(site)/blog/[slug]/provider'
import { motion } from '~/lib/motion/motion'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'

export function PostScrollingLayout({
  className,
}: {
  className?: string | undefined
}) {
  const { areasAtom, assetsAtom } = usePostPage()

  const gridTemplateAreas = useAtomValue(areasAtom)
  const assets = useAtomValue(assetsAtom)

  return (
    <ul
      className={cx('grid gap-2', { 'min-h-[25vh]': assets.length }, className)}
      style={{
        gridTemplateAreas,
        gridAutoColumns: 'minmax(0, 1fr)',
        gridAutoRows: 'minmax(0, 1fr)',
      }}
    >
      <AnimatePresence mode="popLayout">
        {assets.map((asset) => (
          <motion.li
            key={asset._id}
            layout
            className={cx(
              shadowInsetStyles,
              'bg-accent-1/90 ~rounded-2xl/3xl after:~rounded-2xl/3xl bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md',
            )}
            style={{ gridArea: asset._id }}
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(16px)' }}
          >
            <motion.div layout>
              {Match.value(asset).pipe(
                Match.when({ type: 'image-dynamic' }, (asset) => (
                  <AssetImageDynamicView asset={asset} />
                )),
                Match.when({ type: 'image-static' }, (asset) => (
                  <AssetImageStaticView asset={asset} />
                )),
                Match.when({ type: 'text' }, (asset) => (
                  <AssetTextView asset={asset} />
                )),
                Match.exhaustive,
              )}
            </motion.div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

const AssetImageDynamicView = memo(function AssetImageDynamicView({
  asset,
}: { asset: AssetImageDynamicWithState }) {
  return <p>AssetImageDynamicView: {asset._id}</p>
})

const AssetImageStaticView = memo(function AssetImageStaticView({
  asset,
}: { asset: AssetImageStaticWithState }) {
  return <p>AssetImageStaticView: {asset._id}</p>
})

const AssetTextView = memo(function AssetTextView({
  asset,
}: { asset: AssetTextWithState }) {
  return <p>AssetTextView: {asset._id}</p>
})
