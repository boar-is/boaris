import { Option } from 'effect'

export type Post = {
  slug: string
  title: string
  lead: string
  description: Option.Option<string>
  posterUrl: string
  tags: Array<{
    name: string
  }>
  date: Date
}

export const posts: Array<Post> = [
  {
    slug: 'use-deferred-value',
    title: 'Understanding React Server Components',
    lead: 'useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I’ll show you how! ⚡',
    description: Option.none(),
    posterUrl: '/posts/use-deferred-value/poster.png',
    tags: [
      {
        name: 'TypeScript',
      },
      {
        name: 'React',
      },
    ],
    date: new Date(),
  },
]
