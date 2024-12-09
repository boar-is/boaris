import { ChangeSet, EditorSelection, Text } from '@uiw/react-codemirror'
import { DateTime, Option, Schema } from 'effect'
import { JsonContentFromJson } from '~/lib/pm/json-content'
import { AssetImageStatic } from '~/model/assetImageStatic'
import { Asset } from './asset'
import { AssetImageDynamic } from './assetImageDynamic'
import { AssetText } from './assetText'
import { LayoutChange } from './layoutChange'

export class Post extends Schema.Class<Post>('Post')({
  slug: Schema.NonEmptyTrimmedString,
  title: Schema.NonEmptyTrimmedString,
  lead: Schema.NonEmptyTrimmedString,
  description: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  posterUrl: Schema.NonEmptyTrimmedString,
  tags: Schema.Array(Schema.NonEmptyTrimmedString),
  captions: JsonContentFromJson,
  layoutChanges: Schema.Array(LayoutChange),
  assets: Schema.Array(Asset),
  date: Schema.DateTimeUtcFromNumber,
  updateDate: Schema.DateTimeUtcFromNumber,
}) {}

const createPost = (
  slug = 'use-deferred-value',
  posterUrl = '/assets/use-deferred-value/poster.webp',
) =>
  new Post({
    slug,
    title: 'Understanding React Server Components',
    lead: 'useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I’ll show you how! ⚡',
    description: Option.none(),
    posterUrl,
    tags: ['TypeScript', 'React'],
    captions: {
      content: [
        {
          content: [
            {
              text: 'Over the years, React has given us a number of tools for optimizing the performance of our applications. One of the most powerful hidden gems is ',
              type: 'text',
            },
            {
              marks: [{ type: 'code' }],
              text: 'useDeferredValue',
              type: 'text',
            },
            { text: '. It can have a ', type: 'text' },
            {
              marks: [{ type: 'italic' }],
              text: 'tremendous',
              type: 'text',
            },
            {
              text: ' impact on user experience in certain situations! ⚡',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'I recently used this hook to fix a gnarly performance issue on this blog, and it sorta blew my mind. The improvement on low-end devices felt illegal, like black magic.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              marks: [{ type: 'code' }],
              text: 'useDeferredValue',
              type: 'text',
            },
            {
              text: ' has a bit of an intimidating reputation, and it ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'is',
              type: 'text',
            },
            {
              text: ' a pretty sophisticated tool, but it isn’t too scary with the right mental model. In this tutorial, I’ll show you exactly how it works, and how you can use it to dramatically improve the performance of your applications.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          attrs: { level: 0 },
          content: [{ text: 'One of the problem', type: 'text' }],
          type: 'heading',
        },
        {
          content: [
            {
              text: 'A couple of years ago, I released ',
              type: 'text',
            },
            {
              marks: [
                {
                  attrs: {
                    href: 'https://www.joshwcomeau.com/shadow-palette/',
                  },
                  type: 'link',
                },
              ],
              text: 'Shadow Palette Generator',
              type: 'text',
            },
            {
              text: ', a tool for generating realistic shadows:',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'By experimenting with sliders and other controls, you can design your own set of shadows. The CSS code is provided for you to copy/paste it into your own application.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              marks: [{ type: 'bold' }],
              text: 'Here’s the problem:',
              type: 'text',
            },
            {
              text: ' the controls in this UI are designed to provide ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'immediate',
              type: 'text',
            },
            {
              text: ' feedback; as the user slides the “Oomph” slider, for example, they see the effect of that change right away. This means that the UI is re-rendered ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'dozens of times a second',
              type: 'text',
            },
            {
              text: ' while one of these inputs is being dragged.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'Now, React is fast, and most of this UI is pretty easy to update. The problem is the ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'syntax-highlighted code snippet',
              type: 'text',
            },
            { text: ' at the bottom:', type: 'text' },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'Over the years, React has given us a number of tools for optimizing the performance of our applications. One of the most powerful hidden gems is ',
              type: 'text',
            },
            {
              marks: [{ type: 'code' }],
              text: 'useDeferredValue',
              type: 'text',
            },
            { text: '. It can have a ', type: 'text' },
            {
              marks: [{ type: 'italic' }],
              text: 'tremendous',
              type: 'text',
            },
            {
              text: ' impact on user experience in certain situations! ⚡',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'I recently used this hook to fix a gnarly performance issue on this blog, and it sorta blew my mind. The improvement on low-end devices felt illegal, like black magic.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              marks: [{ type: 'code' }],
              text: 'useDeferredValue',
              type: 'text',
            },
            {
              text: ' has a bit of an intimidating reputation, and it ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'is',
              type: 'text',
            },
            {
              text: ' a pretty sophisticated tool, but it isn’t too scary with the right mental model. In this tutorial, I’ll show you exactly how it works, and how you can use it to dramatically improve the performance of your applications.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          attrs: { level: 0 },
          content: [{ text: 'One of the problem', type: 'text' }],
          type: 'heading',
        },
        {
          content: [
            {
              text: 'A couple of years ago, I released ',
              type: 'text',
            },
            {
              marks: [
                {
                  attrs: {
                    href: 'https://www.joshwcomeau.com/shadow-palette/',
                  },
                  type: 'link',
                },
              ],
              text: 'Shadow Palette Generator',
              type: 'text',
            },
            {
              text: ', a tool for generating realistic shadows:',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'By experimenting with sliders and other controls, you can design your own set of shadows. The CSS code is provided for you to copy/paste it into your own application.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              marks: [{ type: 'bold' }],
              text: 'Here’s the problem:',
              type: 'text',
            },
            {
              text: ' the controls in this UI are designed to provide ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'immediate',
              type: 'text',
            },
            {
              text: ' feedback; as the user slides the “Oomph” slider, for example, they see the effect of that change right away. This means that the UI is re-rendered ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'dozens of times a second',
              type: 'text',
            },
            {
              text: ' while one of these inputs is being dragged.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'Now, React is fast, and most of this UI is pretty easy to update. The problem is the ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'syntax-highlighted code snippet',
              type: 'text',
            },
            { text: ' at the bottom:', type: 'text' },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'Over the years, React has given us a number of tools for optimizing the performance of our applications. One of the most powerful hidden gems is ',
              type: 'text',
            },
            {
              marks: [{ type: 'code' }],
              text: 'useDeferredValue',
              type: 'text',
            },
            { text: '. It can have a ', type: 'text' },
            {
              marks: [{ type: 'italic' }],
              text: 'tremendous',
              type: 'text',
            },
            {
              text: ' impact on user experience in certain situations! ⚡',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'I recently used this hook to fix a gnarly performance issue on this blog, and it sorta blew my mind. The improvement on low-end devices felt illegal, like black magic.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              marks: [{ type: 'code' }],
              text: 'useDeferredValue',
              type: 'text',
            },
            {
              text: ' has a bit of an intimidating reputation, and it ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'is',
              type: 'text',
            },
            {
              text: ' a pretty sophisticated tool, but it isn’t too scary with the right mental model. In this tutorial, I’ll show you exactly how it works, and how you can use it to dramatically improve the performance of your applications.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          attrs: { level: 0 },
          content: [{ text: 'One of the problem', type: 'text' }],
          type: 'heading',
        },
        {
          content: [
            {
              text: 'A couple of years ago, I released ',
              type: 'text',
            },
            {
              marks: [
                {
                  attrs: {
                    href: 'https://www.joshwcomeau.com/shadow-palette/',
                  },
                  type: 'link',
                },
              ],
              text: 'Shadow Palette Generator',
              type: 'text',
            },
            {
              text: ', a tool for generating realistic shadows:',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'By experimenting with sliders and other controls, you can design your own set of shadows. The CSS code is provided for you to copy/paste it into your own application.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              marks: [{ type: 'bold' }],
              text: 'Here’s the problem:',
              type: 'text',
            },
            {
              text: ' the controls in this UI are designed to provide ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'immediate',
              type: 'text',
            },
            {
              text: ' feedback; as the user slides the “Oomph” slider, for example, they see the effect of that change right away. This means that the UI is re-rendered ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'dozens of times a second',
              type: 'text',
            },
            {
              text: ' while one of these inputs is being dragged.',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
        {
          content: [
            {
              text: 'Now, React is fast, and most of this UI is pretty easy to update. The problem is the ',
              type: 'text',
            },
            {
              marks: [{ type: 'italic' }],
              text: 'syntax-highlighted code snippet',
              type: 'text',
            },
            { text: ' at the bottom:', type: 'text' },
          ],
          type: 'paragraph',
        },
      ],
      type: 'doc',
    },
    layoutChanges: [
      new LayoutChange({
        offset: 0,
        areas: "'GvsdhtasCVQN' 'WvsdhtasCVQN' 'WvsdhtasCVQN'",
      }),
      new LayoutChange({
        offset: 0.05,
        areas: "'GvsdhtasCVQN' 'WvsdhtasCVQN'",
      }),
      new LayoutChange({
        offset: 0.1,
        areas: "'dynamic1 image1'",
      }),
      new LayoutChange({
        offset: 0.3,
        areas: "'image1'",
      }),
      new LayoutChange({
        offset: 0.5,
        areas: "'GvsdhtasCVQN'",
      }),
      new LayoutChange({
        offset: 0.6,
        areas: "'dynamic1'",
      }),
    ],
    assets: [
      new AssetImageDynamic({
        _id: 'dynamic1',
        type: 'image-dynamic',
        name: 'mcmahon.mp4',
        href: '/assets/use-deferred-value/dynamic.mp4',
        caption: Option.some('The captions of this video'),
      }),
      new AssetImageStatic({
        _id: 'image1',
        type: 'image-static',
        name: 'og.png',
        href: '/images/og.png',
        caption: Option.some('The captions of this image'),
        alt: Option.some('My OG'),
      }),
      new AssetText({
        _id: 'WvsdhtasCVQN',
        type: 'text',
        name: 'README.js',
        initialValue: Text.of([
          'function main() {',
          '  console.log(777)',
          '}',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          'const a = 5',
        ]),
        advances: [],
      }),
      new AssetText({
        _id: 'GvsdhtasCVQN',
        type: 'text',
        name: 'index.tsx',
        initialValue: Text.empty,
        advances: (() => {
          // biome-ignore lint/suspicious/noExplicitAny: YOLO
          const recorded: Array<any> = [
            [
              0.0847,
              [
                [],
                {
                  ranges: [
                    {
                      anchor: 0,
                      head: 0,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.1933,
              [
                [[0, 'f']],
                {
                  ranges: [
                    {
                      anchor: 1,
                      head: 1,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.2106,
              [
                [1, [0, 'u']],
                {
                  ranges: [
                    {
                      anchor: 2,
                      head: 2,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.2165,
              [
                [2, [0, 'n']],
                {
                  ranges: [
                    {
                      anchor: 3,
                      head: 3,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.222,
              [
                [3, [0, 'c']],
                {
                  ranges: [
                    {
                      anchor: 4,
                      head: 4,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.2388,
              [
                [4, [0, 't']],
                {
                  ranges: [
                    {
                      anchor: 5,
                      head: 5,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.242,
              [
                [5, [0, 'i']],
                {
                  ranges: [
                    {
                      anchor: 6,
                      head: 6,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.2457,
              [
                [6, [0, 'o']],
                {
                  ranges: [
                    {
                      anchor: 7,
                      head: 7,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.2484,
              [
                [7, [0, 'n']],
                {
                  ranges: [
                    {
                      anchor: 8,
                      head: 8,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.2619,
              [
                [8, [0, ' ']],
                {
                  ranges: [
                    {
                      anchor: 9,
                      head: 9,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.2831,
              [
                [9, [0, 'C']],
                {
                  ranges: [
                    {
                      anchor: 10,
                      head: 10,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.2935,
              [
                [10, [0, 'o']],
                {
                  ranges: [
                    {
                      anchor: 11,
                      head: 11,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3005,
              [
                [11, [0, 'm']],
                {
                  ranges: [
                    {
                      anchor: 12,
                      head: 12,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3131,
              [
                [12, [0, 'p']],
                {
                  ranges: [
                    {
                      anchor: 13,
                      head: 13,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3183,
              [
                [13, [0, 'o']],
                {
                  ranges: [
                    {
                      anchor: 14,
                      head: 14,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3362,
              [
                [14, [0, 'n']],
                {
                  ranges: [
                    {
                      anchor: 15,
                      head: 15,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3437,
              [
                [15, [0, 'e']],
                {
                  ranges: [
                    {
                      anchor: 16,
                      head: 16,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3507,
              [
                [16, [0, 'n']],
                {
                  ranges: [
                    {
                      anchor: 17,
                      head: 17,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3569,
              [
                [17, [0, 't']],
                {
                  ranges: [
                    {
                      anchor: 18,
                      head: 18,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3821,
              [
                [18, [0, '()']],
                {
                  ranges: [
                    {
                      anchor: 19,
                      head: 19,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.3858,
              [
                [19, [1, ')']],
                {
                  ranges: [
                    {
                      anchor: 20,
                      head: 20,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.4154,
              [
                [20, [0, ' ']],
                {
                  ranges: [
                    {
                      anchor: 21,
                      head: 21,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.4261,
              [
                [21, [0, '{}']],
                {
                  ranges: [
                    {
                      anchor: 22,
                      head: 22,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.4514,
              [
                [22, [0, '', '  ', ''], 1],
                {
                  ranges: [
                    {
                      anchor: 25,
                      head: 25,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.5083,
              [
                [25, [0, 'r'], 2],
                {
                  ranges: [
                    {
                      anchor: 26,
                      head: 26,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.5134,
              [
                [26, [0, 'e'], 2],
                {
                  ranges: [
                    {
                      anchor: 27,
                      head: 27,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.5244,
              [
                [27, [0, 't'], 2],
                {
                  ranges: [
                    {
                      anchor: 28,
                      head: 28,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.5299,
              [
                [28, [0, 'u'], 2],
                {
                  ranges: [
                    {
                      anchor: 29,
                      head: 29,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.5377,
              [
                [29, [0, 'r'], 2],
                {
                  ranges: [
                    {
                      anchor: 30,
                      head: 30,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.5463,
              [
                [30, [0, 'n'], 2],
                {
                  ranges: [
                    {
                      anchor: 31,
                      head: 31,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.5535,
              [
                [31, [0, ' '], 2],
                {
                  ranges: [
                    {
                      anchor: 32,
                      head: 32,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.6312,
              [
                [32, [0, '<'], 2],
                {
                  ranges: [
                    {
                      anchor: 33,
                      head: 33,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.6483,
              [
                [33, [0, 'd'], 2],
                {
                  ranges: [
                    {
                      anchor: 34,
                      head: 34,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.6559,
              [
                [34, [0, 'i'], 2],
                {
                  ranges: [
                    {
                      anchor: 35,
                      head: 35,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.6613,
              [
                [35, [0, 'v'], 2],
                {
                  ranges: [
                    {
                      anchor: 36,
                      head: 36,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.6862,
              [
                [36, [0, '></div>'], 2],
                {
                  ranges: [
                    {
                      anchor: 37,
                      head: 37,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.7719,
              [
                [37, [0, 'H'], 8],
                {
                  ranges: [
                    {
                      anchor: 38,
                      head: 38,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.7908,
              [
                [38, [0, 'e'], 8],
                {
                  ranges: [
                    {
                      anchor: 39,
                      head: 39,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.8344,
              [
                [39, [0, 'l'], 8],
                {
                  ranges: [
                    {
                      anchor: 40,
                      head: 40,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.8478,
              [
                [40, [0, 'l'], 8],
                {
                  ranges: [
                    {
                      anchor: 41,
                      head: 41,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.8509,
              [
                [41, [0, 'o'], 8],
                {
                  ranges: [
                    {
                      anchor: 42,
                      head: 42,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.8795,
              [
                [42, [0, ','], 8],
                {
                  ranges: [
                    {
                      anchor: 43,
                      head: 43,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.9086,
              [
                [43, [0, ' '], 8],
                {
                  ranges: [
                    {
                      anchor: 44,
                      head: 44,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.9213,
              [
                [44, [0, 'w'], 8],
                {
                  ranges: [
                    {
                      anchor: 45,
                      head: 45,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.9308,
              [
                [45, [0, 'o'], 8],
                {
                  ranges: [
                    {
                      anchor: 46,
                      head: 46,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.9389,
              [
                [46, [0, 'r'], 8],
                {
                  ranges: [
                    {
                      anchor: 47,
                      head: 47,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.9463,
              [
                [47, [0, 'l'], 8],
                {
                  ranges: [
                    {
                      anchor: 48,
                      head: 48,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.9525,
              [
                [48, [0, 'd'], 8],
                {
                  ranges: [
                    {
                      anchor: 49,
                      head: 49,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
            [
              0.9999,
              [
                [49, [0, '!'], 8],
                {
                  ranges: [
                    {
                      anchor: 50,
                      head: 50,
                    },
                  ],
                  main: 0,
                },
              ],
            ],
          ]
          return recorded.map(
            ([t, [c, s]]) =>
              [
                t,
                [ChangeSet.fromJSON(c), EditorSelection.fromJSON(s)],
              ] as const,
          )
        })(),
      }),
    ],
    date: DateTime.make({ year: 2024, month: 12, day: 1 }).pipe(
      Option.getOrThrow,
    ),
    updateDate: DateTime.make({ year: 2024, month: 12, day: 1 }).pipe(
      Option.getOrThrow,
    ),
  })

export const posts: ReadonlyArray<Post> = [
  createPost(),
  createPost('2', '/assets/use-deferred-value/poster-2.webp'),
  createPost('3', '/assets/use-deferred-value/poster-3.webp'),
  createPost('4', '/assets/use-deferred-value/poster-4.webp'),
]
