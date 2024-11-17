// noinspection HttpUrlsUsage

import { describe, expect, it } from 'vitest'
import { socialNetworkRegexes } from '~/lib/regexes/social-network-regexes'

describe.concurrent('socialNetworkRegexes', () => {
  describe.concurrent('GitHub', () => {
    it.concurrent.each([
      'github.com/username',
      'www.github.com/username',
      'https://github.com/username',
      'https://www.github.com/username',
      'https://www.github.com/username/',
      'https://www.github.com/username/repo',
    ])('should succeed for %s', (url) => {
      expect(socialNetworkRegexes.github.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://github.com/username',
      'ftp://github.com/username',
      'https://gitlab.com/username',
    ])('should fail for %s', (url) => {
      expect(socialNetworkRegexes.github.test(url)).toBe(false)
    })
  })

  describe.concurrent('X (Twitter)', () => {
    it.concurrent.each([
      'twitter.com/username',
      'x.com/username',
      'www.twitter.com/username',
      'https://twitter.com/username',
      'https://www.twitter.com/username',
      'https://x.com/username/',
      'https://twitter.com/username/status/12345',
    ])('should succeed for %s', (url) => {
      expect(socialNetworkRegexes.twitter.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://twitter.com/username',
      'ftp://twitter.com/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialNetworkRegexes.twitter.test(url)).toBe(false)
    })
  })

  describe.concurrent('LinkedIn', () => {
    it.concurrent.each([
      'linkedin.com/in/username',
      'www.linkedin.com/in/username',
      'https://linkedin.com/in/username',
      'https://www.linkedin.com/in/username',
      'https://linkedin.com/company/companyname',
      'https://www.linkedin.com/pub/username',
    ])('should succeed for %s', (url) => {
      expect(socialNetworkRegexes.linkedin.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://linkedin.com/in/username',
      'ftp://linkedin.com/in/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialNetworkRegexes.linkedin.test(url)).toBe(false)
    })
  })

  describe.concurrent('Stack Overflow', () => {
    it.concurrent.each([
      'stackoverflow.com/users/12345/username',
      'www.stackoverflow.com/users/12345/username',
      'https://stackoverflow.com/users/12345/username',
      'https://www.stackoverflow.com/users/12345/username',
    ])('should succeed for %s', (url) => {
      expect(socialNetworkRegexes.stackoverflow.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://stackoverflow.com/users/12345/username',
      'ftp://stackoverflow.com/users/12345/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialNetworkRegexes.stackoverflow.test(url)).toBe(false)
    })
  })

  describe.concurrent('Discord', () => {
    it.concurrent.each([
      'discord.gg/abc123',
      'www.discord.gg/abc123',
      'https://discord.gg/abc123',
      'https://www.discord.gg/abc123/',
    ])('should succeed for %s', (url) => {
      expect(socialNetworkRegexes.discord.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://discord.gg/abc123',
      'ftp://discord.gg/abc123',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialNetworkRegexes.discord.test(url)).toBe(false)
    })
  })

  describe.concurrent('YouTube', () => {
    it.concurrent.each([
      'youtube.com/user/username',
      'www.youtube.com/user/username',
      'https://youtube.com/user/username',
      'https://www.youtube.com/user/username',
      'https://youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
    ])('should succeed for %s', (url) => {
      expect(socialNetworkRegexes.youtube.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://youtube.com/user/username',
      'ftp://youtube.com/user/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialNetworkRegexes.youtube.test(url)).toBe(false)
    })
  })

  describe.concurrent('Reddit', () => {
    it.concurrent.each([
      'reddit.com/user/username',
      'www.reddit.com/user/username',
      'https://reddit.com/user/username',
      'https://www.reddit.com/user/username',
      'https://reddit.com/r/subreddit',
      'https://www.reddit.com/r/subreddit/',
    ])('should succeed for %s', (url) => {
      expect(socialNetworkRegexes.reddit.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://reddit.com/user/username',
      'ftp://reddit.com/user/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialNetworkRegexes.reddit.test(url)).toBe(false)
    })
  })

  describe.concurrent('Telegram', () => {
    it.concurrent.each([
      't.me/username',
      'www.t.me/username',
      'https://t.me/username',
      'https://www.t.me/username/',
    ])('should succeed for %s', (url) => {
      expect(socialNetworkRegexes.telegram.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://t.me/username',
      'ftp://t.me/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialNetworkRegexes.telegram.test(url)).toBe(false)
    })
  })
})
