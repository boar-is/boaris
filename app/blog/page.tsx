import { Image } from '~/components/image'
import { Link } from '~/components/link'
import { workspace } from '~/lib/data'

const getPosts = () =>
  Promise.resolve([
    {
      slug: 'promises',
      name: 'Promises from the ground up',
      lead: 'The “Promises” API is a surprisingly tricky part of modern JavaScript. Without the right context, it doesn’t make much sense at all! In this tutorial, you’ll build an intuition for how Promises work by getting a deeper understanding of JavaScript and its limitations.',
      date: '15 Aug 2024',
      tags: ['TypeScript', 'CSS', 'Next.js', 'Next.js', 'CSS', 'TypeScript'],
    },
    {
      slug: 'deferred-value',
      name: 'Snappy UI Optimization with useDeferredValue',
      lead: "useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I'll show you how! ⚡",
      date: '28 Jul 2024',
      tags: ['React'],
    },
    {
      slug: 'css-in-rsc',
      name: 'CSS in React Server Components',
      lead: 'You can’t make an omelette without cracking a few eggs, and when the core React team unveiled their vision for the future of React, some of my favourite libraries got scrambled 😅. In this blog post, we’re going to explore the compatibility issues between React Server Components and CSS-in-JS libraries like styled-components. You’ll understand what the issue is, what the options are, and what’s on the horizon.',
      date: '9 Jun 2024',
      tags: ['CSS', 'Next.js'],
    },
  ] satisfies ReadonlyArray<{
    slug: string
    name: string
    lead: string
    date: string
    tags: ReadonlyArray<string>
  }>)

export default async function BlogPage() {
  const posts = await getPosts()

  if (!posts.length) {
    return <div>No Posts</div>
  }

  return (
    <article className="container flex flex-col gap-6 md:gap-10 items-stretch">
      <header className="sr-only">
        <h1>{workspace.name}'s Blog</h1>
      </header>
      {posts.map((post) => (
        <article
          key={post.slug}
          className="group flex flex-col justify-between md:even:flex-row md:flex-row-reverse border border-gray-4 rounded-xl md:rounded-3xl overflow-hidden transition-colors hover:bg-gray-2"
        >
          <aside className="relative basis-1/2 aspect-video">
            <Image
              src={`https://picsum.photos/seed/${post.slug}/1600/900`}
              alt={`${post.name}'s thumbnail`}
              fill
              className="object-cover"
            />
          </aside>
          <section className="flex-1 flex flex-col gap-3 md:gap-8 p-4 md:p-10">
            <header>
              <hgroup>
                <small className="text-gray-8 font-bold tracking-wide uppercase md:text-base">
                  {post.date}
                </small>
                <h3 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-12 text-balance">
                  {post.name}
                </h3>
              </hgroup>
            </header>

            <ul className="flex flex-wrap gap-1.5 text-sm md:text-sm font-medium tracking-wide text-gray-8 *:my-0.5">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <span className="border border-gray-7 rounded-full px-3 py-0.5">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-gray-10 font-medium leading-snug text-pretty md:text-lg">
              {post.lead}
            </p>

            <footer>
              <Link
                href={`/blog/${post.slug}`}
                className="block font-semibold md:text-lg py-2 md:py-3 text-center border border-gray-4 rounded-md md:rounded-2xl text-gray-10 bg-gray-2 group-hover:bg-gray-3 transition-colors"
              >
                Read More
              </Link>
            </footer>
          </section>
        </article>
      ))}
    </article>
  )
}
