import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { resolveUrl } from '~/lib/routing/resolvers'
import { postRepository } from '~/model/data/post'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function PostImage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = postRepository.find((it) => it.slug === slug)

  if (!post) {
    return notFound()
  }

  const iconSrc = await fetch(new URL('~/app/icon.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  )

  return new ImageResponse(
    <div
      tw="relative flex flex-col justify-center items-center gap-16 w-full h-full bg-black"
      style={{ fontFamily: 'Inter', fontWeight: 'normal', color: '#eceeed' }}
    >
      <img
        src={resolveUrl(post.posterUrl)}
        alt="N/A"
        tw="absolute w-full h-full opacity-50"
        style={{
          filter: 'blur(8px)',
        }}
      />
      <h1
        tw="text-6xl max-w-3xl tracking-tight text-center font-bold"
        style={{
          color: 'transparent',
          backgroundClip: 'text',
          backgroundImage: 'linear-gradient(to bottom, #eceeed, #adb5b2)',
        }}
      >
        {post.title}
      </h1>
      <div tw="flex items-center text-5xl tracking-tighter">
        <img
          src={iconSrc as unknown as string}
          width={72}
          height={72}
          alt="N/A"
          tw="rounded-2xl mr-4"
        />
        <span style={{ opacity: 0.8 }}>Boaris</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL(
              '~/lib/media/fonts/files/Inter-Regular.ttf',
              import.meta.url,
            ),
          ).then((res) => res.arrayBuffer()),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: await fetch(
            new URL('~/lib/media/fonts/files/Inter-Bold.ttf', import.meta.url),
          ).then((res) => res.arrayBuffer()),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )
}
