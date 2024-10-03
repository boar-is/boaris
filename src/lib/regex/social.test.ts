// noinspection HttpUrlsUsage

import { describe, expect, it } from 'vitest'
import {
  gitHubProfileUrlRegex,
  linkedInProfileUrlRegex,
  stackOverflowProfileUrlRegex,
  xProfileUrlRegex,
} from '~/src/lib/regex/social'

describe.concurrent('social network regexes', () => {
  describe.concurrent('GitHub', () => {
    it.concurrent.each([
      'github.com/username-123',
      'github.com/username-123/',
      'www.github.com/username-123',
      'www.github.com/username-123/',
      'https://github.com/username-123',
      'https://github.com/username-123/',
      'https://www.github.com/username-123',
      'https://www.github.com/username-123/',
    ])('should succeed for %s', (url) => {
      expect(gitHubProfileUrlRegex.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://github.com/username', // http is not allowed
      'ftp://github.com/username', // invalid protocol
      'https://github.com/username/repo', // repo url
      'https://github.com/', // no username
      'https://github.com/user name', // a space
      'github.com/user@name', // invalid character @
      'https://gitlab.com/username', // invalid domain
      'https://github.com/username?tab=repositories', // query params
    ])('should fail for %s', (url) => {
      expect(gitHubProfileUrlRegex.test(url)).toBe(false)
    })
  })

  describe.concurrent('LinkedIn Profile URL', () => {
    it.concurrent.each([
      'linkedin.com/in/username-123',
      'linkedin.com/in/username-123/',
      'www.linkedin.com/in/username-123',
      'www.linkedin.com/in/username-123/',
      'https://linkedin.com/in/username-123',
      'https://linkedin.com/in/username-123/',
      'https://www.linkedin.com/in/username-123',
      'https://www.linkedin.com/in/username-123/',
    ])('should succeed for %s', (url) => {
      expect(linkedInProfileUrlRegex.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://linkedin.com/in/username', // invalid because http not allowed
      'ftp://linkedin.com/in/username', // invalid protocol
      'https://linkedin.com/in/', // invalid because no username
      'https://linkedin.com/in/user name', // invalid due to space
      'linkedin.com/in/user@name', // invalid character @
      'https://linkedin.com/in/user/extra/', // invalid due to an extra path
      'https://www.linkedin.com/company/username', // invalid because it’s a company page
      'https://linkedin.com/in/username?trk=profile-badge', // invalid due to query params
    ])('should fail for %s', (url) => {
      expect(linkedInProfileUrlRegex.test(url)).toBe(false)
    })
  })

  describe.concurrent('X (Twitter) Profile URL', () => {
    it.concurrent.each([
      'twitter.com/username_123',
      'twitter.com/username_123/',
      'x.com/username_123',
      'x.com/username_123/',
      'www.twitter.com/username_123',
      'www.twitter.com/username_123/',
      'www.x.com/username_123',
      'www.x.com/username_123/',
      'https://twitter.com/username_123',
      'https://twitter.com/username_123/',
      'https://x.com/username_123',
      'https://x.com/username_123/',
      'https://www.twitter.com/username_123',
      'https://www.twitter.com/username_123/',
      'https://www.x.com/username_123',
      'https://www.x.com/username_123/',
    ])('should succeed for %s', (url) => {
      expect(xProfileUrlRegex.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://twitter.com/username', // invalid because http not allowed
      'http://x.com/username', // invalid because http not allowed
      'ftp://twitter.com/username', // invalid protocol
      'ftp://x.com/username', // invalid protocol
      'https://twitter.com/username/repo', // invalid because it's a repository
      'https://x.com/username/repo', // invalid because it's a repository
      'https://twitter.com/', // invalid because no username
      'https://x.com/', // invalid because no username
      'https://twitter.com/user name', // invalid due to space
      'https://x.com/user name', // invalid due to space
      'twitter.com/user@name', // invalid character @
      'x.com/user@name', // invalid character @
      'https://twitter.com/user/extra/', // invalid due to an extra path
      'https://x.com/user/extra/', // invalid due to an extra path
      'https://www.twitter.com/username?lang=en', // invalid due to query params
      'https://www.x.com/username?lang=en', // invalid due to query params
      'https://t.co/username', // invalid because it's a link shortener
    ])('should fail for %s', (url) => {
      expect(xProfileUrlRegex.test(url)).toBe(false)
    })
  })

  describe.concurrent('Stack Overflow Profile URL', () => {
    it.concurrent.each([
      'stackoverflow.com/users/12345/username-123',
      'stackoverflow.com/users/12345/username-123/',
      'www.stackoverflow.com/users/12345/username-123',
      'www.stackoverflow.com/users/12345/username-123/',
      'https://stackoverflow.com/users/12345/username-123',
      'https://stackoverflow.com/users/12345/username-123/',
      'https://www.stackoverflow.com/users/12345/username-123',
      'https://www.stackoverflow.com/users/12345/username-123/',
    ])('should succeed for %s', (url) => {
      expect(stackOverflowProfileUrlRegex.test(url)).toBe(true)
    })

    it.concurrent.each([
      'http://stackoverflow.com/users/12345/username', // invalid because http not allowed
      'ftp://stackoverflow.com/users/12345/username', // invalid protocol
      'https://stackoverflow.com/users/username', // invalid because no user ID
      'https://stackoverflow.com/users/12345/', // invalid because no username
      'https://stackoverflow.com/users/12345/user name', // invalid due to space
      'stackoverflow.com/users/12345/user@name', // invalid character @
      'https://stackoverflow.com/users/12345/user/extra/', // invalid due to an extra path
      'https://www.stackoverflow.com/users/12345/username?tab=profile', // invalid due to query params
      'https://www.stackoverflow.com/users/12345/username/extra', // invalid due to an extra path
    ])('should fail for %s', (url) => {
      expect(stackOverflowProfileUrlRegex.test(url)).toBe(false)
    })
  })
})
