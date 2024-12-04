'use client'

import type { ResolvedPos } from '@tiptap/pm/model'
import { Array, Match, Option, Schema, pipe } from 'effect'
import type { NonEmptyReadonlyArray } from 'effect/Array'
import { type Atom, atom, useSetAtom, useStore } from 'jotai'
import type { FC, PropsWithChildren } from 'react'
import { reversedChanges } from '~/lib/cm/reversed-changes'
import { findClosestIndex } from '~/lib/collections/find-closest-index'
import { readableDate } from '~/lib/date/readable-date'
import { getCenterToScrollElemTo } from '~/lib/dom/get-center-to-scroll-elem-to'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import type { ImageIconProps } from '~/lib/media/icons/_base'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { betweenExclusive } from '~/lib/number/betweenExclusive'
import { findBlockAncestorDepth } from '~/lib/pm/find-block-ancestor-depth'
import type { JsonContentFromJson } from '~/lib/pm/json-content'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useConst } from '~/lib/react/use-const'
import type { Asset } from '~/model/asset'
import type { AssetImageDynamic } from '~/model/assetImageDynamic'
import type { AssetImageStatic } from '~/model/assetImageStatic'
import type { AssetText } from '~/model/assetText'
import { Post } from '~/model/post'

export type AssetImageDynamicWithState = typeof AssetImageDynamic.Type
export type AssetImageStaticWithState = typeof AssetImageStatic.Type
export type AssetTextWithState = typeof AssetText.Type & {
  reverses: AssetTextWithState['advances']
  headIndexAtom: Atom<number>
  anchorIndexAtom: Atom<number>
}
export type AssetWithState =
  | AssetImageDynamicWithState
  | AssetImageStaticWithState
  | AssetTextWithState

export type PostPageContextValue = {
  title: string
  lead: string
  posterUrl: string
  date: string
  tags: NonEmptyReadonlyArray<{
    name: string
    Icon: FC<ImageIconProps> | null
  }> | null
  captions: typeof JsonContentFromJson.Type
  setDocSize: (value: number) => void
  setProgress: (progress: number) => void
  scrollableEffect: (options: {
    element: Element
    dispatchPosition: (position: number) => void
    resolvePosition: (position: number) => ResolvedPos
    nodeDom: (position: number) => Node | null
  }) => () => void
  assetsAtom: Atom<ReadonlyArray<AssetWithState>>
}

export const [PostPageContext, usePostPage] =
  createStrictContext<PostPageContextValue>({
    name: 'PostPageContext',
  })

export function PostPageProvider({
  children,
  postEncoded,
}: PropsWithChildren<{
  postEncoded: typeof Post.Encoded
}>) {
  const { title, lead, posterUrl, captions, layoutChanges, ...post } =
    Schema.decodeSync(Post)(postEncoded)

  const date = readableDate(post.date)

  const tags = pipe(
    post.tags,
    Option.some,
    Option.filter(Array.isNonEmptyReadonlyArray),
    Option.andThen(
      Array.map((tag) => ({
        name: tag,
        Icon: matchTagIcon(tag),
      })),
    ),
    Option.getOrNull,
  )

  const docSizeAtom = useConstAtom(0)

  const progressAtom = useConstAtom(0)

  const positionAtom = useConstAtom((get) =>
    Math.floor(get(docSizeAtom) * get(progressAtom)),
  )

  const layoutAreasAtom = useConstAtom((get) =>
    Option.gen(function* () {
      const progress = get(progressAtom)

      if (!betweenExclusive(progress, 0, 1)) {
        return yield* Option.none()
      }

      const index = yield* findClosestIndex(
        layoutChanges,
        progress,
        (it) => it.offset,
      )

      const change = yield* Array.get(layoutChanges, index)

      return change.areas
    }),
  )

  const assets = useConst(() =>
    post.assets.map(
      Match.type<typeof Asset.Type>().pipe(
        Match.when({ type: 'image-dynamic' }, (it) => it),
        Match.when({ type: 'image-static' }, (it) => it),
        Match.when(
          { type: 'text' },
          (asset): AssetTextWithState => ({
            ...asset,
            reverses: reversedChanges(asset.initialValue, asset.advances),
            anchorIndexAtom: atom(0),
            headIndexAtom: atom(0),
          }),
        ),
        Match.exhaustive,
      ),
    ),
  )

  const layoutAssetsAtom = useConstAtom((get) =>
    pipe(
      get(layoutAreasAtom),
      Option.andThen((areas) => assets.filter((it) => areas.includes(it._id))),
      Option.getOrElse((): typeof assets => []),
    ),
  )

  const store = useStore()

  return (
    <PostPageContext.Provider
      value={{
        title,
        lead,
        posterUrl,
        date,
        tags,
        captions,
        setDocSize: useSetAtom(docSizeAtom),
        setProgress: useSetAtom(progressAtom),
        scrollableEffect: ({
          element,
          dispatchPosition,
          resolvePosition,
          nodeDom,
        }) =>
          store.sub(positionAtom, () => {
            const position = store.get(positionAtom)

            dispatchPosition(position)

            if (position === 0) {
              return element.scrollTo({ top: 0, behavior: 'smooth' })
            }

            const $pos = resolvePosition(position)

            const depth = findBlockAncestorDepth($pos)
            if (depth === undefined) {
              return
            }

            const blockElement = nodeDom($pos.before(depth))
            if (!(blockElement instanceof Element)) {
              return
            }

            element.scrollTo({
              top: getCenterToScrollElemTo(element, blockElement),
              behavior: 'smooth',
            })
          }),
        assetsAtom: layoutAssetsAtom,
      }}
    >
      {children}
    </PostPageContext.Provider>
  )
}
