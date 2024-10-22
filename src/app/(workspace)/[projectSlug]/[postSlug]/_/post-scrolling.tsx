'use client'

import { useEditor } from '@tiptap/react'
import * as O from 'effect/Option'
import { useAtomValue } from 'jotai'
import { PostScrollingLayout } from '~/app/(workspace)/[projectSlug]/[postSlug]/_/post-scrolling-layout'
import { useCaptionsAtom } from '~/features/captions-atom-context'
import { PlaybackProgressAtomProvider } from '~/features/playback-progress-atom-provider'
import { defaultEditorOptions } from '~/lib/prosemirror/default-editor-options'
import { defaultEditorExtensions } from '~/lib/prosemirror/defaultEditorExtensions'
import { StaticEditorContent } from '~/lib/prosemirror/static-editor-content'
import {
  PostReading,
  PostReadingHeader,
  PostReadingSeparator,
} from './post-reading'
import { PostScrollingCaptions } from './post-scrolling-captions'

export function PostScrolling() {
  return (
    <PostReading>
      <PostReadingHeader />
      <PostReadingSeparator />
      <PlaybackProgressAtomProvider>
        <PostScrollingContent />
      </PlaybackProgressAtomProvider>
    </PostReading>
  )
}

function PostScrollingContent() {
  const { content, interpolation } = useAtomValue(useCaptionsAtom()).pipe(
    // TODO implement post without captions
    O.getOrThrow,
  )

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
          <PostScrollingCaptions
            editor={editor}
            interpolation={interpolation}
          />
        ) : (
          <StaticEditorContent content={content} extensions={extensions} />
        )}
      </div>
      <PostScrollingLayout />
    </div>
  )
}
