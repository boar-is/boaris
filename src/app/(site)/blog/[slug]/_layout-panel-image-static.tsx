import { Option } from 'effect'
import { memo } from 'react'
import { Image, type ImageProps, defaultImageSizes } from '~/lib/media/image'
import type { AssetImageStatic } from '~/model/assetImageStatic'
import { PostLayoutPanelFooter, PostLayoutPanelHeader } from './_layout-panel'

export const PostLayoutPanelImageStatic = memo(
  function PostLayoutPanelImageStatic({
    asset: { name, href, alt, caption },
  }: { asset: AssetImageStatic }) {
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
