'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { Schema } from 'effect'
import { useSetAtom, useStore } from 'jotai/index'
import { animate } from 'motion/react'
import { use, useEffect } from 'react'
import { usePostContent } from '~/app/(site)/p/[slug]/_page-content'
import { calculateCenterY } from '~/lib/dom/calculate-center-y'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { defaultEditorOptions } from '~/lib/pm/default-editor-options'
import { findBlockAncestorDepth } from '~/lib/pm/find-block-ancestor-depth'
import { setHighlightPosition } from '~/lib/pm/position-highlight'
import { Captions } from '~/model/captions'

export default function PostCaptions({
  captionsEncoded,
  className,
}: {
  captionsEncoded: Promise<typeof Captions.Encoded>
  className?: string | undefined
}) {
  const { content } = Schema.decodeSync(Captions)(use(captionsEncoded))

  const { progress$, scrollableRef, contentRef } = usePostContent()

  const docSize$ = useConstAtom(0)
  const setDocSize = useSetAtom(docSize$)

  const position$ = useConstAtom((get) =>
    Math.floor(get(docSize$) * get(progress$)),
  )

  const store = useStore()

  const editor = useEditor(
    {
      ...defaultEditorOptions,
      content,
      onCreate: ({ editor }) => setDocSize(editor.state.doc.content.size - 1),
    },
    [],
  )

  useEffect(() => {
    const scrollableElement = scrollableRef.current
    const contentElement = contentRef.current

    if (!editor || !scrollableElement || !contentElement) {
      return
    }

    let oldY: number | undefined

    const animateContent = (y: number) => {
      y = Math.round(y)
      if (oldY === y) {
        return
      }
      animate(contentElement, { y }, { ease: 'easeInOut', duration: 0.35 })
      oldY = y
    }

    return store.sub(position$, () => {
      const position = store.get(position$)

      setHighlightPosition(editor, position)

      if (position === 0) {
        return void animateContent(0)
      }

      const docSize = store.get(docSize$)

      if (position === docSize) {
        const scrollableStyle = getComputedStyle(scrollableElement)
        const scrollablePt = Number.parseFloat(scrollableStyle.paddingTop)
        const scrollablePb = Number.parseFloat(scrollableStyle.paddingBottom)
        const top =
          scrollableElement.offsetHeight -
          contentElement.offsetHeight -
          scrollablePt -
          scrollablePb
        return void animateContent(top)
      }

      const $pos = editor.state.doc.resolve(position)

      const depth = findBlockAncestorDepth($pos)
      if (depth === undefined) {
        return
      }

      const blockElement = editor.view.nodeDOM($pos.before(depth))
      if (!(blockElement instanceof HTMLElement)) {
        return
      }

      const top = calculateCenterY(scrollableElement, blockElement)
      animateContent(top)
    })
  }, [
    store,
    position$,
    docSize$,
    editor,
    scrollableRef.current,
    contentRef.current,
  ])

  return <EditorContent editor={editor} className={className} />
}
