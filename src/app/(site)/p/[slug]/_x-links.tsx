import { buttonStyles } from '~/lib/buttons/button-styles'
import { XIcon } from '~/lib/media/icons'
import type { ImageIconProps } from '~/lib/media/icons/_base'
import { Link, type LinkProps } from '~/lib/navigation/link'

const linkProps: LinkProps = {
  className: buttonStyles({
    intent: 'secondary',
  }),
  target: '_blank',
}

const iconProps: ImageIconProps = {
  className: '~size-3/4 ~ml-1/1.5',
}

export function PostLinkShareOnX({ text, url }: { text: string; url: string }) {
  return (
    <Link
      {...linkProps}
      href={`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
    >
      Share on <XIcon {...iconProps} />
    </Link>
  )
}

export function PostLinkDiscussOnX({ url }: { url: string }) {
  return (
    <Link {...linkProps} href={url}>
      Discuss on <XIcon {...iconProps} />
    </Link>
  )
}
