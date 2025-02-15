import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { postRepository } from '~/model/data/post'

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
      style={{
        position: 'relative',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Inter',
        width: '100%',
        height: '100%',
        background: '#000',
        color: '#fff',
        textShadow: '0 2px 6px #000',
      }}
    >
      <h1
        style={{
          fontSize: '3.75rem',
          lineHeight: '3.75rem',
          maxWidth: '48rem',
          letterSpacing: '-0.025em',
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'transparent',
          backgroundClip: 'text',
          backgroundImage: 'linear-gradient(to bottom, #eceeed, #adb5b2)',
          boxShadow: '0 2px 6px #000',
        }}
      >
        {post.title}
      </h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '3rem',
          lineHeight: '3rem',
          fontWeight: '700',
        }}
      >
        <img
          src={iconSrc as unknown as string}
          width={72}
          height={72}
          alt="N/A"
          style={{
            borderRadius: '1rem',
            marginRight: '1rem',
          }}
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
