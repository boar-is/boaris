import { DateTime, Option, Schema } from 'effect'
import {
  type OffsetChange,
  createOffsetChangesShifter,
} from '~/lib/cm/offset-change'
import { textFromTemplate } from '~/lib/cm/text'
import { JsonContentFromJson } from '~/lib/pm/json-content'
import { AssetImageStatic } from '~/model/assetImageStatic'
import { Asset } from './asset'
import { AssetText } from './assetText'
import { LayoutChange } from './layoutChange'

export class Post extends Schema.Class<Post>('Post')({
  slug: Schema.NonEmptyTrimmedString,
  title: Schema.NonEmptyTrimmedString,
  lead: Schema.NonEmptyTrimmedString,
  description: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  posterUrl: Schema.NonEmptyTrimmedString,
  tags: Schema.Array(Schema.NonEmptyTrimmedString),
  captions: JsonContentFromJson,
  interpolation: Schema.Struct({
    input: Schema.NonEmptyArray(Schema.Number),
    output: Schema.NonEmptyArray(Schema.Number),
  }),
  layoutChanges: Schema.Array(LayoutChange),
  assets: Schema.Array(Asset),
  date: Schema.DateTimeUtcFromNumber,
  updateDate: Schema.DateTimeUtcFromNumber,
}) {}

const shiftChanges = createOffsetChangesShifter()

const createPositionToProgress = (docSize: number) => (pos: number) =>
  pos / docSize

const s1 = 10844
const pp1 = createPositionToProgress(s1)
const lc1 = (pos: number, areas: string) =>
  new LayoutChange({ offset: pp1(pos), areas })
const ch1 = (
  from: number,
  to: number,
  changes: ReadonlyArray<typeof OffsetChange.Encoded>,
) => shiftChanges(changes)(pp1(from), pp1(to))

