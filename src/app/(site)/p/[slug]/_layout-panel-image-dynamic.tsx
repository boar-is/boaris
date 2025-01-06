import { Option } from 'effect'
import { type ComponentPropsWithoutRef, memo } from 'react'
import { cx } from '~/lib/react/cx'
import type { AssetContentImageDynamic } from '~/model/asset'
import { PostLayoutPanelFooter, PostLayoutPanelHeader } from './_layout-panel'

export const PostLayoutPanelImageDynamic = memo(
  function PostLayoutPanelImageDynamic({
    name,
    content: { href, caption },
  }: { name: string; content: AssetContentImageDynamic }) {
    const { className, ...videoProps }: ComponentPropsWithoutRef<'video'> = {
      className: 'absolute inset-0 size-full',
      src: href,
      autoPlay: true,
      playsInline: true,
      muted: true,
      loop: true,
    }

    return (
      <>
        <PostLayoutPanelHeader name={name} />
        <video
          {...videoProps}
          className={cx(className, '-z-[2] object-cover blur-2xl')}
        />
        <section className="flex-1 relative items-center">
          <video
            {...videoProps}
            className={cx(className, 'object-contain object-center')}
          />
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
