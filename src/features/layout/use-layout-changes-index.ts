import type { Observable, ObservablePrimitive } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'
import { findClosestIndex } from '~/lib/utils/find-closest-index'

export const useLayoutChangesIndex$ = ({
  changes$,
  progress$,
}: {
  changes$: Observable<Array<LayoutChange>>
  progress$: ObservablePrimitive<number>
}) =>
  useObservable<number | null>(
    () =>
      findClosestIndex(changes$.get(), progress$.get(), (it) => it.at) ?? null,
  )
