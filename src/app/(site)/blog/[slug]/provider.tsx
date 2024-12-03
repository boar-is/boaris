'use client'

import type { ResolvedPos } from '@tiptap/pm/model'
import { Array, Option, Schema, pipe } from 'effect'
import type { NonEmptyReadonlyArray } from 'effect/Array'
import { useStore } from 'jotai'
import { useSetAtom } from 'jotai/index'
import type { FC, PropsWithChildren } from 'react'
import { readableDate } from '~/lib/date/readable-date'
import { getCenterToScrollElemTo } from '~/lib/dom/get-center-to-scroll-elem-to'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import type { ImageIconProps } from '~/lib/media/icons/_base'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { findBlockAncestorDepth } from '~/lib/pm/find-block-ancestor-depth'
import type { JSONContent } from '~/lib/pm/json-content'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { Post } from '~/model/post'

export type PostPageContextValue = {
  title: string
  lead: string
  posterUrl: string
  date: string
  tags: NonEmptyReadonlyArray<{
    name: string
    Icon: FC<ImageIconProps> | null
  }> | null
  captions: JSONContent
  setDocSize: (value: number) => void
  setProgress: (progress: number) => void
  scrollableEffect: (options: {
    element: Element
    dispatchPosition: (position: number) => void
    resolvePosition: (position: number) => ResolvedPos
    nodeDom: (position: number) => Node | null
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
  const { title, lead, posterUrl, captions, ...post } =
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

  const positionAtom = useConstAtom((get) => {
    const docSize = get(docSizeAtom)
    const progress = get(progressAtom)
    return Math.floor(docSize * progress)
  })

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
      }}
    >
      {children}
    </PostPageContext.Provider>
  )
}
