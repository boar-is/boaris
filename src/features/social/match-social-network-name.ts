import { Match } from 'effect'
import { socialRegexes } from '~/src/lib/regex/social'

export const matchSocialNetworkName = Match.type<string>().pipe(
  Match.when(
    (it) => socialRegexes.github.test(it),
    () => 'GitHub',
  ),
  Match.when(
    (it) => socialRegexes.twitter.test(it),
    () => 'X',
  ),
  Match.when(
    (it) => socialRegexes.linkedin.test(it),
    () => 'LinkedIn',
  ),
  Match.when(
    (it) => socialRegexes.stackoverflow.test(it),
    () => 'Stack Overflow',
  ),
  Match.when(
    (it) => socialRegexes.discord.test(it),
    () => 'Discord',
  ),
  Match.when(
    (it) => socialRegexes.youtube.test(it),
    () => 'YouTube',
  ),
  Match.when(
    (it) => socialRegexes.reddit.test(it),
    () => 'Reddit',
  ),
  Match.when(
    (it) => socialRegexes.telegram.test(it),
    () => 'Telegram',
  ),
  Match.orElse(() => null),
)
