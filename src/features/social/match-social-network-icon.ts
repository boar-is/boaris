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
} from '~/src/components/icons'
import { socialRegexes } from '~/src/lib/regex/social'

export const matchSocialNetworkIcon = Match.type<string>().pipe(
  Match.when(
    (it) => socialRegexes.github.test(it),
    () => GitHubIcon,
  ),
  Match.when(
    (it) => socialRegexes.twitter.test(it),
    () => XIcon,
  ),
  Match.when(
    (it) => socialRegexes.linkedin.test(it),
    () => LinkedInIcon,
  ),
  Match.when(
    (it) => socialRegexes.stackoverflow.test(it),
    () => StackOverflowIcon,
  ),
  Match.when(
    (it) => socialRegexes.discord.test(it),
    () => DiscordIcon,
  ),
  Match.when(
    (it) => socialRegexes.youtube.test(it),
    () => YouTubeIcon,
  ),
  Match.when(
    (it) => socialRegexes.reddit.test(it),
    () => RedditIcon,
  ),
  Match.when(
    (it) => socialRegexes.telegram.test(it),
    () => TelegramIcon,
  ),
  Match.orElse(() => LinkIcon),
)
