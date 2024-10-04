import type { FC } from 'react'
import { matchSocialNetworkIcon } from '~/src/lib/matchers/match-social-network-icon'
import { matchSocialNetworkName } from '~/src/lib/matchers/match-social-network-name'
import type { PropsWithClassName } from '~/src/lib/react/props-with-class-name'
import type { WorkspaceSocialLinkVm } from '~/src/rpc/query-workspace'

export const getRichSocialLinks = (
  links: ReadonlyArray<WorkspaceSocialLinkVm> | null,
): ReadonlyArray<{
  label: string
  icon: FC<PropsWithClassName>
  href: string
}> | null =>
  links?.map(({ href, label }) => {
    const computedLabel = label ?? matchSocialNetworkName(href) ?? 'Link'
    const icon = matchSocialNetworkIcon(href)

    return {
      label: computedLabel,
      icon: icon,
      href,
    }
  }) ?? null
