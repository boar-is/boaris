import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { Interpolation } from '~/convex/values/_shared/interpolation'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'
import { layoutProgressInterpolationFromChanges } from './layout-progress-interpolation-from-changes'

export const useLayoutProgressInterpolation = (
  layoutChanges$: Observable<Array<LayoutChange>>,
) =>
  useObservable<Interpolation>(() =>
    layoutProgressInterpolationFromChanges(layoutChanges$.get(true)),
  )
