import { type Delta, diffpatcher } from '~/lib/diffpatcher'
import type { Doc } from '~/lib/model/docs/_shared'
import type { ImageTrack } from '~/lib/model/revision/image.track'
import type { Layout, LayoutContent } from '~/lib/model/revision/layout'
import type { TextTrack } from '~/lib/model/revision/text.track'
import type { VideoTrack } from '~/lib/model/revision/video.track'
import type { Captions } from '../revision/captions'

export type RevisionValue = {
  captions?: Captions | undefined
  layout?: Layout | undefined
  tracks: Array<ImageTrack | TextTrack | VideoTrack>
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

const layout0Content0: LayoutContent = {}

const layout0Content1: LayoutContent = {
  main: {
    _id: 'XHdqcRDmgbn2',
    _tag: 'LayoutGroup',
    direction: 'v',
    content: [
      {
        _id: '0T14UvWe58jR',
        _tag: 'LayoutItem',
        content: {
          trackId: 'XzuFxjGW7KwJ',
        },
      },
    ],
  },
}

const layout0Content2: LayoutContent = {
  main: {
    _id: 'Z_080stKzpTm',
    _tag: 'LayoutGroup',
    direction: 'v',
    content: [
      {
        _id: 'v7aAgNlWO5Ui',
        _tag: 'LayoutItem',
        content: {
          trackId: 'EXS2EWkhvxRp',
        },
      },
    ],
  },
}

const layout0Content3: LayoutContent = {
  main: {
    _id: 'Z_080stKzpTm',
    _tag: 'LayoutGroup',
    direction: 'v',
    content: [
      {
        _id: 'v7aAgNlWO5Ui',
        _tag: 'LayoutItem',
        content: {
          trackId: 'EXS2EWkhvxRp',
        },
      },
      {
        _id: 'f9aBVeQftslQ',
        _tag: 'LayoutItem',
        content: {
          trackId: 'yEFL4yBqYkIu',
        },
      },
    ],
  },
}

export const revisionDocs: Array<RevisionDoc> = [
  {
    _id: 'CazXWqJz7tmF',
    _creationTime: Date.now(),
    parentId: null,
    value: {
      captions: {
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
      layout: {
        primary: {
          modes: ['scrolling'],
          value: {
            changes: [
              {
                _id: 'JvbFc0asCVQN',
                atMs: 0,
                delta: diffpatcher.diff(layout0Content0, layout0Content0),
              },
              {
                _id: '6ENuZgnOYzeq',
                atMs: 10000,
                delta: diffpatcher.diff(layout0Content0, layout0Content1),
              },
              {
                _id: '9GDreK6QnptH',
                atMs: 15000,
                delta: diffpatcher.diff(layout0Content1, layout0Content2),
              },
              {
                _id: 'lmVXXyKon3lh',
                atMs: 20000,
                delta: diffpatcher.diff(layout0Content2, layout0Content3),
              },
            ],
          },
        },
      },
      tracks: [
        {
          _id: 'EXS2EWkhvxRp',
          _tag: 'ImageTrack',
          name: '.meta/css-snippet.webp',
          value: {
            storageId: '5',
          },
        },
        {
          _id: 'XzuFxjGW7KwJ',
          _tag: 'VideoTrack',
          name: '.meta/shadow-palette-initial.mp4',
          value: {
            storageId: '4',
          },
        },
        {
          _id: 'yEFL4yBqYkIu',
          _tag: 'TextTrack',
          name: 'app.jsx',
          value: {
            content: [
              'function App() {',
              '  const [count, setCount] = React.useState(0);',
              '',
              '  return (',
              '    <>',
              '      <ImportantStuff count={count} />',
              '      <SlowStuff count={count} />',
              '',
              '      <button onClick={() => setCount(count + 1)}>',
              '        Increment',
              '      </button>',
              '    </>',
            ],
          },
        },
      ],
    },
  },
]
