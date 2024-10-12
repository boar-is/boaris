'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { PropsWithChildren } from 'react'
import { createContext } from '~/src/lib/react/create-context'

const mapToContextValue = () => ({})

export const [BlogPostContext, useBlogPostContext] = createContext<
  Observable<BlogPostState>
>({
  name: 'BlogPostContext',
})

export function WorkspaceProjectPostProvider({ children }: PropsWithChildren) {
  const state$ = useObservable<BlogPostState>({
    title: '1',
  })

  return (
    <BlogPostContext.Provider value={state$}>
      {children}
    </BlogPostContext.Provider>
  )
}
