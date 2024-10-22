'use client'

import { useEditor } from '@tiptap/react'
import * as O from 'effect/Option'
import { useAtomValue } from 'jotai'
import { atom } from 'jotai/index'
import { PostScrollingLayout } from '~/app/(workspace)/[projectSlug]/[postSlug]/_/post-scrolling-layout'
import { useCaptionsAtom } from '~/features/captions-atom-context'
import { PlaybackProgressAtomContext } from '~/features/playback-progress-atom-provider'
import { defaultEditorOptions } from '~/lib/prosemirror/default-editor-options'
import { defaultEditorExtensions } from '~/lib/prosemirror/defaultEditorExtensions'
import { StaticEditorContent } from '~/lib/prosemirror/static-editor-content'
import { useConstant } from '~/lib/react/use-constant'
import {
  PostReading,
  PostReadingHeader,
  PostReadingSeparator,
} from './post-reading'
import { PostScrollingCaptions } from './post-scrolling-captions'

export function PostScrolling() {
  const playbackProgressAtom = useConstant(() => atom(0))

  return (
    <PostReading>
      <PostReadingHeader />
      <PostReadingSeparator />
      <PlaybackProgressAtomContext.Provider value={playbackProgressAtom}>
        <PostScrollingContent />
      </PlaybackProgressAtomContext.Provider>
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
