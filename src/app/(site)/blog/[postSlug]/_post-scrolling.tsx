'use client'

import { useEditor } from '@tiptap/react'
import { atom } from 'jotai/index'
import { usePostVmAtomValue } from '~/app/(site)/blog/[postSlug]/page.client'
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
import { PostScrollingCaptions } from './_post-scrolling-captions'
import { PostScrollingLayout } from './_post-scrolling-layout'

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
  const captions = usePostVmAtomValue((it) => it.captions)

  const extensions = defaultEditorExtensions

  const editor = useEditor(
    {
      ...defaultEditorOptions,
      content: captions,
      extensions,
    },
    [captions, extensions],
  )

  return (
    <div>
      <div className="mx-auto typography max-w-prose w-full">
        {editor ? (
          <PostScrollingCaptions editor={editor} />
        ) : (
          <StaticEditorContent content={captions} extensions={extensions} />
        )}
      </div>
    </div>
  )
}
