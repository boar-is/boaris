'use client'

import { Match } from 'effect'
import { useAtomValue } from 'jotai'
import { AnimatePresence } from 'motion/react'
import { type ComponentPropsWithoutRef, memo } from 'react'
import {
  type AssetImageDynamicWithState,
  type AssetImageStaticWithState,
  type AssetTextWithState,
  usePostPage,
} from '~/app/(site)/blog/[slug]/provider'
import { motion } from '~/lib/motion/motion'

export function PostScrollingLayout({
  ...props
}: ComponentPropsWithoutRef<'ul' & {}>) {
  const assets = useAtomValue(usePostPage().assetsAtom)

  return (
    <ul {...props}>
      <AnimatePresence>
        {assets.map((asset) => (
          <motion.li key={asset._id}>
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
  return <div>AssetImageDynamicView: {asset._id}</div>
})

const AssetImageStaticView = memo(function AssetImageStaticView({
  asset,
}: { asset: AssetImageStaticWithState }) {
  return <div>AssetImageStaticView: {asset._id}</div>
})

const AssetTextView = memo(function AssetTextView({
  asset,
}: { asset: AssetTextWithState }) {
  return <div>AssetTextView: {asset._id}</div>
})

// 'use client'
//
// import { mergeProps } from '@react-aria/utils'
// import { Array, Option, flow } from 'effect'
// import { type Atom, atom, useAtomValue } from 'jotai'
// import { splitAtom } from 'jotai/utils'
// import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
// import { usePostVmAtom } from '~/app/(site)/blog/[slug]/provider'
// import { usePlaybackProgressAtom } from '~/features/playback-progress-atom-context'
// import { findClosestIndex } from '~/lib/collections/find-closest-index'
// import { applyAtom } from '~/lib/jotai/apply-atom'
// import { useConstAtom } from '~/lib/jotai/use-const-atom'
// import { betweenExclusive } from '~/lib/number/betweenExclusive'
// import { cx } from '~/lib/react/cx'
// import { useConst } from '~/lib/react/use-const'
//
// export function PostScrollingLayout({
//   ...props
// }: ComponentPropsWithoutRef<'div'> & {}) {
//   const progressAtom = usePlaybackProgressAtom()
//
//   const changesAtom = usePostVmAtom((it) => it.layoutChanges)
//
//   const indexAtom = useConstAtom((get) =>
//     Option.fromNullable(
//       findClosestIndex(get(changesAtom), get(progressAtom), (it) => it.offset),
//     ),
//   )
//
//   const areasAtom = useConstAtom((get) =>
//     get(indexAtom).pipe(
//       Option.andThen((index) => Array.get(get(changesAtom), index)),
//       Option.andThen((it) => it.areas),
//     ),
//   )
//
//   const assetsAtom = usePostVmAtom((it) => it.assets)
//
//   const inProgressAtom = useConstAtom(
//     flow(applyAtom(progressAtom), betweenExclusive(0, 1)),
//   )
//
//   const currentAssetsAtoms = useAtomValue(
//     useConst(() =>
//       splitAtom(
//         atom((get) =>
//           get(areasAtom).pipe(
//             Option.andThen((areas) =>
//               get(inProgressAtom)
//                 ? get(assetsAtom).filter((it) => areas.includes(it._id))
//                 : [],
//             ),
//             Option.getOrElse(() => []),
//           ),
//         ),
//       ),
//     ),
//   )
//
//   return <div {...props}>layout</div>
// }
//
// function LayoutGrid({
//   areasAtom,
//   className,
//   ...props
// }: ComponentPropsWithoutRef<'ul'> & {
//   areasAtom: Atom<Option.Option<CSSProperties['gridTemplateAreas']>>
// }) {
//   const gridTemplateAreas = useAtomValue(areasAtom)
//
//   return (
//     <ul
//       {...mergeProps(props, {
//         className: cx('grid gap-2 *:h-full', className),
//         style: {
//           gridTemplateAreas,
//         },
//       })}
//     />
//   )
// }
