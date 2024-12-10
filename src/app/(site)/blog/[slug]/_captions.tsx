'use client'

import { EditorContent, type Extensions, useEditor } from '@tiptap/react'
import { useSetAtom, useStore } from 'jotai'
import { animate } from 'motion/react'
import { type ReactNode, useEffect } from 'react'
import { calculateCenterY } from '~/lib/dom/calculate-center-y'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { defaultEditorExtensions } from '~/lib/pm/default-editor-extensions'
import { defaultEditorOptions } from '~/lib/pm/default-editor-options'
import { findBlockAncestorDepth } from '~/lib/pm/find-block-ancestor-depth'
import { setHighlightPosition } from '~/lib/pm/position-highlight'
import type { WithRef } from '~/lib/react/with-ref'
import { usePostContent } from './_content'
import { usePostPage } from './provider'

export function PostCaptions({
  className,
  extensions = defaultEditorExtensions,
  loading = null,
}: WithRef<HTMLDivElement> & {
  className?: string | undefined
  extensions?: Extensions | undefined
  loading?: ReactNode | undefined
}) {
  const {
    post: { captions },
  } = usePostPage()
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
      content: captions,
      extensions,
      onCreate: ({ editor }) => setDocSize(editor.state.doc.content.size - 1),
    },
    [captions, extensions],
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
  }, [store, position$, editor, scrollableRef.current, contentRef.current])

  if (!editor) {
    return loading
  }

  return <EditorContent editor={editor} className={className} />
}
