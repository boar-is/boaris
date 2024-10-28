import { type Infer, v } from 'convex/values'
import { Match, Option, Schema } from 'effect'
import { LinkIcon } from '~/lib/media/icons'
import { DiscordIcon } from '~/lib/media/icons/discord'
import { GitHubIcon } from '~/lib/media/icons/github'
import { LinkedInIcon } from '~/lib/media/icons/linkedin'
import { RedditIcon } from '~/lib/media/icons/reddit'
import { StackOverflowIcon } from '~/lib/media/icons/stackoverflow'
import { TelegramIcon } from '~/lib/media/icons/telegram'
import { XIcon } from '~/lib/media/icons/x'
import { YouTubeIcon } from '~/lib/media/icons/youtube'

export const socialLink = v.object({
  href: v.string(),
  label: v.optional(v.string()),
})

export class SocialLink extends Schema.Class<SocialLink>('SocialLink')({
  href: Schema.NonEmptyTrimmedString,
  label: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
}) {
  static encodedFromEntity({
    href,
    label,
  }: Infer<typeof socialLink>): typeof SocialLink.Encoded {
    return {
      href,
      label,
    }
  }
}

export const getComputedLabel = ({ label, href }: typeof SocialLink.Type) =>
  label.pipe(
    Option.orElse(() => matchSocialNetworkName(href)),
    Option.getOrElse(() => 'Link'),
  )

export const socialNetworkRegexes = {
  github: /^(https:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?(.*)?$/,
  twitter:
    /^(https:\/\/)?(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_.-]+\/?(.*)?$/,
  linkedin:
    /^(https:\/\/)?(www\.)?linkedin\.com\/(in|company|pub)\/[A-Za-z0-9_-]+\/?$/,
  stackoverflow:
    /^(https:\/\/)?(www\.)?stackoverflow\.com\/users\/[0-9]+\/[A-Za-z0-9_-]+\/?$/,
  discord: /^(https:\/\/)?(www\.)?discord\.gg\/[A-Za-z0-9_-]+\/?$/,
  youtube:
    /^(https:\/\/)?(www\.)?youtube\.com\/(user|channel|watch|c|embed)\/?[A-Za-z0-9_.-]*\/?(.*)?(\?v=[A-Za-z0-9_-]+)?$|^(https:\/\/)?(www\.)?youtu\.be\/[A-Za-z0-9_-]+\/?$/,
  reddit: /^(https:\/\/)?(www\.)?reddit\.com\/(user|r)\/[A-Za-z0-9_-]+\/?$/,
  telegram: /^(https:\/\/)?(www\.)?t\.me\/[A-Za-z0-9_-]+\/?$/,
} as const

export const matchSocialNetworkIcon = Match.type<string>().pipe(
  Match.when(
    (it) => socialNetworkRegexes.github.test(it),
    () => GitHubIcon,
  ),
  Match.when(
    (it) => socialNetworkRegexes.twitter.test(it),
    () => XIcon,
  ),
  Match.when(
    (it) => socialNetworkRegexes.linkedin.test(it),
    () => LinkedInIcon,
  ),
  Match.when(
    (it) => socialNetworkRegexes.stackoverflow.test(it),
    () => StackOverflowIcon,
  ),
  Match.when(
    (it) => socialNetworkRegexes.discord.test(it),
    () => DiscordIcon,
  ),
  Match.when(
    (it) => socialNetworkRegexes.youtube.test(it),
    () => YouTubeIcon,
  ),
  Match.when(
    (it) => socialNetworkRegexes.reddit.test(it),
    () => RedditIcon,
  ),
  Match.when(
    (it) => socialNetworkRegexes.telegram.test(it),
    () => TelegramIcon,
  ),
  Match.orElse(() => LinkIcon),
)

export const matchSocialNetworkName = Match.type<string>().pipe(
  Match.when(
    (it) => socialNetworkRegexes.github.test(it),
    () => 'GitHub',
  ),
  Match.when(
    (it) => socialNetworkRegexes.twitter.test(it),
    () => 'X',
  ),
  Match.when(
    (it) => socialNetworkRegexes.linkedin.test(it),
    () => 'LinkedIn',
  ),
  Match.when(
    (it) => socialNetworkRegexes.stackoverflow.test(it),
    () => 'Stack Overflow',
  ),
  Match.when(
    (it) => socialNetworkRegexes.discord.test(it),
    () => 'Discord',
  ),
  Match.when(
    (it) => socialNetworkRegexes.youtube.test(it),
    () => 'YouTube',
  ),
  Match.when(
    (it) => socialNetworkRegexes.reddit.test(it),
    () => 'Reddit',
  ),
  Match.when(
    (it) => socialNetworkRegexes.telegram.test(it),
    () => 'Telegram',
  ),
  Match.option,
)
