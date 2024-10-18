import { fetchQuery } from 'convex/nextjs'
import { notFound } from 'next/navigation'
import { api } from '~/convex/_generated/api'
import { LayoutModeProvider } from '~/features/layout/layout-mode-provider'
import { PostPageProvider } from '~/features/post/post-page-provider'
import { currentWorkspaceSlug } from '~/lib/constants'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { PostContent } from './_post-content'

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
    <PostPageProvider result={result}>
      <LayoutModeProvider primaryLayoutModes={result.layouts?.primary?.modes}>
        <PostContent />
      </LayoutModeProvider>
    </PostPageProvider>
  )
}
