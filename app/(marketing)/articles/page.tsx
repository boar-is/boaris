import Link from 'next/link'
import { GitHubIcon, LinkedInIcon, XIcon } from '~/components/icons'
import { socialUrls } from '~/lib/data'

type PersonalWorkspaceData = {
  user: {
    name: string
    bio: string
    avatarSrc: string
    githubUrl: string
    linkedinUrl: string
    xUrl: string
  }
  posts: Array<{
    slug: string
    name: string
    lead: string
    date: string
  }>
}

const blogData = {
  user: {
    name: 'Boris Zubchenko',
    bio: 'I help moderate content and welcome new users to this platform. I also ask questions on behalf of members looking for advice from the community.',
    avatarSrc: 'https://avatars.githubusercontent.com/u/31354262?v=4',
    githubUrl: socialUrls.github,
    linkedinUrl: socialUrls.linkedin,
    xUrl: socialUrls.x,
  },
  posts: [
    {
      slug: 'promises',
      name: 'Promises from the ground up',
      lead: 'The “Promises” API is a surprisingly tricky part of modern JavaScript. Without the right context, it doesn’t make much sense at all! In this tutorial, you’ll build an intuition for how Promises work by getting a deeper understanding of JavaScript and its limitations.',
      date: '15 Aug',
    },
    {
      slug: 'deferred-value',
      name: 'Snappy UI Optimization with useDeferredValue',
      lead: "useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I'll show you how! ⚡",
      date: '28 Jul',
    },
    {
      slug: 'css-in-rsc',
      name: 'CSS in React Server Components',
      lead: 'You can’t make an omelette without cracking a few eggs, and when the core React team unveiled their vision for the future of React, some of my favourite libraries got scrambled 😅. In this blog post, we’re going to explore the compatibility issues between React Server Components and CSS-in-JS libraries like styled-components. You’ll understand what the issue is, what the options are, and what’s on the horizon.',
      date: '9 Jun',
    },
  ],
} satisfies PersonalWorkspaceData

export default function BlogPage() {
  const { user, posts } = blogData

  return (
    <div className="container flex flex-col gap-14 md:gap-20">
      <article className="grid [grid-template-areas:'aside'_'header'_'body'_'footer'] justify-items-center gap-4 md:gap-6 bg-gray-2 rounded-xl p-4 md:p-6 mt-20 md:mt-24">
        <aside className="[grid-area:aside]">
          <div className="relative isolate -mt-20 md:-mt-24">
            <img
              src={user.avatarSrc}
              alt={`${user.name}'s avatar`}
              className="relative size-32 md:size-40 rounded-3xl border-8 border-gray-1"
            />
          </div>
        </aside>
        <header className="[grid-area:header]">
          <hgroup className="text-center">
            <h1 className="text-balance font-semibold text-2xl md:text-4xl text-gray-12 tracking-tight">
              {user.name}
            </h1>
            <small className="-mt-1 font-medium text-gray-9 text-lg md:text-xl tracking-tight">
              boar.is
            </small>
          </hgroup>
        </header>
        <section className="[grid-area:'body'] text-center text-pretty font-medium leading-snug max-w-prose text-gray-10 md:text-lg">
          <p>{user.bio}</p>
        </section>
        <footer className="[grid-area:'footer'] py-2 md:py-4">
          <ul className="flex items-center gap-8">
            <li>
              <a
                href={user.githubUrl}
                target="_blank"
                className="rounded-sm"
                rel="noreferrer"
              >
                <span className="sr-only">GitHub Profile</span>
                <GitHubIcon className="transition-colors text-gray-7 size-7 md:size-9 hover:text-gray-9" />
              </a>
            </li>
            <li>
              <a
                href={user.linkedinUrl}
                target="_blank"
                className="rounded-sm"
                rel="noreferrer"
              >
                <span className="sr-only">LinkedIn Profile</span>
                <LinkedInIcon className="transition-colors text-gray-7 size-7 md:size-9 hover:text-gray-9" />
              </a>
            </li>
            <li>
              <a
                href={user.xUrl}
                target="_blank"
                className="rounded-sm"
                rel="noreferrer"
              >
                <span className="sr-only">Twitter Profile</span>
                <XIcon className="transition-colors text-gray-7 size-7 md:size-9 hover:text-gray-9" />
              </a>
            </li>
          </ul>
        </footer>
      </article>
      <article>
        <section className="flex flex-col gap-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              prefetch={false}
              className="rounded-md"
            >
              <article className="grid relative [grid-template-areas:'header'_'footer'_'body'_'aside'] md:[grid-template-areas:'aside_header'_'aside_body'_'aside_footer'] p-2">
                <header className="[grid-area:header] text-gray-12 text-2xl tracking-tight font-semibold">
                  <h3 className="balance">{post.name}</h3>
                </header>
                <aside className="[grid-area:aside]">
                  <div className="relative">
                    <img
                      src={`https://picsum.photos/seed/${post.slug}/640/480`}
                      alt={`${post.name} thumbnail's blur`}
                      className="absolute rounded-xl blur-3xl scale-75 max-w-full max-h-full pointer-events-none"
                    />
                    <img
                      src={`https://picsum.photos/seed/${post.slug}/640/480`}
                      alt={`${post.name}'s thumbnail`}
                      className="relative rounded-xl"
                    />
                  </div>
                </aside>
                <section className="font-medium text-pretty max-w-prose text-gray-10 leading-snug my-4">
                  <p>{post.lead}</p>
                </section>
                <footer className="[grid-area:footer] text-gray-9 text-sm font-bold">
                  <small>{post.date}</small>
                </footer>
              </article>
            </Link>
          ))}
        </section>
      </article>
    </div>
  )
}
