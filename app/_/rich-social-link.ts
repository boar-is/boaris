import type { FC } from 'react'
import type { PropsWithClassName } from '~/src/lib/react/props-with-class-name'

export type RichSocialLink = {
  label: string
  icon: FC<PropsWithClassName>
  href: string
}
