import * as M from 'effect/Match'
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
} from '~/lib/media/icons'
import { socialNetworkRegexes } from './social-network-regexes'

export const matchSocialNetworkIcon = M.type<string>().pipe(
  M.when(
    (it) => socialNetworkRegexes.github.test(it),
    () => GitHubIcon,
  ),
  M.when(
    (it) => socialNetworkRegexes.twitter.test(it),
    () => XIcon,
  ),
  M.when(
    (it) => socialNetworkRegexes.linkedin.test(it),
    () => LinkedInIcon,
  ),
  M.when(
    (it) => socialNetworkRegexes.stackoverflow.test(it),
    () => StackOverflowIcon,
  ),
  M.when(
    (it) => socialNetworkRegexes.discord.test(it),
    () => DiscordIcon,
  ),
  M.when(
    (it) => socialNetworkRegexes.youtube.test(it),
    () => YouTubeIcon,
  ),
  M.when(
    (it) => socialNetworkRegexes.reddit.test(it),
    () => RedditIcon,
  ),
  M.when(
    (it) => socialNetworkRegexes.telegram.test(it),
    () => TelegramIcon,
  ),
  M.orElse(() => LinkIcon),
)
