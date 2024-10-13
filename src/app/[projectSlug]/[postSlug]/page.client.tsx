'use client'

import { observer } from '@legendapp/state/react'
import { useResizeObserver } from '@react-aria/utils'
import { type JSONContent, useEditor } from '@tiptap/react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { extensions } from '~/src/lib/tiptap/extensions'
import { TextEditor } from '~/src/primitives/text-editor'
import { useWorkspaceProjectPostContext } from './context'

export const WorkspaceProjectClientPage = observer(
  function WorkspaceProjectClientPage() {
    const state$ = useWorkspaceProjectPostContext()

    const scrollableRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({ target: scrollableRef })
    useMotionValueEvent(scrollYProgress, 'change', (progress) =>
      state$.scrollYProgress.set(progress ?? 0),
    )
    useResizeObserver({
      ref: scrollableRef,
      onResize: () => window.scrollTo({ top: window.scrollY + 1 }),
    })

    const { width } = useWindowSize({
      debounceDelay: 250,
    })
    useEffect(() => state$.windowWidth.set(width), [state$, width])

    const content: JSONContent | null = state$.captions.value.get() ?? null

    const editor = useEditor(
      {
        editable: false,
        extensions,
        content,
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
      },
      [content],
    )

    return (
      <>
        <section className="typography max-w-prose w-full">
          <TextEditor
            editor={editor}
            content={content}
            extensions={extensions}
          />
        </section>
      </>
    )
  },
)
