import type { ObservablePrimitive } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { Editor } from '@tiptap/react'

export const useCaptionsPosition$ = (
  editor: Editor,
  progress$: ObservablePrimitive<number>,
) =>
  useObservable(() => {
    const size = editor.state.doc.content.size - 1

    return Math.floor(size * progress$.get())
  })
