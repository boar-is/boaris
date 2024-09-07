import type { Delta } from '~/lib/diffpatcher'
import type { Doc } from '~/lib/model/docs/_shared'
import type { CaptionsTrack } from '../tracks/captions'
import type { ImageTrack } from '../tracks/image'
import type { TextTrack } from '../tracks/text'
import type { VideoTrack } from '../tracks/video'

export type RevisionValue = {
  tracks: Array<CaptionsTrack | ImageTrack | TextTrack | VideoTrack>
}

export type RevisionDoc = Doc &
  (
    | {
        parentId: null
        value: RevisionValue
      }
    | {
        parentId: RevisionDoc['_id']
        delta: Delta
      }
  )

export const revisionDocs: Array<RevisionDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    parentId: null,
    value: {
      tracks: [
        {
          _id: 'captions1',
          _tag: 'CaptionsTrack',
          value: {
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
        },
        {
          _id: 'image1',
          _tag: 'ImageTrack',
          name: '.meta/css-snippet.webp',
          value: {
            storageId: '5',
          },
        },
        {
          _id: 'video1',
          _tag: 'VideoTrack',
          name: '.meta/shadow-palette-initial.mp4',
          value: {
            storageId: '4',
          },
        },
      ],
    },
  },
]
