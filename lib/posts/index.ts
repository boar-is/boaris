export type Post = {
  name: string
}

export const posts: Record<string, Post> = {
  promises: {
    name: 'Promises from the ground up',
  },
}
