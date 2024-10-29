import { Match } from 'effect'
import { LinkIcon } from '~/lib/media/icons'
import { DiscordIcon } from '~/lib/media/icons/discord'
import { GitHubIcon } from '~/lib/media/icons/github'
import { LinkedInIcon } from '~/lib/media/icons/linkedin'
import { RedditIcon } from '~/lib/media/icons/reddit'
import { StackOverflowIcon } from '~/lib/media/icons/stackoverflow'
import { TelegramIcon } from '~/lib/media/icons/telegram'
import { XIcon } from '~/lib/media/icons/x'
import { YouTubeIcon } from '~/lib/media/icons/youtube'
import { socialNetworkRegexes } from '~/lib/utils/regexes'

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
