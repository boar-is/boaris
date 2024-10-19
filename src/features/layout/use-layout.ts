import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { Layout } from '~/convex/values/revisions/layouts/layout'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'

export const useLayout$ = ({
  changes$,
  index$,
}: {
  changes$: Observable<Array<LayoutChange>>
  index$: Observable<number>
}) => useObservable<Layout>(() => changes$.get()[index$.get()]?.value!)
