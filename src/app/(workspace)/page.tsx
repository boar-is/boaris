import { Effect } from 'effect'
import { notFound } from 'next/navigation'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { currentWorkspaceSlug } from '~/lib/utils/constants'
import { WorkspaceRequest } from '~/rpc/workspace-request'
import { WorkspaceSlugsRequest } from '~/rpc/workspace-slugs-request'
import { AppServerRuntime } from '~/runtimes/app-server-runtime'
import { AppRpcClient } from '~/services/app-rpc-client'

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
