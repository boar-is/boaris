'use client'

import { Array, Match, Option, Schema, pipe } from 'effect'
import { useAtomValue } from 'jotai/index'
import { AnimatePresence } from 'motion/react'
import { use } from 'react'
import { usePostContent } from '~/app/(site)/p/[slug]/_page-content'
import { findClosestIndex } from '~/lib/collections/find-closest-index'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { motion } from '~/lib/motion/motion'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { Asset } from '~/model/asset'
import { LayoutChange } from '~/model/layoutChange'
import { PostLayoutPanelImageDynamic } from './_layout-panel-image-dynamic'
import { PostLayoutPanelImageStatic } from './_layout-panel-image-static'
import { PostLayoutPanelText } from './_layout-panel-text'

export function PostLayout({
  assetsEncoded,
  layoutChangesEncoded,
}: {
  assetsEncoded: Promise<ReadonlyArray<typeof Asset.Encoded>>
  layoutChangesEncoded: Promise<ReadonlyArray<typeof LayoutChange.Encoded>>
}) {
  const assets = Schema.decodeSync(Schema.Array(Asset))(use(assetsEncoded))
  const layoutChanges = Schema.decodeSync(Schema.Array(LayoutChange))(
    use(layoutChangesEncoded),
  )

  const { progress$ } = usePostContent()

  const areas$ = useConstAtom((get) =>
    Option.gen(function* () {
      const progress = get(progress$)

      const index = yield* findClosestIndex(
        layoutChanges,
        progress,
        (it) => it.offset,
      )

      const change = yield* Array.get(layoutChanges, index)

      return change.areas
    }).pipe(Option.getOrUndefined),
  )

  const areasAssets$ = useConstAtom((get) =>
    pipe(get(areas$), (areas) =>
      areas ? assets.filter((it) => areas.includes(it._id)) : [],
    ),
  )

  const gridTemplateAreas = useAtomValue(areas$)
  const areasAssets = useAtomValue(areasAssets$)

  return (
    <ul
      className={cx('grid gap-2 h-full', {
        'min-h-[40vh]': areasAssets.length,
      })}
      style={{
        gridTemplateAreas,
        gridAutoColumns: 'minmax(0, 1fr)',
        gridAutoRows: 'minmax(0, 1fr)',
      }}
    >
      <AnimatePresence mode="popLayout">
        {areasAssets.map((asset) => (
          <motion.li
            key={asset._id}
            className={cx(
              shadowInsetStyles,
              '~rounded-xl/2xl after:~rounded-xl/2xl bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md overflow-hidden',
            )}
            style={{ gridArea: asset._id }}
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(16px)' }}
            layout
          >
            <motion.article
              layout="position"
              className="relative flex flex-col justify-between h-full"
            >
              {Match.value(asset.content).pipe(
                Match.tag('AssetContentImageDynamic', (content) => (
                  <PostLayoutPanelImageDynamic
                    name={asset.name}
                    content={content}
                  />
                )),
                Match.tag('AssetContentImageStatic', (content) => (
                  <PostLayoutPanelImageStatic
                    name={asset.name}
                    content={content}
                  />
                )),
                Match.tag('AssetContentText', (content) => (
                  <PostLayoutPanelText name={asset.name} content={content} />
                )),
                Match.exhaustive,
              )}
            </motion.article>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
