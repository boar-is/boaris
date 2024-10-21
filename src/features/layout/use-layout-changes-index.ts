import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'
import { findClosestIndex } from '~/lib/utils/find-closest-index'

export const useLayoutChangesAtomIndex = ({
  changes$,
  progress$,
}: {
  changes$: Observable<Array<LayoutChange>>
  progress$: Observable<number>
}) =>
  useObservable<number>(
    () => findClosestIndex(changes$.get(), progress$.get(), (it) => it.at)!,
  )
