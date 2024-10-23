import { Rpc, RpcRouter } from '@effect/rpc'
import { Effect } from 'effect'
import { PostRequest } from '~/rpc/post-request'
import { PostSlugsRequest } from '~/rpc/post-slugs-request'
import { ProjectRequest } from '~/rpc/project-request'
import { ProjectSlugsRequest } from '~/rpc/project-slugs-request'
import { WorkspaceRequest } from '~/rpc/workspace-request'
import { WorkspaceSlugsRequest } from '~/rpc/workspace-slugs-request'
import type { AppRpcRouter } from '~/service/app-rpc-router'

export const AppRpcRouterMock: (typeof AppRpcRouter)['Service'] =
  RpcRouter.make(
    Rpc.effect(PostRequest, () => Effect.succeed(null)),
    Rpc.effect(PostSlugsRequest, () => Effect.succeed([])),
    Rpc.effect(ProjectRequest, () => Effect.succeed(null)),
    Rpc.effect(ProjectSlugsRequest, () => Effect.succeed([])),
    Rpc.effect(WorkspaceRequest, () => Effect.succeed(null)),
    Rpc.effect(WorkspaceSlugsRequest, () => Effect.succeed([])),
  )
