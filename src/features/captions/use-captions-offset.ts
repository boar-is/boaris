import { type Observable, observe } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { Editor } from '@tiptap/react'
import { firstNonInlineAncestor } from '~/features/captions/first-non-inline-ancestor'

export const useCaptionsOffset$ = (
  editor: Editor,
  position$: Observable<number>,
) => {
  const offsetTop$ = useObservable<number | undefined>(() => {
    const { node, offset } = editor.view.domAtPos(position$.get())

    if (!offset) {
      return undefined
    }

    const ancestor = firstNonInlineAncestor(node)

    if (
      (node as HTMLElement).classList?.contains('ProseMirror') ||
      ancestor!.classList?.contains('ProseMirror')
    ) {
      return undefined
    }

    return ancestor!.offsetTop * -1
  })

  const offset$ = useObservable(0)
  observe(() => offset$.set((prev) => offsetTop$.get() ?? prev))

  return offset$
}
