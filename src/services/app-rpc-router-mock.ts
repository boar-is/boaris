import { Rpc, RpcRouter } from '@effect/rpc'
import { ChangeSet, EditorSelection, Text } from '@uiw/react-codemirror'
import { Effect, HashSet, Layer, Option } from 'effect'
import { PostRequest } from '~/rpc/post-request'
import { PostSlugsRequest } from '~/rpc/post-slugs-request'
import { ProjectRequest } from '~/rpc/project-request'
import { ProjectSlugsRequest } from '~/rpc/project-slugs-request'
import { WorkspaceRequest } from '~/rpc/workspace-request'
import { WorkspaceSlugsRequest } from '~/rpc/workspace-slugs-request'
import { AppRpcRouter } from '~/services/app-rpc-router'

export const AppRpcRouterMock = Layer.succeed(
  AppRpcRouter,
  RpcRouter.make(
    Rpc.effect(PostRequest, () =>
      Effect.succeed<(typeof PostRequest)['success']['Type']>({
        post: {
          slug: 'use-deferred-value',
          date: new Date(),
        },
        tags: [],
        authors: [],
        revision: {
          title: 'Understanding React Server Components',
          lead: Option.some(
            'useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I’ll show you how! ⚡',
          ),
          description:
            'useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I’ll show you how! ⚡',
          posterUrl: Option.none(),
        },
        captions: {
          content: {
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
                content: [{ text: 'The problem', type: 'text' }],
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
        },
        layout: {
          modes: HashSet.make('scrolling' as const),
          changes: [
            {
              offset: 0.001,
              value: Option.some({
                areas: "'GvsdhtasCVQN'",
                columns: Option.none(),
                rows: Option.none(),
              }),
            },
          ],
        },
        assets: [
          {
            _id: 'GvsdhtasCVQN',
            type: 'text',
            name: 'index.md',
            value: Text.of(['0123456789']),
            changes: [
              [
                0.1,
                [
                  ChangeSet.of({ from: 0, insert: 'a' }, 10),
                  EditorSelection.single(0),
                ],
              ],
              [0.2, [ChangeSet.empty(11), EditorSelection.single(5)]],
              [
                0.3,
                [
                  ChangeSet.of({ from: 3, to: 5 }, 11),
                  EditorSelection.single(2),
                ],
              ],
              [
                0.4,
                [
                  ChangeSet.of({ from: 4, to: 6, insert: '!' }, 9),
                  EditorSelection.single(1),
                ],
              ],
              [0.5, [ChangeSet.empty(8), EditorSelection.single(8)]],
            ],
          },
        ],
      }),
    ),
    Rpc.effect(PostSlugsRequest, () =>
      Effect.succeed<(typeof PostSlugsRequest)['success']['Type']>([
        {
          workspaceSlug: 'boaris',
          projectSlug: 'blog',
          postSlug: 'use-deferred-value',
        },
      ]),
    ),
    Rpc.effect(ProjectRequest, () =>
      Effect.succeed<(typeof ProjectRequest)['success']['Type']>({
        project: {
          slug: 'blog',
          name: 'Blog',
        },
        posts: [],
      }),
    ),
    Rpc.effect(ProjectSlugsRequest, () =>
      Effect.succeed<(typeof ProjectSlugsRequest)['success']['Type']>([
        {
          workspaceSlug: 'boaris',
          projectSlug: 'blog',
        },
      ]),
    ),
    Rpc.effect(WorkspaceRequest, () =>
      Effect.succeed<(typeof WorkspaceRequest)['success']['Type']>({
        workspace: {
          slug: 'boaris',
          name: 'Boaris',
          logoUrl: Option.none(),
          socialLinks: [],
        },
      }),
    ),
    Rpc.effect(WorkspaceSlugsRequest, () =>
      Effect.succeed<(typeof WorkspaceSlugsRequest)['success']['Type']>([
        {
          workspaceSlug: 'boaris',
        },
      ]),
    ),
  ),
)
