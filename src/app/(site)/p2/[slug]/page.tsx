export const dynamicParams = false

export function generateStaticParams() {
  return [
    {
      slug: 'nextjs-metadata',
    },
  ]
}

export default async function PostPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Post } = await import(`~/content/${slug}.mdx`)

  return (
    <div>
      Hello
      <br />
      <Post />
    </div>
  )
}
