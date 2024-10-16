// noinspection HttpUrlsUsage

import { describe, expect, it } from 'vitest'
import { socialRegexes } from '~/src/lib/regex/social'

describe.concurrent('social network regexes', () => {
  describe.concurrent('github', () => {
    it.concurrent.each([
      'github.com/username',
      'www.github.com/username',
      'https://github.com/username',
      'https://www.github.com/username',
      'https://www.github.com/username/',
      'https://www.github.com/username/repo',
    ])('should succeed for %s', (url) => {
      expect(socialRegexes.github.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://github.com/username',
      'ftp://github.com/username',
      'https://gitlab.com/username',
    ])('should fail for %s', (url) => {
      expect(socialRegexes.github.test(url)).toBe(false)
    })
  })

  describe.concurrent('x (twitter)', () => {
    it.concurrent.each([
      'twitter.com/username',
      'x.com/username',
      'www.twitter.com/username',
      'https://twitter.com/username',
      'https://www.twitter.com/username',
      'https://x.com/username/',
      'https://twitter.com/username/status/12345',
    ])('should succeed for %s', (url) => {
      expect(socialRegexes.twitter.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://twitter.com/username',
      'ftp://twitter.com/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialRegexes.twitter.test(url)).toBe(false)
    })
  })

  describe.concurrent('linkedin', () => {
    it.concurrent.each([
      'linkedin.com/in/username',
      'www.linkedin.com/in/username',
      'https://linkedin.com/in/username',
      'https://www.linkedin.com/in/username',
      'https://linkedin.com/company/companyname',
      'https://www.linkedin.com/pub/username',
    ])('should succeed for %s', (url) => {
      expect(socialRegexes.linkedin.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://linkedin.com/in/username',
      'ftp://linkedin.com/in/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialRegexes.linkedin.test(url)).toBe(false)
    })
  })

  describe.concurrent('stackoverflow', () => {
    it.concurrent.each([
      'stackoverflow.com/users/12345/username',
      'www.stackoverflow.com/users/12345/username',
      'https://stackoverflow.com/users/12345/username',
      'https://www.stackoverflow.com/users/12345/username',
    ])('should succeed for %s', (url) => {
      expect(socialRegexes.stackoverflow.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://stackoverflow.com/users/12345/username',
      'ftp://stackoverflow.com/users/12345/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialRegexes.stackoverflow.test(url)).toBe(false)
    })
  })

  describe.concurrent('discord', () => {
    it.concurrent.each([
      'discord.gg/abc123',
      'www.discord.gg/abc123',
      'https://discord.gg/abc123',
      'https://www.discord.gg/abc123/',
    ])('should succeed for %s', (url) => {
      expect(socialRegexes.discord.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://discord.gg/abc123',
      'ftp://discord.gg/abc123',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialRegexes.discord.test(url)).toBe(false)
    })
  })

  describe.concurrent('youtube', () => {
    it.concurrent.each([
      'youtube.com/user/username',
      'www.youtube.com/user/username',
      'https://youtube.com/user/username',
      'https://www.youtube.com/user/username',
      'https://youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
    ])('should succeed for %s', (url) => {
      expect(socialRegexes.youtube.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://youtube.com/user/username',
      'ftp://youtube.com/user/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialRegexes.youtube.test(url)).toBe(false)
    })
  })

  describe.concurrent('reddit', () => {
    it.concurrent.each([
      'reddit.com/user/username',
      'www.reddit.com/user/username',
      'https://reddit.com/user/username',
      'https://www.reddit.com/user/username',
      'https://reddit.com/r/subreddit',
      'https://www.reddit.com/r/subreddit/',
    ])('should succeed for %s', (url) => {
      expect(socialRegexes.reddit.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://reddit.com/user/username',
      'ftp://reddit.com/user/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialRegexes.reddit.test(url)).toBe(false)
    })
  })

  describe.concurrent('telegram', () => {
    it.concurrent.each([
      't.me/username',
      'www.t.me/username',
      'https://t.me/username',
      'https://www.t.me/username/',
    ])('should succeed for %s', (url) => {
      expect(socialRegexes.telegram.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://t.me/username',
      'ftp://t.me/username',
      'https://github.com/username',
    ])('should fail for %s', (url) => {
      expect(socialRegexes.telegram.test(url)).toBe(false)
    })
  })
})
