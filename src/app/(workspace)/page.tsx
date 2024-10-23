import { RpcRouter } from '@effect/rpc'
import { Effect } from 'effect'
import { notFound } from 'next/navigation'
import { currentWorkspaceSlug } from '~/lib/constants'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { WorkspaceRequest } from '~/rpc/workspace-request'
import { WorkspaceSlugsRequest } from '~/rpc/workspace-slugs-request'
import { AppServerRuntime } from '~/runtime/app-server-runtime'
import { AppRpcRouter } from '~/service/app-rpc-router'

export async function generateStaticParams() {
  return AppServerRuntime.runPromise(
    Effect.gen(function* () {
      const routerHandler = (yield* AppRpcRouter).pipe(RpcRouter.toHandlerRaw)
      return yield* routerHandler(new WorkspaceSlugsRequest())
    }),
  )
}

export default async function WorkspacePage({
  params: { workspaceSlug = currentWorkspaceSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  return AppServerRuntime.runPromise(
    Effect.gen(function* () {
      const routerHandler = (yield* AppRpcRouter).pipe(RpcRouter.toHandlerRaw)

      const result = yield* routerHandler(
        new WorkspaceRequest({ workspaceSlug }),
      )

      if (!result) {
        return notFound()
      }

      const { workspace } = result

      return <div>{workspace.name}</div>
    }),
  )
}
