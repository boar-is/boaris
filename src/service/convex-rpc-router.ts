import { Rpc, RpcRouter } from '@effect/rpc'
import { fetchQuery } from 'convex/nextjs'
import { Effect, Schema } from 'effect'
import { api } from '~/convex/_generated/api'
import { PostRequest } from '~/rpc/post-request'
import { PostSlugsRequest } from '~/rpc/post-slugs-request'
import { ProjectRequest } from '~/rpc/project-request'
import { ProjectSlugsRequest } from '~/rpc/project-slugs-request'
import { WorkspaceRequest } from '~/rpc/workspace-request'
import { WorkspaceSlugsRequest } from '~/rpc/workspace-slugs-request'

export const ConvexRpcRouter = RpcRouter.make(
  Rpc.effect(PostRequest, (payload) =>
    Effect.tryPromise(() => fetchQuery(api.post.default, payload)).pipe(
      Effect.andThen(Schema.decodeSync(PostRequest.success)),
      Effect.catchAll(() => Effect.succeed(null)),
    ),
  ),
  Rpc.effect(PostSlugsRequest, () =>
    Effect.tryPromise(() => fetchQuery(api.postSlugs.default)).pipe(
      Effect.andThen(Schema.decodeSync(PostSlugsRequest.success)),
      Effect.catchAll(() => Effect.succeed([])),
    ),
  ),
  Rpc.effect(ProjectRequest, (payload) =>
    Effect.tryPromise(() => fetchQuery(api.project.default, payload)).pipe(
      Effect.andThen(Schema.decodeSync(ProjectRequest.success)),
      Effect.catchAll(() => Effect.succeed(null)),
    ),
  ),
  Rpc.effect(ProjectSlugsRequest, () =>
    Effect.tryPromise(() => fetchQuery(api.projectSlugs.default)).pipe(
      Effect.andThen(Schema.decodeSync(ProjectSlugsRequest.success)),
      Effect.catchAll(() => Effect.succeed([])),
    ),
  ),
  Rpc.effect(WorkspaceRequest, (payload) =>
    Effect.tryPromise(() => fetchQuery(api.workspace.default, payload)).pipe(
      Effect.andThen(Schema.decodeSync(WorkspaceRequest.success)),
      Effect.catchAll(() => Effect.succeed(null)),
    ),
  ),
  Rpc.effect(WorkspaceSlugsRequest, () =>
    Effect.tryPromise(() => fetchQuery(api.workspaceSlugs.default)).pipe(
      Effect.andThen(Schema.decodeSync(WorkspaceSlugsRequest.success)),
      Effect.catchAll(() => Effect.succeed([])),
    ),
  ),
)
