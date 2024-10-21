import { fetchQuery } from 'convex/nextjs'
import { notFound } from 'next/navigation'
import { WorkspaceProjectPostPageProvider } from '~/app/(workspace)/[projectSlug]/[postSlug]/page-context'
import { api } from '~/convex/_generated/api'
import { currentWorkspaceSlug } from '~/lib/constants'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { PostContent } from './_/post-content'

export async function generateStaticParams() {
  return fetchQuery(api.queries.postParams.default)
}

export default async function WorkspaceProjectPostPage({
  params: { workspaceSlug = currentWorkspaceSlug, projectSlug, postSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  const result = await fetchQuery(api.queries.postPage.default, {
    workspaceSlug,
    projectSlug,
    postSlug,
  })

  if (!result) {
    notFound()
  }

  return (
    <WorkspaceProjectPostPageProvider revisionEncoded={result.revision}>
      <PostContent />
    </WorkspaceProjectPostPageProvider>
  )
}
