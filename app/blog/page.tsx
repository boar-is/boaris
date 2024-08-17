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
    },
    {
      slug: 'deferred-value',
      name: 'Snappy UI Optimization with useDeferredValue',
      lead: "useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I'll show you how! ⚡",
      date: '28 Jul 2024',
    },
    {
      slug: 'css-in-rsc',
      name: 'CSS in React Server Components',
      lead: 'You can’t make an omelette without cracking a few eggs, and when the core React team unveiled their vision for the future of React, some of my favourite libraries got scrambled 😅. In this blog post, we’re going to explore the compatibility issues between React Server Components and CSS-in-JS libraries like styled-components. You’ll understand what the issue is, what the options are, and what’s on the horizon.',
      date: '9 Jun 2024',
    },
  ] satisfies ReadonlyArray<{
    slug: string
    name: string
    lead: string
    date: string
  }>)

export default async function BlogPage() {
  const [latestPost, ...posts] = await getPosts()

  if (!latestPost) {
    return <div>No Posts</div>
  }

  return (
    <article className="container flex flex-col items-stretch">
      <header>
        <h1 className="sr-only">{workspace.name}'s Blog</h1>
      </header>
      <section>
        <header>
          <h2 className="sr-only">Latest Post</h2>
        </header>
        <Link href={`/blog/${latestPost.slug}`}>
          <article className="flex flex-col justify-between md:flex-row-reverse border border-gray-4 rounded-xl md:rounded-3xl transition-colors hover:bg-gray-2 group">
            <aside className="relative basis-2/5 aspect-video md:aspect-[21/6] border-b border-gray-4 md:border-b-0 md:border-l">
              <Image
                src={`https://picsum.photos/seed/${latestPost.slug}/1600/900`}
                alt={`${latestPost.name}'s thumbnail`}
                fill
                className="rounded-t-xl md:rounded-r-3xl md:rounded-l-none object-cover max-w-full max-h-full"
              />
            </aside>
            <section className="flex flex-col gap-3 md:gap-8 p-4 md:p-10 max-w-prose">
              <header>
                <hgroup>
                  <small className="text-gray-8 font-bold tracking-wide uppercase md:text-base">
                    {latestPost.date}
                  </small>
                  <h3 className="text-2xl md:text-5xl font-semibold tracking-tight text-gray-12 text-balance">
                    {latestPost.name}
                  </h3>
                </hgroup>
              </header>

              <p className="text-gray-10 font-medium leading-snug text-pretty md:text-lg">
                {latestPost.lead}
              </p>

              <footer className="font-semibold md:text-lg py-2 md:py-4 text-center border border-gray-4 rounded-md md:rounded-2xl text-gray-10 bg-gray-2 group-hover:bg-gray-3 transition-colors">
                Read More
              </footer>
            </section>
          </article>
        </Link>
      </section>
    </article>
  )
}
