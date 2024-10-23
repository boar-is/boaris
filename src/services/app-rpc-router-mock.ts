import { Rpc, RpcRouter } from '@effect/rpc'
import { Effect, HashMap, HashSet, Layer, Option } from 'effect'
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
          title: 'Understanding React Server Components',
          lead: Option.none(),
          description:
            'useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I’ll show you how! ⚡',
          thumbnailUrl: Option.none(),
          date: new Date(),
        },
        authors: [],
        tags: [],
        revision: {
          captions: Option.none(),
          layout: {
            modes: HashSet.make('scrolling' as const),
            changes: [],
            overrides: [],
          },
          tracks: [],
        },
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
        tagsByPostSlug: HashMap.empty(),
        authorsByPostSlug: HashMap.empty(),
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
