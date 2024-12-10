'use client'

import { Array, Match, Option, pipe } from 'effect'
import { useAtomValue } from 'jotai'
import { AnimatePresence } from 'motion/react'
import dynamic from 'next/dynamic'
import { findClosestIndex } from '~/lib/collections/find-closest-index'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { motion } from '~/lib/motion/motion'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { usePostContent } from './_content'
import { usePostPage } from './provider'

const PostLayoutPanelImageDynamic = dynamic(
  () =>
    import('./_layout-panel-image-dynamic').then(
      (m) => m.PostLayoutPanelImageDynamic,
    ),
  {
    ssr: false,
  },
)

const PostLayoutPanelImageStatic = dynamic(
  () =>
    import('./_layout-panel-image-static').then(
      (m) => m.PostLayoutPanelImageStatic,
    ),
  {
    ssr: false,
  },
)

const PostLayoutPanelText = dynamic(
  () => import('./_layout-panel-text').then((m) => m.PostLayoutPanelText),
  {
    ssr: false,
  },
)

export function PostLayout() {
  const {
    post: { assets, layoutChanges },
  } = usePostPage()
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
      className={cx('grid gap-2', { 'min-h-[40vh]': assets.length })}
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
              '~rounded-xl/2xl after:~rounded-xl/2xl bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md  overflow-hidden',
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
              {Match.value(asset).pipe(
                Match.when({ type: 'image-dynamic' }, (asset) => (
                  <PostLayoutPanelImageDynamic asset={asset} />
                )),
                Match.when({ type: 'image-static' }, (asset) => (
                  <PostLayoutPanelImageStatic asset={asset} />
                )),
                Match.when({ type: 'text' }, (asset) => (
                  <PostLayoutPanelText asset={asset} />
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
