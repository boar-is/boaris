import type { ObservablePrimitive } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { Editor } from '@tiptap/react'
import { firstNonInlineAncestor } from '~/features/captions/first-non-inline-ancestor'

export const useCaptionsCursorOffset$ = (
  editor: Editor,
  position$: ObservablePrimitive<number>,
) =>
  useObservable(() => {
    const nodeAtPos = editor.view.domAtPos(position$.get()).node

    const ancestor = firstNonInlineAncestor(nodeAtPos)

    return ancestor?.offsetTop
  })
