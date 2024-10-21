import { type Atom, atom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useConstant } from '~/lib/react/use-constant'
import type { Layout } from '~/model/layout'

export const [LayoutAtomContext, useLayoutAtom] = createStrictContext<
  Atom<typeof Layout.Type>
>({
  name: 'LayoutAtomContext',
})

export function LayoutAtomProvider({
  children,
  layout,
}: PropsWithChildren & {
  layout: typeof Layout.Type
}) {
  return (
    <LayoutAtomContext.Provider value={useConstant(() => atom(layout))}>
      {children}
    </LayoutAtomContext.Provider>
  )
}
