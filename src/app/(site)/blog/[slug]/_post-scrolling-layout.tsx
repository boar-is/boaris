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
      className={cx('grid gap-2 *:h-full', className)}
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
            className="bg-accent-3"
            style={{ gridArea: asset._id }}
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(16px)' }}
          >
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
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

const AssetImageDynamicView = memo(function AssetImageDynamicView({
  asset,
}: { asset: AssetImageDynamicWithState }) {
  return <motion.div layout>AssetImageDynamicView: {asset._id}</motion.div>
})

const AssetImageStaticView = memo(function AssetImageStaticView({
  asset,
}: { asset: AssetImageStaticWithState }) {
  return <motion.div layout>AssetImageStaticView: {asset._id}</motion.div>
})

const AssetTextView = memo(function AssetTextView({
  asset,
}: { asset: AssetTextWithState }) {
  return <motion.div layout>AssetTextView: {asset._id}</motion.div>
})
