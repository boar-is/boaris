import { Effect } from 'effect'
import { notFound } from 'next/navigation'
import { currentWorkspaceSlug } from '~/lib/constants'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { WorkspaceRequest } from '~/rpc/workspace-request'
import { WorkspaceSlugsRequest } from '~/rpc/workspace-slugs-request'
import { AppServerRuntime } from '~/runtime/app-server-runtime'
import { AppRpcClient } from '~/service/app-rpc-client'

export async function generateStaticParams() {
  return AppServerRuntime.runPromise(
    Effect.gen(function* () {
      return yield* (yield* AppRpcClient)(new WorkspaceSlugsRequest())
    }),
  )
}

export default async function WorkspacePage({
  params: { workspaceSlug = currentWorkspaceSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  return AppServerRuntime.runPromise(
    Effect.gen(function* () {
      const result = yield* (yield* AppRpcClient)(
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
