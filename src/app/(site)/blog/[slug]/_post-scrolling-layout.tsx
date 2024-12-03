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
