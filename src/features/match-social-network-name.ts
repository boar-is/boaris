import * as M from 'effect/Match'
import { socialNetworkRegexes } from './social-network-regexes'

export const matchSocialNetworkName = M.type<string>().pipe(
  M.when(
    (it) => socialNetworkRegexes.github.test(it),
    () => 'GitHub',
  ),
  M.when(
    (it) => socialNetworkRegexes.twitter.test(it),
    () => 'X',
  ),
  M.when(
    (it) => socialNetworkRegexes.linkedin.test(it),
    () => 'LinkedIn',
  ),
  M.when(
    (it) => socialNetworkRegexes.stackoverflow.test(it),
    () => 'Stack Overflow',
  ),
  M.when(
    (it) => socialNetworkRegexes.discord.test(it),
    () => 'Discord',
  ),
  M.when(
    (it) => socialNetworkRegexes.youtube.test(it),
    () => 'YouTube',
  ),
  M.when(
    (it) => socialNetworkRegexes.reddit.test(it),
    () => 'Reddit',
  ),
  M.when(
    (it) => socialNetworkRegexes.telegram.test(it),
    () => 'Telegram',
  ),
  M.option,
)
