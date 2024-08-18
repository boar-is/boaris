import { notFound } from 'next/navigation'
import { Image } from '~/components/image'
import { Link } from '~/components/link'
import { PostAuthorRepository } from '~/lib/db/post-authors'
import { PostTagRepository } from '~/lib/db/post-tags'
import { PostRepository } from '~/lib/db/posts'
import { ProjectRepository } from '~/lib/db/projects'
import { StorageRepository } from '~/lib/db/storages'
import { TagRepository } from '~/lib/db/tags'
import { UserRepository } from '~/lib/db/users'

export default async function BlogPage() {
  const project = ProjectRepository.findOneBySlug('blog')

  if (!project) {
    notFound()
  }

  const posts = PostRepository.findPublishedByProjectId(project._id).map(
    (post) => {
      return {
        _id: post._id,
        name: post.name,
        slug: post.slug,
        lead: post.lead ?? post.description,
        date: new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(new Date(post._creationTime)),
        thumbnailSrc:
          post.thumbnailId && StorageRepository.findOneSrc(post.thumbnailId),
        tags: TagRepository.findMany(
          PostTagRepository.findByPostId(post._id).map((it) => it._id),
        ),
        authors: UserRepository.findMany(
          PostAuthorRepository.findByPostId(post._id).map((it) => it._id),
        ).map((author) => ({
          _id: author._id,
          name: author.name,
          avatarSrc:
            author.avatarId && StorageRepository.findOneSrc(author.avatarId),
        })),
      }
    },
  )

  if (!posts.length) {
    return (
      <div className="container text-center text-2xl md:text-5xl text-gray-8 font-semibold capitalize">
        No posts yet
      </div>
    )
  }

  return (
    <article className="container flex flex-col gap-6 md:gap-10 items-stretch">
      <header className="sr-only">
        <h1>{project.name}</h1>
      </header>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group rounded-xl md:rounded-3xl"
        >
          <article className="flex flex-col justify-between md:group-even:flex-row md:flex-row-reverse border border-gray-3 rounded-[inherit] overflow-hidden transition-colors bg-gradient-to-tr from-gray-1 to-gray-2">
            {post.thumbnailSrc && (
              <aside className="relative basis-1/2 aspect-video">
                <Image
                  src={post.thumbnailSrc}
                  alt={`${post.name}'s thumbnail`}
                  fill
                  className="object-cover"
                />
              </aside>
            )}
            <section className="flex-1 flex flex-col gap-3 md:gap-6 p-4 md:p-10">
              <header>
                <hgroup>
                  <small className="text-gray-8 font-bold tracking-wide uppercase text-xs md:text-sm">
                    {post.date}
                  </small>
                  <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-12 text-balance">
                    {post.name}
                  </h3>
                </hgroup>
              </header>

              {post.tags && (
                <ul className="flex flex-wrap gap-1 md:gap-1.5 text-xs md:text-sm font-medium tracking-wide text-gray-8 *:my-0.5">
                  {post.tags.map((tag) => (
                    <li key={tag._id}>
                      <span className="border border-gray-7 rounded-full px-3 py-0.5">
                        {tag.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-gray-10 font-medium text-pretty text-sm md:text-base !leading-relaxed">
                {post.lead}
              </p>

              {post.authors && (
                <ul className="space-y-1 md:space-y-2 text-gray-8 text-sm md:text-base font-semibold tracking-tight">
                  {post.authors.map((author) => (
                    <li
                      key={author._id}
                      className="flex items-center gap-1.5 md:gap-2"
                    >
                      {author.avatarSrc && (
                        <aside className="relative size-6 md:size-8 rounded-full overflow-hidden border shadow-inner">
                          <Image
                            src={author.avatarSrc}
                            alt={`${author.name}'s avatar`}
                            fill
                          />
                        </aside>
                      )}
                      {author.name}
                    </li>
                  ))}
                </ul>
              )}

              <footer className="mt-auto">
                <div className="block font-semibold text-sm md:text-base py-2 md:py-3 text-center border border-gray-4 rounded-md md:rounded-2xl text-gray-10 bg-gray-2 group-hover:bg-gray-3 transition-colors">
                  Read More
                </div>
              </footer>
            </section>
          </article>
        </Link>
      ))}
    </article>
  )
}
