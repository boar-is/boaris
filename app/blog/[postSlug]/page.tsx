import { notFound } from 'next/navigation'
import { cx } from '~/lib/cx'
import { PostRepository } from '~/lib/db/posts'
import { ProjectRepository } from '~/lib/db/projects'
import { JetBrainsMono } from '~/lib/fonts'
import { PostService } from '~/lib/services/post.service'
import { ProjectService } from '~/lib/services/project.service'
import { WorkspaceService } from '~/lib/services/workspace.service'
import { BlogCaptions } from './_/blog-captions'

export async function generateStaticParams() {
  const project = ProjectRepository.findOneByWorkspaceAndSlug(
    WorkspaceService.mvpWorkspaceSlug,
    ProjectService.mvpProjectSlug,
  )

  if (!project) {
    return []
  }

  return PostRepository.findPublishedByProjectId(project._id).map((it) => ({
    postSlug: it.slug,
  }))
}

export default async function BlogPostPage({
  params: { postSlug },
}: { params: { postSlug: string } }) {
  const post = PostService.getBlogPost(postSlug)

  if (!post) {
    notFound()
  }

  return (
    <article className={cx(JetBrainsMono.variable, 'flex flex-col gap-10')}>
      <aside />
      <header className="container max-w-prose">
        <hgroup>
          <h1>{post.title}</h1>
          <p>{post.lead}</p>
        </hgroup>
      </header>
      <section className="container typography">
        <BlogCaptions content={post.captions} />
      </section>
    </article>
  )
}
