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
    <div className="container">
      <article className="grid [grid-template-areas:'aside'_'header'_'body'_'footer'] md:[grid-template-areas:'aside_header'_'aside_body'_'aside_footer'] justify-items-center py-12 gap-2">
        <aside className="[grid-area:aside]">
          <div className="relative">
            <img
              src={user.avatarSrc}
              alt={`${user.name} avatar's blur`}
              aria-hidden="true"
              className="absolute rounded-3xl blur-3xl scale-75 max-w-full max-h-full -z-1"
            />
            <img
              src={user.avatarSrc}
              alt={`${user.name}'s avatar`}
              className="size-28 rounded-3xl"
            />
          </div>
        </aside>
        <header className="[grid-area:header]">
          <hgroup className="text-center">
            <h1 className="text-balance font-semibold text-2xl text-gray-12 tracking-tight">
              {user.name}
            </h1>
            <small className="-mt-1 font-medium text-gray-10 text-lg tracking-tight">
              boar.is
            </small>
          </hgroup>
        </header>
        <section className="[grid-area:'body'] text-center text-pretty font-medium max-w-prose">
          <p>{user.bio}</p>
        </section>
        <footer className="[grid-area:'footer'] py-2">
          <ul className="flex items-center gap-8">
            <li>
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="size-7 rounded-sm"
              >
                <span className="sr-only">GitHub Profile</span>
                <GitHubIcon className="transition-colors text-gray-7 hover:text-gray-8" />
              </a>
            </li>
            <li>
              <a
                href={user.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="size-7 rounded-sm"
              >
                <span className="sr-only">LinkedIn Profile</span>
                <LinkedInIcon className="transition-colors text-gray-7 hover:text-gray-8" />
              </a>
            </li>
            <li>
              <a
                href={user.xUrl}
                target="_blank"
                rel="noreferrer"
                className="size-7 rounded-sm"
              >
                <span className="sr-only">Twitter Profile</span>
                <XIcon className="transition-colors text-gray-7 hover:text-gray-8" />
              </a>
            </li>
          </ul>
        </footer>
      </article>
      <article>
        <header>
          <h2 className="capitalize text-xl text-gray-10 font-semibold tracking-tight">
            Recently published
          </h2>
        </header>
        <section className="flex flex-col gap-24 py-16">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              prefetch={false}
              className="rounded-sm"
            >
              <article className="grid relative [grid-template-areas:'header'_'aside'_'body'_'footer'] md:[grid-template-areas:'aside_header'_'aside_body'_'aside_footer']">
                <aside className="[grid-area:aside]">
                  <div className="relative">
                    <img
                      src={`https://picsum.photos/seed/${post.slug}/640/480`}
                      alt={`${post.name} thumbnail's blur`}
                      className="absolute rounded-3xl blur-3xl scale-75 max-w-full max-h-full -z-1"
                    />
                    <img
                      src={`https://picsum.photos/seed/${post.slug}/640/480`}
                      alt={`${post.name}'s thumbnail`}
                      className="rounded-3xl"
                    />
                  </div>
                </aside>
                <header className="[grid-area:header] text-gray-12 text-2xl tracking-tight font-semibold">
                  <h3 className="balance">{post.name}</h3>
                </header>
                <section className="font-medium text-pretty max-w-prose">
                  <p>{post.lead}</p>
                </section>
                <footer className="[grid-area:footer] text-gray-8 text-sm font-bold">
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
