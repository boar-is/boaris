'use client'

import { useEditor } from '@tiptap/react'
import { useAtomValue } from 'jotai'
import { atom } from 'jotai/index'
import { useCaptionsAtom } from '~/features/captions-atom-context'
import { PlaybackProgressAtomContext } from '~/features/playback-progress-atom-context'
import { defaultEditorOptions } from '~/lib/prosemirror/default-editor-options'
import { defaultEditorExtensions } from '~/lib/prosemirror/defaultEditorExtensions'
import { StaticEditorContent } from '~/lib/prosemirror/static-editor-content'
import { useConstant } from '~/lib/react/use-constant'
import {
  PostReading,
  PostReadingHeader,
  PostReadingSeparator,
} from './_post-reading'
import { PostScrollingCaptions } from './post-scrolling-captions'
import { PostScrollingLayout } from './post-scrolling-layout'

export function PostScrolling() {
  const playbackProgressAtom = useConstant(() => atom(0))

  return (
    <PlaybackProgressAtomContext.Provider value={playbackProgressAtom}>
      <div className="relative container grid grid-cols-[65ch_auto] gap-16">
        <PostReading>
          <PostReadingHeader />
          <PostReadingSeparator />
          <PostScrollingContent />
        </PostReading>
        <PostScrollingLayout />
      </div>
    </PlaybackProgressAtomContext.Provider>
  )
}

function PostScrollingContent() {
  const { content } = useAtomValue(useCaptionsAtom())

  const extensions = defaultEditorExtensions

  const editor = useEditor(
    {
      ...defaultEditorOptions,
      content,
      extensions,
    },
    [content, extensions],
  )

  return (
    <div>
      <div className="mx-auto typography max-w-prose w-full">
        {editor ? (
          <PostScrollingCaptions editor={editor} />
        ) : (
          <StaticEditorContent content={content} extensions={extensions} />
        )}
      </div>
    </div>
  )
}
