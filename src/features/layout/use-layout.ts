import type { Observable, ObservablePrimitive } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { Layout } from '~/convex/values/revisions/layouts/layout'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'

export const useLayout$ = ({
  layoutChanges$,
  index$,
}: {
  layoutChanges$: Observable<Array<LayoutChange>>
  index$: ObservablePrimitive<number>
}) => useObservable<Layout>(() => layoutChanges$.get()[index$.get()]?.value!)
