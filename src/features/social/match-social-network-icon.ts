import { Match } from 'effect'
import {
  DiscordIcon,
  GitHubIcon,
  LinkIcon,
  LinkedInIcon,
  RedditIcon,
  StackOverflowIcon,
  TelegramIcon,
  XIcon,
  YouTubeIcon,
} from '~/lib/icons/icons'
import { socialNetworkRegexes } from './social-network-regexes'

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
