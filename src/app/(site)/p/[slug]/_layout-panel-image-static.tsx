import { Option } from 'effect'
import { memo } from 'react'
import { Image, type ImageProps, defaultImageSizes } from '~/lib/media/image'
import type { AssetContentImageStatic } from '~/model/asset'
import { PostLayoutPanelFooter, PostLayoutPanelHeader } from './_layout-panel'

export const PostLayoutPanelImageStatic = memo(
  function PostLayoutPanelImageStatic({
    name,
    content: { href, alt, caption },
  }: { name: string; content: AssetContentImageStatic }) {
    const imageProps = {
      src: href,
      sizes: defaultImageSizes,
      alt: alt.pipe(
        Option.orElse(() => caption),
        Option.getOrElse(
          () => 'The author did not provide any alt to this image',
        ),
      ),
      fill: true,
      quality: 80,
    } satisfies ImageProps

    return (
      <>
        <PostLayoutPanelHeader name={name} />
        <Image
          {...imageProps}
          className="object-cover blur-2xl"
          alt="Image's backdrop blur"
        />
        <section className="flex-1 relative">
          <Image {...imageProps} className="object-contain" />
        </section>
        {caption.pipe(
          Option.andThen((c) => (
            <PostLayoutPanelFooter>{c}</PostLayoutPanelFooter>
          )),
          Option.getOrNull,
        )}
      </>
    )
  },
)
