import { Match } from 'effect'
import { socialNetworkRegexes } from './social-network-regexes'

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
  Match.orElse(() => undefined),
)
