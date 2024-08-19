import type { JSONContent } from '@tiptap/react'
import type { Doc } from '~/lib/db/_shared'
import type { StorageDoc } from './storages'

export type ActionBase = {
  atMs: number
}

export type RenameAction = ActionBase & {
  type: 'Rename'
  newName: string
}

export type CodeFileChange = ActionBase & {
  type: 'CodeFileChange'
  from: number
  to?: number | undefined
  insert: string
}

export type AssetDoc = Doc & {
  /**
   * `active` when is shown
   * `hidden` when is not yet created
   * `deleted` when in the trash
   * @default active
   */
  status?: 'active' | 'hidden' | 'deleted' | undefined
} & (
    | {
        type: 'Image/Static'
        name: string
        storageId: StorageDoc['_id']
      }
    | {
        type: 'Image/Dynamic'
        name: string
        storageId: StorageDoc['_id']
      }
    | {
        type: 'Captions'
        content: JSONContent
      }
    | {
        type: 'Track'
        name: string
      }
    | {
        type: 'Clip'
        assetId: AssetDoc['_id']
        trackId: AssetDoc['_id']
        offset: number
        length: number
        range: { from: number; to: number }
        transforms?:
          | {
              progress?:
                | {
                    input: ReadonlyArray<number>
                    output: ReadonlyArray<number>
                  }
                | undefined
            }
          | undefined
      }
    | {
        type: 'CodeFile'
        name: string
        /**
         * Empty string for a newly created file
         * This value does not change during a playback, but can be overridden
         */
        initialValue: string
      }
    | {
        type: 'RecordingGroup'
        name: string
        durationMs: number
      }
    | {
        type: 'CodeFileRecording'
        name: string
        groupId: AssetDoc['_id']
        targetId: AssetDoc['_id']
        initialValue: string
        actions: ReadonlyArray<RenameAction | CodeFileChange>
      }
  )

export const assetDocs: ReadonlyArray<AssetDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    type: 'Captions',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Over the years, React has given us a number of tools for optimizing the performance of our applications. One of the most powerful hidden gems is ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'useDeferredValue',
            },
            {
              type: 'text',
              text: '. It can have a ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'tremendous',
            },
            {
              type: 'text',
              text: ' impact on user experience in certain situations! ⚡',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I recently used this hook to fix a gnarly performance issue on this blog, and it sorta blew my mind. The improvement on low-end devices felt illegal, like black magic.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'useDeferredValue',
            },
            {
              type: 'text',
              text: ' has a bit of an intimidating reputation, and it ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'is',
            },
            {
              type: 'text',
              text: ' a pretty sophisticated tool, but it isn’t too scary with the right mental model. In this tutorial, I’ll show you exactly how it works, and how you can use it to dramatically improve the performance of your applications.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 0,
          },
          content: [
            {
              type: 'text',
              text: 'The problem',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'A couple of years ago, I released ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://www.joshwcomeau.com/shadow-palette/',
                  },
                },
              ],
              text: 'Shadow Palette Generator',
            },
            {
              type: 'text',
              text: ', a tool for generating realistic shadows:',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'By experimenting with sliders and other controls, you can design your own set of shadows. The CSS code is provided for you to copy/paste it into your own application.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'Here’s the problem:',
            },
            {
              type: 'text',
              text: ' the controls in this UI are designed to provide ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'immediate',
            },
            {
              type: 'text',
              text: ' feedback; as the user slides the “Oomph” slider, for example, they see the effect of that change right away. This means that the UI is re-rendered ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'dozens of times a second',
            },
            {
              type: 'text',
              text: ' while one of these inputs is being dragged.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Now, React is fast, and most of this UI is pretty easy to update. The problem is the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'syntax-highlighted code snippet',
            },
            {
              type: 'text',
              text: ' at the bottom:',
            },
          ],
        },
      ],
    },
  },
  {
    _id: '2',
    _creationTime: Date.now(),
    type: 'Image/Dynamic',
    name: 'shadow-palette-initial.mp4',
    storageId: '4',
  },
  {
    _id: '3',
    _creationTime: Date.now(),
    type: 'Image/Static',
    name: 'css-snippet.webp',
    storageId: '5',
  },
  {
    _id: '4',
    _creationTime: Date.now(),
    type: 'Track',
    name: 'Captions Track',
  },
  {
    _id: '5',
    _creationTime: Date.now(),
    type: 'Clip',
    trackId: '4',
    assetId: '1',
    offset: 0,
    length: 1,
    range: {
      from: 0,
      to: 1,
    },
  },
]