export const posts: ReadonlyArray<Post> = [
  new Post({
    slug: 'nextjs-metadata',
    title: 'The Ultimate Next.js Metadata Guide for 2025',
    lead: 'The Next.js Metadata API gives us tools but no map. This is the map: a simple, practical guide to set it up, forget it, and move on. Stop wasting time on metadata and focus on what really matters — building your project.',
    description: Option.some(
      'The Next.js Metadata API gives us tools but no map. This is the map: set it up, forget it, and get back to building what matters.',
    ),
    posterUrl: '/assets/nextjs-metadata/poster.webp',
    tags: ['Next.js'],
    captions: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Most of us developers ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'hate',
            },
            {
              type: 'text',
              text: ' dealing with SEO.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'It’s frustrating, it’s not part of business logic, and it’s definitely ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'not',
            },
            {
              type: 'text',
              text: ' fun.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But it needs to be done.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'And we just want to get it done quickly.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Next.js gives us a flexible ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                  },
                },
              ],
              text: 'Metadata API',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But it doesn’t show what works best for ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'most',
            },
            {
              type: 'text',
              text: ' projects.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Instead, it makes us think about stuff we didn’t even know we needed.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'So we search for guides.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But they don’t help.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'They explain SEO 101.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But we already know that',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'They use placeholders like ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'example.com',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But we need a way to get an environment-aware URL.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'They tell us to add a ton of icons and a PWA manifest.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But our guts say it’s overkill.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'At that point, the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'only',
            },
            {
              type: 'text',
              text: ' thing I wanted was an “enough-is-enough” setup.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Something I could use for ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'most',
            },
            {
              type: 'text',
              text: ' cases and extend when needed.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'A solid foundation that wouldn’t break if things got more complex.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'So I could focus on building what ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'actually',
            },
            {
              type: 'text',
              text: ' matters.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'That’s why this guide exists.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'It’s here to answer the questions we all run into:',
            },
          ],
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Do I need external libraries like ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://github.com/garmeeh/next-seo',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                          },
                        },
                      ],
                      text: 'next-seo',
                    },
                    {
                      type: 'text',
                      text: ' and ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://github.com/iamvishnusankar/next-sitemap',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: null,
                          },
                        },
                      ],
                      text: 'next-sitemap',
                    },
                    {
                      type: 'text',
                      text: '?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'What fields should I include? Are ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'keywords',
                    },
                    {
                      type: 'text',
                      text: ' still relevant?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Should I use Open Graph, Twitter Cards, or both?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'What are the best sizes for images and icons?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Will Image Generation ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://vercel.com/docs/functions/og-image-generation',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: null,
                          },
                        },
                      ],
                      text: 'Image Generation',
                    },
                    {
                      type: 'text',
                      text: ' respect my Tailwind config?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Do I really need 20–30 icons in different sizes? 🤯',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'How can I get a base URL that adapts to the environment?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Do I need to configure the ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'viewport',
                    },
                    {
                      type: 'text',
                      text: '?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Should I bother with a ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'manifest',
                    },
                    {
                      type: 'text',
                      text: '?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'What’s the deal with JSON-LD? Do I even need it?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Should I create a Sitemap Index?',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'And what are JSON-LD and a Sitemap Index anyway?',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 0,
          },
          content: [
            {
              type: 'text',
              text: 'Metadata',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Let's imagine we're setting up metadata for a blog post.",
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: "We start by fetching the post's data.",
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'If the post isn’t found, we return early.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Otherwise, we return some basic metadata.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Next, let’s talk about ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'params',
            },
            {
              type: 'text',
              text: '. Where does the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'slug',
            },
            {
              type: 'text',
              text: ' come from?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'It might come from the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Page',
            },
            {
              type: 'text',
              text: ' component.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Or it could be defined in ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'generateStaticParams',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'You might notice a lot of type duplication in the code. ',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'The first instinct might be to extract it into a ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Props',
            },
            {
              type: 'text',
              text: ' type.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But that approach doesn’t work for ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'generateStaticParams',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Here’s the trick: ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'generateStaticParams',
            },
            {
              type: 'text',
              text: ' is the single source of truth for this type.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Instead of duplicating the type, we can derive it ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'directly',
            },
            {
              type: 'text',
              text: ' from the function.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Typing ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'this',
            },
            {
              type: 'text',
              text: ' every time is tedious, however.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'We can make it easier by creating a utility function that uses ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'infer',
            },
            {
              type: 'text',
              text: ' to fetch the params.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Now, we can use this utility to derive the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Props',
            },
            {
              type: 'text',
              text: ' type.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'This approach is much cleaner.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'We’re deriving the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'params',
            },
            {
              type: 'text',
              text: ' directly from ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'generateStaticParams',
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'without',
            },
            {
              type: 'text',
              text: ' duplication.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Now let's move on to the metadata logic itself.",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'The first thing worth mentioning is that both ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'generateMetadata',
            },
            {
              type: 'text',
              text: ' and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Page',
            },
            {
              type: 'text',
              text: ' use the same ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'fetchPostBySlug',
            },
            {
              type: 'text',
              text: ' function.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: "Why is this important? Because Next.js deduplicates those requests, ensuring there's ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'only one',
            },
            {
              type: 'text',
              text: ' network roundtrip.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'How cool is that? Just make sure your function uses ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'fetch',
            },
            {
              type: 'text',
              text: ' or is properly ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'cache',
            },
            {
              type: 'text',
              text: 'd to take advantage of it.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Let’s talk about the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'title',
            },
            {
              type: 'text',
              text: ' next.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'We don’t always set it as-is.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Often, there’s a suffix added, like ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'appName',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Now, let’s take a closer look at the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'Metadata',
            },
            {
              type: 'text',
              text: ' type.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'It offers a lot of fields, and some guides even suggest filling ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'as many as possible',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But here’s the truth: modern search engines ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'don’t',
            },
            {
              type: 'text',
              text: ' care about most of these fields.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Take ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'keywords',
            },
            {
              type: 'text',
              text: ', for example.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'It ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'used',
            },
            {
              type: 'text',
              text: ' to matter, but anything could be put there.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'People abused it, so search engines ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'stopped paying attention',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'The same goes for other fields that are easy to manipulate.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'What about fields like ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'authors',
            },
            {
              type: 'text',
              text: ' or ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'category',
            },
            {
              type: 'text',
              text: '?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'For these, it’s better to use JSON-LD.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'JSON-LD helps search engines create rich results, but we won’t cover it here.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Most projects don’t need it, and the official docs ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'explain it well',
            },
            {
              type: 'text',
              text: ' if yours does.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'So, what fields should we add?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'The truth is, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'not many',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'And for fields like ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://support.google.com/webmasters/answer/9008080',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'Verification',
            },
            {
              type: 'text',
              text: ' or ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://developers.facebook.com/docs/applinks',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'AppLinks',
            },
            {
              type: 'text',
              text: ', you ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'will know',
            },
            {
              type: 'text',
              text: ' when you need them.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'You might also be thinking about ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'Twitter Card',
            },
            {
              type: 'text',
              text: ' metadata, which works similarly to Open Graph.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'For years, we’ve been told to include both sets of tags for compatibility.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Just like we were told to include ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'keywords',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But let’s be real — do you ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'really',
            },
            {
              type: 'text',
              text: ' think Twitter won’t fall back to Open Graph tags if needed?  ',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Unless you have a ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'specific',
            },
            {
              type: 'text',
              text: ' need for Twitter fine-tuning, you can skip it.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'At this point, we’re pretty much done with fields.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'You don’t need more. ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'These',
            },
            {
              type: 'text',
              text: ' are enough.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Now let’s talk about duplication.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'What about the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'title',
            },
            {
              type: 'text',
              text: ' and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'description',
            },
            {
              type: 'text',
              text: '?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'And what about the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'title',
            },
            {
              type: 'text',
              text: ' suffix?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'How can we make sure other developers follow the same structure as us?  ',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Should we create a lint rule?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Write a spec?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'No way!',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Instead, let’s create a utility function called…',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 0,
          },
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'constructMetadata',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Let’s start by extracting the logic we already have into a reusable function.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'This works, but it’s a bit rigid.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'We don’t want to manually add a suffix every time, so let’s encapsulate that logic.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'But what if there’s no title?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'For example, on the main page, you might only want to display ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'constants.appName',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'To handle this, we can make the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'title',
            },
            {
              type: 'text',
              text: ' optional and adjust the logic.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'The same goes for ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'description',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'If it’s not provided, we’ll use a default value.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Finally, let’s handle ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'images',
            },
            {
              type: 'text',
              text: ' the same way.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Also, by using ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Partial',
            },
            {
              type: 'text',
              text: ', we can make all parameters optional and provide ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'a default empty object',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Now let’s refactor the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'generateMetadata',
            },
            {
              type: 'text',
              text: ' function to use our new utility.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'With this setup, we can now use ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'constructMetadata',
            },
            {
              type: 'text',
              text: ' like this.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Or like this.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Or even like this.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I also prefer adding properties like ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://developers.google.com/search/docs/crawling-indexing/canonicalization',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'canonical',
            },
            {
              type: 'text',
              text: ' and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'noIndex',
            },
            {
              type: 'text',
              text: ' to make the API even ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'more',
            },
            {
              type: 'text',
              text: ' flexible.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Phew, that was a lot!',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But now you have a simple and convenient way to handle ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'metadata',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'It’s a solid foundation you can extend as needed.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 0,
          },
          content: [
            {
              type: 'text',
              text: 'Sitemap',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'The ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'Next.js Sitemap API',
            },
            {
              type: 'text',
              text: ' is straightforward.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'You fetch your data and use basic JavaScript loops to generate the sitemap.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'However, there’s one catch.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'You ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'can’t',
            },
            {
              type: 'text',
              text: ' use relative URLs like you can in ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'metadata',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is because Next.js doesn’t provide any API for resolving relative URLs in sitemaps.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'Fortunately',
            },
            {
              type: 'text',
              text: ', we can simulate this behavior by looking at the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'default logic for resolving URLs',
            },
            {
              type: 'text',
              text: ' in the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'metadata',
            },
            {
              type: 'text',
              text: ' docs.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'After some digging, I found ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/metadata/resolvers/resolve-url.ts',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'functions in the source code',
            },
            {
              type: 'text',
              text: ' that can be combined into a utility for resolving both relative and absolute URLs.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'This utility isn’t identical to the logic used in ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'metadata',
            },
            {
              type: 'text',
              text: ', but it’s ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'close',
            },
            {
              type: 'text',
              text: ' enough for our purposes.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Now, let’s integrate this utility into our ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'sitemap',
            },
            {
              type: 'text',
              text: ' function.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'This utility isn’t just useful for sitemaps.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'You’ll find it handy in other areas, like resolving the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'basePath',
            },
            {
              type: 'text',
              text: ' for ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://authjs.dev/',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'Auth.js',
            },
            {
              type: 'text',
              text: ' endpoints.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Thank me later!',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
          content: [
            {
              type: 'text',
              text: 'A Note on Ignored Fields',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'In the example above, we included the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'lastModified',
            },
            {
              type: 'text',
              text: ' field to help crawlers detect post freshness.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'However, fields like ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'priority',
            },
            {
              type: 'text',
              text: ' and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'changeFrequency',
            },
            {
              type: 'text',
              text: ' were omitted because ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#additional-notes-about-xml-sitemaps',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'Google ignores them',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Here’s why:',
            },
          ],
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'They’re often misconfigured. For example, ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'priority',
                    },
                    {
                      type: 'text',
                      text: ' is a ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'italic',
                        },
                      ],
                      text: 'relative',
                    },
                    {
                      type: 'text',
                      text: ' field, but many sites incorrectly set it to ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: '1',
                    },
                    {
                      type: 'text',
                      text: ', making it meaningless.',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'They’re prone to abuse, much like ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'keywords',
                    },
                    {
                      type: 'text',
                      text: ' in metadata.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Even ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'lastModified',
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'only',
            },
            {
              type: 'text',
              text: ' matters if it’s “',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#additional-notes-about-xml-sitemaps',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'consistently and verifiably accurate',
            },
            {
              type: 'text',
              text: '”.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
          content: [
            {
              type: 'text',
              text: 'Do I Need a Sitemap Index?',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Another consideration is whether you need a sitemap index.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'Google limits sitemaps to 50,000 URLs each',
            },
            {
              type: 'text',
              text: ', but a sitemap index allows you to have multiple sitemaps for the same site.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'Unless',
            },
            {
              type: 'text',
              text: ' you’re expecting over 50,000 URLs, this is likely overkill.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'It’s a complex feature and often a premature optimization, much like JSON-LD for metadata.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'If you truly need it, here are your options:',
            },
          ],
        },
        {
          type: 'orderedList',
          attrs: {
            start: 1,
          },
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Use a library like ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://github.com/iamvishnusankar/next-sitemap',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: null,
                          },
                        },
                      ],
                      text: 'next-sitemap',
                    },
                    {
                      type: 'text',
                      text: ', which provides straightforward instructions for generating a sitemap index.',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Write some custom code. ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: null,
                          },
                        },
                      ],
                      text: 'Next.js has an API for generating multiple sitemaps',
                    },
                    {
                      type: 'text',
                      text: ', but ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://github.com/vercel/next.js/discussions/61025',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: null,
                          },
                        },
                      ],
                      text: 'you’ll need to manually generate the index file',
                    },
                    {
                      type: 'text',
                      text: '. (',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://github.com/vercel/next.js/pull/61391',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: null,
                          },
                        },
                      ],
                      text: 'There’s a pull request to automate this',
                    },
                    {
                      type: 'text',
                      text: ', but it’s still a work in progress.)',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 0,
          },
          content: [
            {
              type: 'text',
              text: 'Robots',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is the easiest section of the guide.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'We’ll start by allowing everything.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But you can ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'disallow',
            },
            {
              type: 'text',
              text: ' what you need.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'We can also take advantage of our ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'resolveUrl',
            },
            {
              type: 'text',
              text: ' utility to define the sitemap.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'And that’s it.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'No tricks, no complications.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 0,
          },
          content: [
            {
              type: 'text',
              text: 'Images',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Earlier, we mentioned ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '/images/og.png',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'This is the default image that will appear when someone shares your website link, for example, in a messenger app.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'And for blog posts, you can use individual thumbnails.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'The recommended size for these images is 1200x630.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But it’s just a recommendation, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'not a rule',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Keep important details centered, and you’ll be fine.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'You might also consider generating images ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://vercel.com/docs/functions/og-image-generation',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'programmatically',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But ask yourself: do you ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'really',
            },
            {
              type: 'text',
              text: ' need it?',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'As we discussed, strict sizes ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'aren’t',
            },
            {
              type: 'text',
              text: ' required, so cropping isn’t necessary.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'You might think adding the post’s title to the image is a good idea.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But when you share on social media, the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'title',
            },
            {
              type: 'text',
              text: ' and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'description',
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'already',
            },
            {
              type: 'text',
              text: ' show up next to the image.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Why duplicate that?',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'And if you’re a Tailwind enjoyer, here’s a dealbreaker:',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://github.com/vercel/satori/issues/503',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'Next.js Image Generation won’t respect your Tailwind config',
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Forget about ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'text-primary',
            },
            {
              type: 'text',
              text: ' or other tokens you’ve carefully set up.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Surprisingly, this is the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'perfect',
            },
            {
              type: 'text',
              text: ' case for inline styles.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'There’s ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://og-playground.vercel.app/',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'nothing wrong',
            },
            {
              type: 'text',
              text: ' with them here.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'So, it takes time, doesn’t support your tokens, and often isn’t worth it.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Are you still interested?',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'At the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'very',
            },
            {
              type: 'text',
              text: ' least, make sure you have a default ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '/images/og.png',
            },
            {
              type: 'text',
              text: ' image in place, as configured in your ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'metadata',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 0,
          },
          content: [
            {
              type: 'text',
              text: 'Icons',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Besides images, you’ll need a favicon and a few larger icons for bookmarks.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'The ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'first',
            },
            {
              type: 'text',
              text: ' question is: how many?',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'You might recall those guides that tell you to crop 20–30 images, convert them into multiple formats, and add a ton of meta tags.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Don’t worry — that’s ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'outdated',
            },
            {
              type: 'text',
              text: ' advice.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Unless you care about rare edge cases, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'keep it simple',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'What about PWA manifests for home screen shortcuts?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Let’s be honest — how many users know about that, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'let alone use it',
            },
            {
              type: 'text',
              text: '?',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Unless you’re building a full-fledged PWA, this effort ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'isn’t',
            },
            {
              type: 'text',
              text: ' worth it.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'For most use cases, here’s all you need to do:',
            },
          ],
        },
        {
          type: 'orderedList',
          attrs: {
            start: 1,
          },
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Prepare a large 180x180 icon. Use this as your base.',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Visit ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            href: 'https://realfavicongenerator.net',
                            target: '_blank',
                            rel: 'noopener noreferrer nofollow',
                            class: null,
                          },
                        },
                      ],
                      text: 'RealFaviconGenerator',
                    },
                    {
                      type: 'text',
                      text: '.',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Upload your icon and download the generated files.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'From the downloaded ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'favicon-for-app.zip',
            },
            {
              type: 'text',
              text: ':',
            },
          ],
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Extract ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'apple-icon.png',
                    },
                    {
                      type: 'text',
                      text: ', ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'favicon.ico',
                    },
                    {
                      type: 'text',
                      text: ', and ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'icon.png',
                    },
                    {
                      type: 'text',
                      text: ' into your ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'app',
                    },
                    {
                      type: 'text',
                      text: ' folder.',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Skip ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'icon.svg',
                    },
                    {
                      type: 'text',
                      text: '. It’s just a base64 version of your PNG, which can be 10x larger.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'And that’s it — no manifest needed!',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'One caveat: if you’re using Turbopack, move ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'favicon.ico',
            },
            {
              type: 'text',
              text: ' to the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '/public',
            },
            {
              type: 'text',
              text: ' folder.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'And subscribe to ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'https://github.com/vercel/next.js/issues/71609',
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                    class: null,
                  },
                },
              ],
              text: 'this issue',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'For most projects, this setup ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'is',
            },
            {
              type: 'text',
              text: ' enough.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Adding 20–30 icons is like supporting IE11 — you should know exactly ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'why',
            },
            {
              type: 'text',
              text: ' you’re doing it.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 0,
          },
          content: [
            {
              type: 'text',
              text: 'Wrapping Up',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'That‘s it. Now you have a solid foundation for most of your projects.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'I hope I’ve dispelled some myths about the importance of things that ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'don’t',
            },
            {
              type: 'text',
              text: ' matter anymore.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'Most of them are just edge cases.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Sure, you might need JSON-LD or better Twitter Cards at some point.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'But that’s easy to figure out.',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'And it will fit right into this setup.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'SEO might not be fun, but it ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'doesn’t',
            },
            {
              type: 'text',
              text: ' have to be a headache.',
            },
          ],
        },
      ],
    },
    interpolation: {
      // @ts-expect-error
      input: [0, 300, 7024, 7400, 8372, 9100, 10700, s1].map(pp1),
      // @ts-expect-error
      output: [0, 1599, 7024, 7763, 8372, 9767, 10437, s1].map(pp1),
    },
    layoutChanges: [
      lc1(1608, '"app/blog/[slug]/page.tsx"'),
      lc1(2320, '"lib/react/with-static-params.ts"'),
      lc1(2410, '"app/blog/[slug]/page.tsx"'),
      lc1(2762, '"nextjs-docs-deduplication"'),
      lc1(2958, '"app/blog/[slug]/page.tsx"'),
      lc1(3067, '"metadata-fields"'),
      lc1(3147, '"app/blog/[slug]/page.tsx"'),
      lc1(3534, '"examples/json-ld.tsx"'),
      lc1(3652, '"rich-results"'),
      lc1(3735, '"app/blog/[slug]/page.tsx"'),
      lc1(4627, '"lib/metadata/construct-metadata.ts"'),
      lc1(5244, '"app/blog/[slug]/page.tsx"'),
      lc1(5412, '"lib/metadata/construct-metadata.ts"'),
      lc1(5656, '"app/sitemap.ts"'),
      lc1(5947, '"nextjs-docs-metadata-base"'),
      lc1(6065, '"lib/metadata/resolvers.ts"'),
      lc1(6305, '"app/sitemap.ts"'),
      lc1(7024, ''),
      lc1(7771, '"app/robots.ts"'),
      lc1(8015, '"lib/metadata/construct-metadata.ts"'),
      lc1(8274, '"og-framing"'),
      lc1(8735, ''),
      lc1(9120, '"lib/metadata/construct-metadata.ts"'),
      lc1(9232, ''),
      lc1(9350, '"icons-too-much"'),
      lc1(9767, '"icon-180"'),
      lc1(9873, '"real-favicon-generator-download"'),
      lc1(9957, '"icons-app-folder"'),
      lc1(10437, ''),
    ],
    assets: [
      new AssetImageStatic({
        _id: 'icon-180',
        type: 'image-static',
        name: 'icon-180.webp',
        href: '/assets/nextjs-metadata/icon-180.webp',
        caption: Option.none(),
        alt: Option.some('An icon in a 180x180 frame'),
      }),
      new AssetImageStatic({
        _id: 'icons-app-folder',
        type: 'image-static',
        name: 'icons-app-folder.webp',
        href: '/assets/nextjs-metadata/icons-app-folder.webp',
        caption: Option.none(),
        alt: Option.some('A file tree with selected icons'),
      }),
      new AssetImageStatic({
        _id: 'icons-too-much',
        type: 'image-static',
        name: 'icons-too-much.webp',
        href: '/assets/nextjs-metadata/icons-too-much.webp',
        caption: Option.none(),
        alt: Option.some('An archive with a lot of redundant icons'),
      }),
      new AssetImageStatic({
        _id: 'metadata-fields',
        type: 'image-static',
        name: 'metadata-fields.webp',
        href: '/assets/nextjs-metadata/metadata-fields.webp',
        caption: Option.none(),
        alt: Option.some('An intellisense of the Metadata fields'),
      }),
      new AssetImageStatic({
        _id: 'nextjs-docs-deduplication',
        type: 'image-static',
        name: 'nextjs-docs-deduplication.webp',
        href: '/assets/nextjs-metadata/nextjs-docs-deduplication.webp',
        caption: Option.some(
          'An excerpt from “Benefits of Server Rendering” part of Next.js docs.',
        ),
        alt: Option.some('An excerpt from Next.js docs about deduplication.'),
      }),
      new AssetImageStatic({
        _id: 'nextjs-docs-metadata-base',
        type: 'image-static',
        name: 'nextjs-docs-metadata-base.webp',
        href: '/assets/nextjs-metadata/nextjs-docs-metadata-base.webp',
        caption: Option.some(
          'An excerpt from “metadataBase’ default value” part of Next.js docs.',
        ),
        alt: Option.some(
          'An excerpt from Next.js docs about metadataBase default value.',
        ),
      }),
      new AssetImageStatic({
        _id: 'og-framing',
        type: 'image-static',
        name: 'og-framing.webp',
        href: '/assets/nextjs-metadata/og-framing.webp',
        caption: Option.none(),
        alt: Option.some(
          'An example of an Open Graph image with a centered frame',
        ),
      }),
      new AssetImageStatic({
        _id: 'real-favicon-generator-download',
        type: 'image-static',
        name: 'real-favicon-generator-download.webp',
        href: '/assets/nextjs-metadata/real-favicon-generator-download.webp',
        caption: Option.some('Download the app files'),
        alt: Option.some(
          'A screenshot from the download page of RealFaviconGenerator',
        ),
      }),
      new AssetImageStatic({
        _id: 'rich-results',
        type: 'image-static',
        name: 'rich-results.webp',
        href: '/assets/nextjs-metadata/rich-results.webp',
        caption: Option.some('Google Rich Results Carousel'),
        alt: Option.some('Google Rich Results Carousel.'),
      }),
      new AssetText({
        _id: 'app/blog/[slug]/page.tsx',
        type: 'text',
        name: 'app/blog/[slug]/page.tsx',
        initialValue: textFromTemplate(''),
        advances: [
          ...ch1(1608, 1664, [
            [522, [[[0, '', '']], [[[1, null]], null]]],
            [
              1036,
              [
                [[0, "import type { Metadata } from 'next'"], 1],
                [[[36, null]], null],
              ],
            ],
            [
              1066,
              [
                [36, [0, '', ''], 1],
                [[[37, null]], null],
              ],
            ],
            [
              1097,
              [
                [37, [0, '', ''], 1],
                [[[38, null]], null],
              ],
            ],
            [
              1127,
              [
                [
                  38,
                  [
                    0,
                    'export async function generateMetadata(): Promise<Metadata> {',
                  ],
                  1,
                ],
                [[[99, null]], null],
              ],
            ],
            [
              1158,
              [
                [99, [0, '', ''], 1],
                [[[100, null]], null],
              ],
            ],
            [
              1188,
              [
                [100, [0, '}'], 1],
                [[[101, null]], null],
              ],
            ],
            [
              1220,
              [
                [77, [0, '{'], 25],
                [[[78, null]], null],
              ],
            ],
            [
              1266,
              [
                [78, [0, '', ''], 25],
                [[[79, null]], null],
              ],
            ],
            [
              1297,
              [
                [79, [0, '  params,'], 25],
                [[[88, null]], null],
              ],
            ],
            [
              1609,
              [
                [88, [0, '', ''], 25],
                [[[89, null]], null],
              ],
            ],
            [
              1767,
              [
                [89, [0, '}: {'], 25],
                [[[93, null]], null],
              ],
            ],
            [
              1908,
              [
                [93, [0, '', ''], 25],
                [[[94, null]], null],
              ],
            ],
            [
              2045,
              [
                [94, [0, '  params: Promise<{ slug: string }>'], 25],
                [[[129, null]], null],
              ],
            ],
            [
              2198,
              [
                [129, [0, '', ''], 25],
                [[[130, null]], null],
              ],
            ],
            [
              2381,
              [
                [130, [0, '}'], 25],
                [[[131, null]], null],
              ],
            ],
            [
              2546,
              [
                [153, [0, '', ''], 3],
                [[[154, null]], null],
              ],
            ],
          ]),
          ...ch1(1665, 1702, [
            [
              2704,
              [
                [154, [0, '  const { slug } = await params'], 3],
                [[[185, null]], null],
              ],
            ],
            [
              3207,
              [
                [185, [0, '', ''], 3],
                [[[186, null]], null],
              ],
            ],
            [
              3238,
              [
                [186, [0, '', ''], 3],
                [[[187, null]], null],
              ],
            ],
            [
              3284,
              [
                [187, [0, '  const post = await fetchPostBySlug(slug)'], 3],
                [[[229, null]], null],
              ],
            ],
            [
              3315,
              [
                [229, [0, '', ''], 3],
                [[[230, null]], null],
              ],
            ],
            [
              3347,
              [
                [230, [0, '', ''], 3],
                [[[231, null]], null],
              ],
            ],
          ]),
          ...ch1(1703, 1744, [
            [
              3379,
              [
                [231, [0, '  if (!post) {'], 3],
                [[[245, null]], null],
              ],
            ],
            [
              3567,
              [
                [245, [0, '', ''], 3],
                [[[246, null]], null],
              ],
            ],
            [
              3723,
              [
                [246, [0, '  }'], 3],
                [[[249, null]], null],
              ],
            ],
            [
              3894,
              [
                [245, [0, '', ''], 7],
                [[[246, null]], null],
              ],
            ],
            [
              4041,
              [
                [246, [0, '    return {'], 7],
                [[[258, null]], null],
              ],
            ],
            [
              4160,
              [
                [258, [0, '', ''], 7],
                [[[259, null]], null],
              ],
            ],
            [
              4664,
              [
                [259, [0, "      title: 'Post Not Found',"], 7],
                [[[289, null]], null],
              ],
            ],
            [
              4695,
              [
                [289, [0, '', ''], 7],
                [[[290, null]], null],
              ],
            ],
            [
              4726,
              [
                [290, [0, '      openGraph: {'], 7],
                [[[308, null]], null],
              ],
            ],
            [
              4773,
              [
                [308, [0, '', ''], 7],
                [[[309, null]], null],
              ],
            ],
            [
              5059,
              [
                [309, [0, "        title: 'Post Not Found',"], 7],
                [[[341, null]], null],
              ],
            ],
            [
              5210,
              [
                [341, [0, '', ''], 7],
                [[[342, null]], null],
              ],
            ],
            [
              5342,
              [
                [342, [0, '      },'], 7],
                [[[350, null]], null],
              ],
            ],
            [
              5842,
              [
                [350, [0, '', ''], 7],
                [[[351, null]], null],
              ],
            ],
            [
              5888,
              [
                [351, [0, '    }'], 7],
                [[[356, null]], null],
              ],
            ],
            [
              5920,
              [
                [360, [0, '', ''], 3],
                [[[361, null]], null],
              ],
            ],
            [
              5950,
              [
                [361, [0, '', ''], 3],
                [[[362, null]], null],
              ],
            ],
          ]),
          ...ch1(1745, 1786, [
            [
              5981,
              [
                [
                  362,
                  [0, '  const { title, description, thumbnailUrl } = post'],
                  3,
                ],
                [[[413, null]], null],
              ],
            ],
            [
              6012,
              [
                [413, [0, '', ''], 3],
                [[[414, null]], null],
              ],
            ],
            [
              6263,
              [
                [414, [0, '', ''], 3],
                [[[415, null]], null],
              ],
            ],
            [
              6431,
              [
                [415, [0, '  return {'], 3],
                [[[425, null]], null],
              ],
            ],
            [
              6588,
              [
                [425, [0, '', ''], 3],
                [[[426, null]], null],
              ],
            ],
            [
              6737,
              [
                [426, [0, '  }'], 3],
                [[[429, null]], null],
              ],
            ],
            [
              6877,
              [
                [425, [0, '', ''], 7],
                [[[426, null]], null],
              ],
            ],
            [
              7043,
              [
                [426, [0, '    title,'], 7],
                [[[436, null]], null],
              ],
            ],
            [
              7206,
              [
                [436, [0, '', ''], 7],
                [[[437, null]], null],
              ],
            ],
            [
              7368,
              [
                [437, [0, '    description,'], 7],
                [[[453, null]], null],
              ],
            ],
            [
              7540,
              [
                [453, [0, '', ''], 7],
                [[[454, null]], null],
              ],
            ],
            [
              7695,
              [
                [454, [0, '    openGraph: {'], 7],
                [[[470, null]], null],
              ],
            ],
            [
              7839,
              [
                [470, [0, '', ''], 7],
                [[[471, null]], null],
              ],
            ],
            [
              7988,
              [
                [471, [0, '    },'], 7],
                [[[477, null]], null],
              ],
            ],
            [
              8146,
              [
                [470, [0, '', ''], 14],
                [[[471, null]], null],
              ],
            ],
            [
              8325,
              [
                [471, [0, '      title,'], 14],
                [[[483, null]], null],
              ],
            ],
            [
              8477,
              [
                [483, [0, '', ''], 14],
                [[[484, null]], null],
              ],
            ],
            [
              8627,
              [
                [484, [0, '      description,'], 14],
                [[[502, null]], null],
              ],
            ],
            [
              8780,
              [
                [502, [0, '', ''], 14],
                [[[503, null]], null],
              ],
            ],
            [
              8938,
              [
                [503, [0, '      images: thumbnailUrl,'], 14],
                [[[530, null]], null],
              ],
            ],
          ]),
          ...ch1(1788, 1788, [[1139, [[544], [[[179, 185]], null]]]]),
          ...ch1(1819, 1819, [[2245, [[544], [[[114, 118]], null]]]]),
          ...ch1(1850, 1888, []),
          ...ch1(1889, 1936, []),
          ...ch1(1938, 1994, []),
          ...ch1(1995, 2055, []),
          ...ch1(2056, 2114, []),
          ...ch1(2131, 2274, []),
          ...ch1(2276, 2319, []),
          ...ch1(2410, 2464, []),
          ...ch1(2628, 2738, []),
          ...ch1(2958, 2958, []),
          ...ch1(2990, 3065, []),
          ...ch1(3147, 3287, []),
          ...ch1(3293, 3293, []),
          ...ch1(3316, 3429, []),
          ...ch1(3491, 3491, []),
          ...ch1(3735, 3869, []),
          ...ch1(3871, 3963, []),
          ...ch1(4180, 4252, []),
          ...ch1(4304, 4304, []),
          ...ch1(4346, 4416, []),
          ...ch1(4417, 4417, []),
          ...ch1(4450, 4520, []),
          ...ch1(5244, 5317, []),
          ...ch1(5334, 5378, []),
          ...ch1(5379, 5391, []),
          ...ch1(5392, 5410, []),
        ],
      }),
      new AssetText({
        _id: 'lib/react/with-static-params.ts',
        type: 'text',
        name: 'lib/react/with-static-params.ts',
        initialValue:
          textFromTemplate(`import type { WithStaticParams } from '~/lib/react/with-static-params'

type Props = WithStaticParams<typeof generateStaticParams>

`),
        advances: [...ch1(2320, 2409, [])],
      }),
      new AssetText({
        _id: 'examples/json-ld.tsx',
        type: 'text',
        name: 'examples/json-ld.tsx',
        initialValue:
          textFromTemplate(`import type { Product, WithContext } from 'schema-dts'

export default async function Page({ params }) {
  const product = await getProduct(params.id)

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  }

  return (
    <section>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  )
}

`),
        advances: [...ch1(3534, 3651, [])],
      }),
      new AssetText({
        _id: 'lib/metadata/construct-metadata.ts',
        type: 'text',
        name: 'lib/metadata/construct-metadata.ts',
        initialValue: textFromTemplate(`export const constructMetadata = ({
  title,
  description,
  images,
}: { title: string; description: string; images: string }) => {
  return {}
}

`),
        advances: [
          ...ch1(4645, 4722, []),
          ...ch1(4757, 4840, []),
          ...ch1(4953, 5023, []),
          ...ch1(5024, 5102, []),
          ...ch1(5104, 5243, []),
          ...ch1(5412, 5506, []),
          ...ch1(8015, 8015, []),
          ...ch1(9120, 9120, []),
        ],
      }),
      new AssetText({
        _id: 'app/sitemap.ts',
        type: 'text',
        name: 'app/sitemap.ts',
        initialValue: textFromTemplate(`
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

}
`),
        advances: [
          ...ch1(5656, 5774, []),
          ...ch1(6307, 6366, []),
          ...ch1(6542, 6730, []),
        ],
      }),
      new AssetText({
        _id: 'lib/metadata/resolvers.ts',
        type: 'text',
        name: 'lib/metadata/resolvers.ts',
        initialValue: textFromTemplate(`
import {
  getSocialImageMetadataBaseFallback,
  resolveAbsoluteUrlWithPathname,
} from 'next/dist/lib/metadata/resolvers/resolve-url'

export const resolveUrl = (url = '/') =>
  resolveAbsoluteUrlWithPathname(
    url,
    getSocialImageMetadataBaseFallback(null),
    {
      trailingSlash: false,
      pathname: '/',
      isStaticMetadataRouteFile: false,
    },
  )

`),
        advances: [...ch1(6065, 6204, [])],
      }),
      new AssetText({
        _id: 'app/robots.ts',
        type: 'text',
        name: 'app/robots.ts',
        initialValue: textFromTemplate(`
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {

}

`),
        advances: [
          ...ch1(7771, 7847, []),
          ...ch1(7848, 7884, []),
          ...ch1(7884, 7959, []),
        ],
      }),
    ],
    date: DateTime.make({ year: 2025, month: 1, day: 7 }).pipe(
      Option.getOrThrow,
    ),
    updateDate: DateTime.make({ year: 2025, month: 1, day: 7 }).pipe(
      Option.getOrThrow,
    ),
  }),
]
