import type { RpcRouter } from '@effect/rpc'
import { Context } from 'effect'
import type { PostRequest } from '~/rpc/post-request'
import type { PostSlugsRequest } from '~/rpc/post-slugs-request'
import type { ProjectRequest } from '~/rpc/project-request'
import type { ProjectSlugsRequest } from '~/rpc/project-slugs-request'
import type { WorkspaceRequest } from '~/rpc/workspace-request'
import type { WorkspaceSlugsRequest } from '~/rpc/workspace-slugs-request'

export class AppRpcRouter extends Context.Tag('AppRpcRouter')<
  AppRpcRouter,
  RpcRouter.RpcRouter<
    | PostRequest
    | PostSlugsRequest
    | ProjectRequest
    | ProjectSlugsRequest
    | WorkspaceRequest
    | WorkspaceSlugsRequest,
    never
  >
>() {}
