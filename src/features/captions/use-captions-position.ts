import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { Editor } from '@tiptap/react'

export const useCaptionsPosition$ = (
  editor: Editor,
  progress$: Observable<number>,
) =>
  useObservable<number>(() => {
    const size = editor.state.doc.content.size - 1

    return Math.floor(size * progress$.get())
  })
