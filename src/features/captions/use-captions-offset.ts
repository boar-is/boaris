import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { Editor } from '@tiptap/react'
import { firstNonInlineAncestor } from '~/features/captions/first-non-inline-ancestor'

export const useCaptionsOffset$ = (
  editor: Editor,
  position$: Observable<number>,
) =>
  useObservable<number>(() => {
    const nodeAtPos = editor.view.domAtPos(position$.get()).node

    const ancestor = firstNonInlineAncestor(nodeAtPos)

    return ancestor!.offsetTop * -1
  })
