import { type Delta, diffpatcher } from '~/lib/diffpatcher'
import type { LayoutContent, LayoutValue } from '~/lib/model/revision/layout'
import { ensureDefined } from './ensure'

export const patchLayoutContent = (
  content: LayoutContent,
  value: LayoutValue,
  anchorIndex: number,
  headIndex: number,
) => {
  let contentCopy = diffpatcher.clone(content) as LayoutContent

  const patch = (
    index: number,
    fn: (left: unknown, delta: Delta) => unknown,
  ) => {
    const change = ensureDefined(value.changes[index])
    if (change.value.type !== 'delta') {
      return contentCopy
    }
    return fn(
      contentCopy,
      diffpatcher.clone(change.value.delta) as Delta,
    ) as LayoutContent
  }

  if (anchorIndex < headIndex) {
    const fn = (left: unknown, delta: Delta) => diffpatcher.patch(left, delta)
    for (let i = anchorIndex + 1; i <= headIndex; i++) {
      contentCopy = patch(i, fn)
    }
  } else {
    const fn = (left: unknown, delta: Delta) => diffpatcher.unpatch(left, delta)
    for (let i = anchorIndex; i > headIndex; i--) {
      contentCopy = patch(i, fn)
    }
  }

  return contentCopy
}
