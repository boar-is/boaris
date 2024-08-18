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
        doc: JSONContent
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

export class AssetRepository {
  static #data: ReadonlyArray<AssetDoc> = [
    {
      _id: '1',
      type: 'Captions',
      doc: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 0 },
            content: [{ type: 'text', text: 'Introduction' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'A couple years ago, I was teaching React at a local coding bootcamp, and I noticed that there were a handful of things that kept catching students off guard. People kept falling into the same pits!',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "In this tutorial, we're going to explore 9 of the most common gotchas. You'll learn how to steer around them, and hopefully avoid a lot of frustration.",
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "In order to keep this blog post light and breezy, we won't dig ",
              },
              { type: 'text', marks: [{ type: 'italic' }], text: 'too' },
              {
                type: 'text',
                text: ' much into the reasons behind these gotchas. This is more of a quick reference.',
              },
            ],
          },
          {
            type: 'heading',
            attrs: { level: 0 },
            content: [{ type: 'text', text: 'Evaluating with zero' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "Alright, let's start with one of the most pervasive gotchas. I've seen this one “in the wild” on a handful of production apps!",
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Take a look at the following setup:' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Our goal is to conditionally show a shopping list. If we have at least 1 item in the array, we should render a ',
              },
              {
                type: 'text',
                marks: [{ type: 'code' }],
                text: 'ShoppingList',
              },
              {
                type: 'text',
                text: " element. Otherwise, we shouldn't render anything.",
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'And yet, we wind up with a random ' },
              { type: 'text', marks: [{ type: 'code' }], text: '0' },
              { type: 'text', text: ' in the UI!' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'This happens because ' },
              {
                type: 'text',
                marks: [{ type: 'code' }],
                text: 'items.length',
              },
              { type: 'text', text: ' evaluates to ' },
              { type: 'text', marks: [{ type: 'code' }], text: '0' },
              {
                type: 'text',
                text: '. And since 0 is a falsy value in JavaScript, the ',
              },
              { type: 'text', marks: [{ type: 'code' }], text: '&&' },
              {
                type: 'text',
                text: ' operator short-circuits, and the entire expression resolves to ',
              },
              { type: 'text', marks: [{ type: 'code' }], text: '0' },
              { type: 'text', text: '.' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "It's effectively as if we had done this:",
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'textStyle' }],
                text: 'Unlike other falsy values (',
              },
              { type: 'text', marks: [{ type: 'code' }], text: "''" },
              { type: 'text', text: ', ' },
              { type: 'text', marks: [{ type: 'code' }], text: 'null' },
              { type: 'text', text: ', ' },
              { type: 'text', marks: [{ type: 'code' }], text: 'false' },
              {
                type: 'text',
                text: ', etc), the number 0 is a valid value in JSX. After all, there are plenty of scenarios in which we really ',
              },
              { type: 'text', marks: [{ type: 'italic' }], text: 'do' },
              {
                type: 'text',
                text: ' want to print the number ',
              },
              { type: 'text', marks: [{ type: 'code' }], text: '0' },
              { type: 'text', text: '!' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'bold' }],
                text: 'How to fix it:',
              },
              {
                type: 'text',
                text: ' Our expression should use a “pure” boolean value (true/false):',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                marks: [{ type: 'code' }],
                text: 'items.length > 0',
              },
              { type: 'text', text: ' will always evaluate to either ' },
              { type: 'text', marks: [{ type: 'code' }], text: 'true' },
              { type: 'text', text: ' or ' },
              { type: 'text', marks: [{ type: 'code' }], text: 'false' },
              { type: 'text', text: ", and so we'll never have any issues." },
            ],
          },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Alternatively, we can use a ' },
              {
                type: 'text',
                marks: [{ type: 'italic' }],
                text: 'ternary expression',
              },
              { type: 'text', text: ':' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Both options are perfectly valid, and it comes down to personal taste.',
              },
            ],
          },
          {
            type: 'heading',
            attrs: { level: 0 },
            content: [{ type: 'text', text: 'Developing an intuition' }],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "At first glance, a lot of the fixes we've seen in this tutorial seem pretty arbitrary. Why, exactly, do we need to provide a unique key? How come we can't access state after changing it? And why on earth is ",
              },
              { type: 'text', marks: [{ type: 'code' }], text: 'useEffect' },
              { type: 'text', text: ' so dang finicky?!' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'React has always been pretty tricky to become ',
              },
              { type: 'text', marks: [{ type: 'italic' }], text: 'truly' },
              {
                type: 'text',
                text: " comfortable with, and it's especially true nowadays with hooks. It takes a while for everything to ",
              },
              { type: 'text', marks: [{ type: 'italic' }], text: 'click.' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'I started using React back in 2015, and I remember thinking: “This is friggin’ cool, but I have no idea how this works.” 😅',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "Since then, I've been building my mental model of React one puzzle piece at a time. I've had a series of epiphanies, and each time, my mental model has become more sturdy, more robust. I began to understand ",
              },
              { type: 'text', marks: [{ type: 'italic' }], text: 'why' },
              { type: 'text', text: ' React works the way it does.' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "I found I didn't have to keep memorizing arbitrary rules; instead, I could rely on my intuition. It's hard to overstate how much more ",
              },
              { type: 'text', marks: [{ type: 'italic' }], text: 'fun' },
              { type: 'text', text: ' React became for me!' },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "For the past two years, I've been developing an interactive self-paced online course called ",
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: 'https://www.joyofreact.com/',
                    },
                  },
                ],
                text: 'The Joy of React',
              },
              {
                type: 'text',
                text: ". It's a beginner-friendly course with one goal: to help you build your intuition of how React works, so that you can use it to build rich, dynamic web applications.",
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: "My courses aren't like other courses; you won't sit and watch me code for hours and hours. ",
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: 'https://www.joyofreact.com/',
                    },
                  },
                ],
                text: 'The Joy of React',
              },
              {
                type: 'text',
                text: ' mixes lots of different media types: there are videos, sure, but there are also interactive articles, challenging exercises, real-world-inspired projects, and even a mini-game or two.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'You can learn more about the course, and discover the joy of building with React:',
              },
            ],
          },
          {
            type: 'bulletList',
            content: [
              {
                type: 'listItem',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        marks: [
                          {
                            type: 'link',
                            attrs: {
                              href: 'https://www.joyofreact.com/',
                            },
                          },
                        ],
                        text: 'The Joy of React',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      _creationTime: Date.now(),
    },
  ]

  static findMany(ids: ReadonlyArray<AssetDoc['_id']>) {
    return AssetRepository.#data.filter((it) => ids.includes(it._id))
  }
}
