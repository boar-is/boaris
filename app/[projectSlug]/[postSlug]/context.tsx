'use client'

import type { Observable, OpaqueObject } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { JSONContent } from '@tiptap/react'
import type { PropsWithChildren } from 'react'
import { createContext } from '~/src/lib/context'
import type { LayoutValue } from '~/src/lib/model/revision/layout'

export type BlogPostState = {
  title: string
  description: string
  lead?: string | undefined
  thumbnailSrc?: string | undefined
  captions?:
    | {
        content: OpaqueObject<JSONContent>
        mapping: {
          input: Array<number>
          output: Array<number>
        }
      }
    | undefined
  layouts?:
    | {
        primaryValue: LayoutValue
      }
    | undefined
}

export const [BlogPostContext, useBlogPostContext] = createContext<
  Observable<BlogPostState>
>({
  name: 'BlogPostContext',
})

export function BlogPostProvider({ children }: PropsWithChildren) {
  const state$ = useObservable<BlogPostState>({
    title: '1',
  })

  return (
    <BlogPostContext.Provider value={state$}>
      {children}
    </BlogPostContext.Provider>
  )
}
