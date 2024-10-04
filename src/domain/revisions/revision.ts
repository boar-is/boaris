import { diffpatcher } from '~/src/lib/diffpatcher'
import type { Delta } from '~/src/shared/delta'
import type { Entity } from '~/src/shared/entity'
import type { LayoutContent } from './layouts/layout-content'
import type { RevisionValue } from './revision-value'

export type Revision = Entity &
  (
    | {
        readonly parentId: null
        readonly value: RevisionValue
      }
    | {
        readonly parentId: Entity['_id']
        readonly valueDelta: Delta
      }
  )

const layout0Content0: LayoutContent = {
  main: null,
  floating: null,
}

const layout0Content1: LayoutContent = {
  main: {
    areas: [['XzuFxjGW7KwJ']],
    columns: [],
    rows: [],
  },
  floating: null,
}

const layout0Content2: LayoutContent = {
  main: {
    areas: [['XzuFxjGW7KwJ'], ['EXS2EWkhvxRp']],
    columns: [],
    rows: [],
  },
  floating: null,
}

const layout0Content3: LayoutContent = {
  main: {
    areas: [
      ['XzuFxjGW7KwJ', 'XzuFxjGW7KwJ'],
      ['EXS2EWkhvxRp', 'yEFL4yBqYkIu'],
    ],
    columns: [],
    rows: [],
  },
  floating: null,
}

export const revisionDocs: Array<Revision> = [
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
          interpolation: null,
        },
      },
      layouts: {
        modes: ['scrolling'],
        value: {
          changes: [
            {
              _id: 'GvsdhtasCVQN',
              at: 0,
              value: {
                type: 'skip',
              },
            },
            {
              _id: 'JvbFc0asCVQN',
              at: 0.15,
              value: {
                type: 'delta',
                contentDelta: diffpatcher.diff(
                  layout0Content0,
                  layout0Content0,
                ),
              },
            },
            {
              _id: '6ENuZgnOYzeq',
              at: 0.25,
              value: {
                type: 'delta',
                contentDelta: diffpatcher.diff(
                  layout0Content0,
                  layout0Content1,
                ),
              },
            },
            {
              _id: '62hdHDSOYyax',
              at: 0.35,
              value: {
                type: 'skip',
              },
            },
            {
              _id: '9GDreK6QnptH',
              at: 0.5,
              value: {
                type: 'delta',
                contentDelta: diffpatcher.diff(
                  layout0Content1,
                  layout0Content2,
                ),
              },
            },
            {
              _id: 'lmVXXyKon3lh',
              at: 0.7,
              value: {
                type: 'delta',
                contentDelta: diffpatcher.diff(
                  layout0Content2,
                  layout0Content3,
                ),
              },
            },
            {
              _id: 'l7Ga9h5Kir4k',
              at: 0.9,
              value: {
                type: 'skip',
              },
            },
          ],
        },
        overrides: [],
      },
      tracks: [
        {
          _id: 'EXS2EWkhvxRp',
          _tag: 'StaticImageTrack',
          name: '.meta/css-snippet.webp',
          value: {
            storageFileId: 'zNCYjhOo5NPl',
            caption: 'Syntax-highlighted code snippet',
            alt: null,
          },
          overrides: [],
        },
        {
          _id: 'XzuFxjGW7KwJ',
          _tag: 'DynamicImageTrack',
          name: '.meta/shadow-palette-initial.mp4',
          value: {
            storageFileId: 'ZxfWHzsajN9w',
            caption: 'Example of the generator',
          },
          overrides: [],
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
            actions: [],
          },
          overrides: [],
        },
      ],
    },
  },
]
