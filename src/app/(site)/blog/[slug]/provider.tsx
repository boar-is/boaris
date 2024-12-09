'use client'

import type { ResolvedPos } from '@tiptap/pm/model'
import { EditorState, type EditorView } from '@uiw/react-codemirror'
import { Array, Match, Option, Schema, pipe } from 'effect'
import type { NonEmptyReadonlyArray } from 'effect/Array'
import {
  type Atom,
  type PrimitiveAtom,
  atom,
  useSetAtom,
  useStore,
} from 'jotai'
import { animate } from 'motion/react'
import type { FC, PropsWithChildren } from 'react'
import { reversedChanges } from '~/lib/cm/reversed-changes'
import { seekChanges } from '~/lib/cm/seek-changes'
import { findClosestIndex } from '~/lib/collections/find-closest-index'
import { readableDate } from '~/lib/date/readable-date'
import { calculateCenterY } from '~/lib/dom/calculate-center-y'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import type { ImageIconProps } from '~/lib/media/icons/_base'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
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
  anchorIndexAtom: PrimitiveAtom<number | undefined>
  headIndexAtom: Atom<number | undefined>
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
  areasAtom: Atom<string | undefined>
  assetsAtom: Atom<ReadonlyArray<AssetWithState>>
  scrollableEffect: (options: {
    scrollableElement: HTMLElement
    contentElement: HTMLElement
    dispatchPosition: (position: number) => void
    resolvePosition: (position: number) => ResolvedPos
    nodeDom: (position: number) => Node | null
  }) => () => void
  calculateInitialTextEffectValue: (asset: AssetTextWithState) => string
  assetTextEffect: (options: {
    asset: AssetTextWithState
    getView: () => EditorView | undefined
  }) => () => void
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
            anchorIndexAtom: atom<number | undefined>(undefined),
            headIndexAtom: atom((get) =>
              findClosestIndex(
                asset.advances,
                get(progressAtom),
                (it) => it[0],
              ).pipe(Option.getOrUndefined),
            ),
          }),
        ),
        Match.exhaustive,
      ),
    ),
  )

  const areasAtom = useConstAtom((get) =>
    Option.gen(function* () {
      const progress = get(progressAtom)

      const index = yield* findClosestIndex(
        layoutChanges,
        progress,
        (it) => it.offset,
      )

      const change = yield* Array.get(layoutChanges, index)

      return change.areas
    }).pipe(Option.getOrUndefined),
  )

  const assetsAtom = useConstAtom((get) =>
    pipe(get(areasAtom), (areas) =>
      areas ? assets.filter((it) => areas.includes(it._id)) : [],
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
        areasAtom,
        assetsAtom,
        scrollableEffect: ({
          scrollableElement,
          contentElement,
          dispatchPosition,
          resolvePosition,
          nodeDom,
        }) => {
          let oldY: number | undefined

          const animateContent = (y: number) => {
            y = Math.round(y)
            if (oldY === y) {
              return
            }
            animate(
              contentElement,
              { y },
              { ease: 'easeInOut', duration: 0.35 },
            )
            oldY = y
          }

          return store.sub(positionAtom, () => {
            const position = store.get(positionAtom)

            dispatchPosition(position)

            if (position === 0) {
              return void animateContent(0)
            }

            const $pos = resolvePosition(position)

            const depth = findBlockAncestorDepth($pos)
            if (depth === undefined) {
              return
            }

            const blockElement = nodeDom($pos.before(depth))
            if (!(blockElement instanceof HTMLElement)) {
              return
            }

            const top = calculateCenterY(scrollableElement, blockElement)
            animateContent(top)
          })
        },
        calculateInitialTextEffectValue: ({
          initialValue,
          advances,
          reverses,
          headIndexAtom,
        }) => {
          const head = store.get(headIndexAtom)

          const spec = seekChanges({
            currentValue: initialValue,
            initialValue,
            advances,
            reverses,
            anchor: head,
            head: undefined,
          })

          const state = EditorState.create({ doc: initialValue })
          return state.update(spec).newDoc.toString()
        },
        assetTextEffect: ({
          asset: {
            anchorIndexAtom,
            headIndexAtom,
            initialValue,
            advances,
            reverses,
          },
          getView,
        }) =>
          store.sub(headIndexAtom, () => {
            const view = getView()

            if (!view) {
              return
            }

            const anchor = store.get(anchorIndexAtom)
            const head = store.get(headIndexAtom)

            const spec = seekChanges({
              currentValue: view.state.doc,
              initialValue,
              advances,
              reverses,
              anchor,
              head,
            })

            console.log(view.state.doc)
            console.log(spec)
            view.dispatch(spec)

            store.set(anchorIndexAtom, head)
          }),
      }}
    >
      {children}
    </PostPageContext.Provider>
  )
}
