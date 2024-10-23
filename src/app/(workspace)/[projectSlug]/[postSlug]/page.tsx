import { Effect, Schema } from 'effect'
import { notFound } from 'next/navigation'
import { currentWorkspaceSlug } from '~/lib/constants'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { PostRequest } from '~/rpc/post-request'
import { PostSlugsRequest } from '~/rpc/post-slugs-request'
import { AppServerRuntime } from '~/runtimes/app-server-runtime'
import { AppRpcClient } from '~/services/app-rpc-client'
import { WorkspaceProjectPostPageClient } from './page.client'

export async function generateStaticParams() {
  return AppServerRuntime.runPromise(
    Effect.gen(function* () {
      return yield* (yield* AppRpcClient)(new PostSlugsRequest())
    }),
  )
}

export default async function WorkspaceProjectPostPage({
  params: { workspaceSlug = currentWorkspaceSlug, projectSlug, postSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  return AppServerRuntime.runPromise(
    Effect.gen(function* () {
      const result = yield* (yield* AppRpcClient)(
        new PostRequest({
          workspaceSlug,
          projectSlug,
          postSlug,
        }),
      )

      if (!result) {
        notFound()
      }

      return (
        <WorkspaceProjectPostPageClient
          result={Schema.encodeSync(PostRequest.success)(result)}
        />
      )
    }),
  )
}
