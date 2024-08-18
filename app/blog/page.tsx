import { notFound } from 'next/navigation'
import { Image } from '~/components/image'
import { Link } from '~/components/link'
import { PostAuthorRepository } from '~/lib/db/post-authors'
import { PostTagRepository } from '~/lib/db/post-tags'
import { type PostDoc, PostRepository } from '~/lib/db/posts'
import { ProjectRepository } from '~/lib/db/projects'
import { StorageRepository } from '~/lib/db/storages'
import { type TagDoc, TagRepository } from '~/lib/db/tags'
import { type UserDoc, UserRepository } from '~/lib/db/users'

const authors = [
  {
    _id: '2',
    avatarSrc: 'https://avatars.githubusercontent.com/u/119161453?v=4',
    name: 'John Doe',
  },
]

const getPosts = () =>
  Promise.resolve([
    {
      slug: 'promises',
      name: 'Promises from the ground up',
      lead: 'The “Promises” API is a surprisingly tricky part of modern JavaScript. Without the right context, it doesn’t make much sense at all! In this tutorial, you’ll build an intuition for how Promises work by getting a deeper understanding of JavaScript and its limitations.',
      date: '15 Aug 2024',
      tags: ['TypeScript', 'CSS', 'Next.js'],
      authors,
    },
    {
      slug: 'deferred-value',
      name: 'Snappy UI Optimization with useDeferredValue',
      lead: "useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I'll show you how! ⚡",
      date: '28 Jul 2024',
      tags: ['React'],
      authors,
    },
    {
      slug: 'css-in-rsc',
      name: 'CSS in React Server Components',
      lead: 'You can’t make an omelette without cracking a few eggs, and when the core React team unveiled their vision for the future of React, some of my favourite libraries got scrambled 😅. In this blog post, we’re going to explore the compatibility issues between React Server Components and CSS-in-JS libraries like styled-components. You’ll understand what the issue is, what the options are, and what’s on the horizon.',
      date: '9 Jun 2024',
      tags: ['CSS', 'Next.js'],
      authors,
    },
  ] satisfies ReadonlyArray<{
    slug: string
    name: string
    lead: string
    date: string
    tags: ReadonlyArray<string>
    authors: ReadonlyArray<{
      _id: string
      avatarSrc: string
      name: string
    }>
  }>)

export default async function BlogPage() {
  const project = ProjectRepository.findOneBySlug('blog')

  if (!project) {
    notFound()
  }

  const posts = PostRepository.findPublishedByProjectId(project._id)

  if (!posts.length) {
    return (
      <div className="container text-center text-5xl font-semibold capitalize">
        No posts yet
      </div>
    )
  }

  const tagsByPostId = posts.reduce((map, post) => {
    const postTagIds = PostTagRepository.findByPostId(post._id).map(
      (it) => it.tagId,
    )
    map.set(post._id, TagRepository.findMany(postTagIds))
    return map
  }, new Map<PostDoc['_id'], ReadonlyArray<TagDoc>>())

  const authorsByPostId = posts.reduce((map, post) => {
    const postAuthorIds = PostAuthorRepository.findByPostId(post._id).map(
      (it) => it.postId,
    )
    map.set(post._id, UserRepository.findMany(postAuthorIds))
    return map
  }, new Map<PostDoc['_id'], ReadonlyArray<UserDoc>>())

  return (
    <article className="container flex flex-col gap-6 md:gap-10 items-stretch">
      <header className="sr-only">
        <h1>{project.name}</h1>
      </header>
      {posts.map((post) => {
        const tags = tagsByPostId.get(post._id)
        const authors = authorsByPostId.get(post._id)

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl md:rounded-3xl"
          >
            <article className="flex flex-col justify-between md:group-even:flex-row md:flex-row-reverse border border-gray-3 rounded-[inherit] overflow-hidden transition-colors bg-gradient-to-tr from-gray-1 to-gray-2">
              <aside className="relative basis-1/2 aspect-video">
                <Image
                  src={`https://picsum.photos/seed/${post.slug}/1600/900`}
                  alt={`${post.name}'s thumbnail`}
                  fill
                  className="object-cover"
                />
              </aside>
              <section className="flex-1 flex flex-col gap-3 md:gap-6 p-4 md:p-10">
                <header>
                  <hgroup>
                    <small className="text-gray-8 font-bold tracking-wide uppercase text-xs md:text-sm">
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }).format(new Date(project._creationTime))}
                    </small>
                    <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-12 text-balance">
                      {post.name}
                    </h3>
                  </hgroup>
                </header>

                {tags && (
                  <ul className="flex flex-wrap gap-1 md:gap-1.5 text-xs md:text-sm font-medium tracking-wide text-gray-8 *:my-0.5">
                    {tags.map((tag) => (
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

                {authors && (
                  <ul className="space-y-1 md:space-y-2 text-gray-8 text-sm md:text-base font-semibold tracking-tight">
                    {authors.map((author) => {
                      const avatarSrc =
                        author.avatarId &&
                        StorageRepository.findOneSrc(author.avatarId)

                      return (
                        <li
                          key={author._id}
                          className="flex items-center gap-1.5 md:gap-2"
                        >
                          {avatarSrc && (
                            <aside className="relative size-6 md:size-8 rounded-full overflow-hidden border shadow-inner">
                              <Image
                                src={avatarSrc}
                                alt={`${author.name}'s avatar`}
                                fill
                              />
                            </aside>
                          )}
                          {author.name}
                        </li>
                      )
                    })}
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
        )
      })}
    </article>
  )
}
