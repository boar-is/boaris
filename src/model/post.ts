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

// to fixed 4
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

// todo not lazy loaded
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
          ...ch1(1620, 1620, [
            [
              695,
              [
                [
                  [
                    0,
                    "import type { Metadata } from 'next'",
                    "import { notFound } from 'next/navigation'",
                    '',
                    'export async function generateMetadata({',
                    '  params,',
                    '}: {',
                    '  params: Promise<{ slug: string }>',
                    '}): Promise<Metadata> {',
                    '}',
                    '',
                  ],
                ],
                [[[199, 0]], null],
              ],
            ],
          ]),
          ...ch1(1670, 1670, [
            [
              1643,
              [
                [
                  196,
                  [
                    0,
                    '',
                    '  const { slug } = await params',
                    '',
                    '  const post = await fetchPostBySlug(slug)',
                  ],
                  3,
                ],
                [[[272, 196]], null],
              ],
            ],
          ]),
          ...ch1(1710, 1710, [
            [
              3472,
              [
                [
                  272,
                  [
                    0,
                    '',
                    '',
                    '  if (!post) {',
                    '    return {',
                    "      title: 'Post Not Found',",
                    '      openGraph: {',
                    "        title: 'Post Not Found',",
                    '      },',
                    '    }',
                    '  }',
                  ],
                  3,
                ],
                [[[403, 272]], null],
              ],
            ],
          ]),
          ...ch1(1750, 1750, [
            [
              5249,
              [
                [
                  403,
                  [
                    0,
                    '',
                    '',
                    '  const { title, description, thumbnailUrl } = post',
                    '',
                    '  return {',
                    '    title,',
                    '    description,',
                    '    openGraph: {',
                    '      title,',
                    '      description,',
                    '      images: thumbnailUrl,',
                    '    },',
                    '  }',
                  ],
                  3,
                ],
                [[[584, 403]], null],
              ],
            ],
          ]),
          ...ch1(1800, 1800, [[8855, [[587], [[[124, 130]], null]]]]),
          ...ch1(1825, 1825, [[10765, [[587], [[[157, 161]], null]]]]),
          ...ch1(1857, 1857, [
            [
              12578,
              [
                [
                  586,
                  [
                    0,
                    '',
                    '',
                    'export default async function Page({',
                    '  params,',
                    '}: {',
                    '  params: Promise<{ slug: string }>',
                    '}) {',
                    '  const { slug } = await params',
                    '',
                    '  const post = await fetchPostBySlug(slug)',
                    '',
                    '  if (!post) {',
                    '    return notFound()',
                    '  }',
                    '',
                    '  const { title } = post',
                    '',
                    '  return <div>{title}</div>',
                    '}',
                  ],
                  1,
                ],
                [[[855, 586]], null],
              ],
            ],
          ]),
          ...ch1(1893, 1893, [
            [
              14136,
              [
                [
                  79,
                  [
                    0,
                    '',
                    '',
                    'export async function generateStaticParams(): Promise<',
                    '  ReadonlyArray<{ slug: string }>',
                    '> {',
                    '  const posts = await fetchRecentPosts()',
                    '  return posts.map(({ slug }) => ({ slug }))',
                    '}',
                  ],
                  777,
                ],
                [[[261, 79]], null],
              ],
            ],
          ]),
          ...ch1(1955, 2040, [
            [952, [[1038], [[[169, 138]], null]]],
            [4163, [[1038], [[[354, 321]], null]]],
            [6664, [[1038], [[[857, 824]], null]]],
          ]),
          ...ch1(2013, 2035, [
            [
              492,
              [
                [261, [0, '', ''], 777],
                [[[262, null]], null],
              ],
            ],
            [
              850,
              [
                [262, [0, '', ''], 777],
                [[[263, null]], null],
              ],
            ],
            [
              1258,
              [
                [
                  263,
                  [
                    0,
                    'type Props = {',
                    '  params: Promise<{ slug: string }>',
                    '}',
                  ],
                  777,
                ],
                [[[315, null]], null],
              ],
            ],
            [2362, [[1092], [[[315, 263]], null]]],
            [
              3218,
              [
                [371, [39, 'Props'], 682],
                [[[376, null]], null],
              ],
            ],
            [4059, [[1058], [[[371, 376]], null]]],
            [
              4478,
              [
                [840, [39, 'Props'], 179],
                [[[845, null]], null],
              ],
            ],
            [5707, [[1024], [[[840, 845]], null]]],
          ]),
          ...ch1(2065, 2065, [[1307, [[1024], [[[169, 138]], null]]]]),
          ...ch1(2205, 2225, [
            [
              780,
              [
                [261, [0, '', '', 'type Params = '], 763],
                [[[277, 261]], null],
              ],
            ],
            [
              1795,
              [
                [277, [0, 'Awaited<>'], 763],
                [[[286, 277]], null],
              ],
            ],
            [
              2540,
              [
                [285, [0, 'ReturnType<>'], 764],
                [[[297, 285]], null],
              ],
            ],
            [
              3378,
              [
                [296, [0, 'typeof generateStaticParams'], 765],
                [[[323, 296]], null],
              ],
            ],
            [
              4274,
              [
                [325, [0, '[number]'], 763],
                [[[325, 333]], null],
              ],
            ],
            [
              5374,
              [
                [368, [16, 'Params'], 712],
                [[[374, 368]], null],
              ],
            ],
          ]),
          ...ch1(2282, 2282, [[7777, [[1086], [[[377, 263]], null]]]]),
          ...ch1(2420, 2435, [
            [
              1432,
              [
                [79, [0, '', ''], 1007],
                [[[80, null]], null],
              ],
            ],
            [
              2006,
              [
                [
                  80,
                  [
                    0,
                    "import type { WithStaticParams } from '~/lib/react/with-static-params'",
                  ],
                  1007,
                ],
                [[[150, null]], null],
              ],
            ],
            [5106, [[1157], [[[448, 334]], null]]],
            [
              6013,
              [
                [
                  334,
                  [
                    114,
                    'type Props = WithStaticParams<typeof generateStaticParams>',
                  ],
                  709,
                ],
                [[[392, null]], null],
              ],
            ],
            [7804, [[1101], [[[242, 196]], null]]],
            [
              8988,
              [
                [196, [46], 859],
                [[[196, null]], null],
              ],
            ],
          ]),
          ...ch1(2640, 2675, [
            [2464, [[1055], [[[505, 430]], null]]],
            [5756, [[1055], [[[955, 880]], null]]],
          ]),
          ...ch1(2967, 2967, [[1147, [[1055], [[[648, 653]], null]]]]),
          ...ch1(3026, 3044, [
            [
              4046,
              [
                [648, [5], 402],
                [[[648, null]], null],
              ],
            ],
            [4725, [[1050], [[[648, 650]], null]]],
            [
              5054,
              [
                [648, [2], 400],
                [[[648, null]], null],
              ],
            ],
            [5549, [[1048], [[[682, null]], null]]],
            [
              6225,
              [
                [682, [0, '', '  '], 366],
                [[[685, null]], null],
              ],
            ],
            [
              6765,
              [
                [
                  685,
                  [0, 'const title = `${post.title} • ${constants.appName}`'],
                  366,
                ],
                [[[737, null]], null],
              ],
            ],
            [7000, [[1103], [[[737, 685]], null]]],
          ]),
          ...ch1(3155, 3180, [
            [
              403,
              [
                [777, [0, '', ''], 326],
                [[[778, null]], null],
              ],
            ],
            [
              712,
              [
                [778, [0, '    keywords: post.tags,'], 326],
                [[[802, null]], null],
              ],
            ],
            [
              892,
              [
                [802, [0, '', ''], 326],
                [[[803, null]], null],
              ],
            ],
            [
              1053,
              [
                [803, [0, '    applicationName: constants.appName,'], 326],
                [[[842, null]], null],
              ],
            ],
            [
              1240,
              [
                [842, [0, '', ''], 326],
                [[[843, null]], null],
              ],
            ],
            [
              1428,
              [
                [843, [0, '    authors: post.author.name,'], 326],
                [[[873, null]], null],
              ],
            ],
            [
              1658,
              [
                [873, [0, '', ''], 326],
                [[[874, null]], null],
              ],
            ],
            [
              1911,
              [
                [874, [0, '    creator: post.author.name,'], 326],
                [[[904, null]], null],
              ],
            ],
            [
              2149,
              [
                [904, [0, '', ''], 326],
                [[[905, null]], null],
              ],
            ],
            [
              2390,
              [
                [905, [0, '    category: post.category,'], 326],
                [[[933, null]], null],
              ],
            ],
            [
              2651,
              [
                [933, [0, '', ''], 326],
                [[[934, null]], null],
              ],
            ],
            [
              2911,
              [
                [934, [0, "    generator: 'Next.js',"], 326],
                [[[959, null]], null],
              ],
            ],
            [
              3216,
              [
                [1036, [0, '', ''], 249],
                [[[1037, null]], null],
              ],
            ],
            [
              3579,
              [
                [1037, [0, "      type: 'article',"], 249],
                [[[1059, null]], null],
              ],
            ],
            [
              3865,
              [
                [1059, [0, '', ''], 249],
                [[[1060, null]], null],
              ],
            ],
            [
              4135,
              [
                [1060, [0, '      authors: post.author.name,'], 249],
                [[[1092, null]], null],
              ],
            ],
            [
              4430,
              [
                [1092, [0, '', ''], 249],
                [[[1093, null]], null],
              ],
            ],
            [
              4676,
              [
                [1093, [0, '      emails: post.author.email,'], 249],
                [[[1125, null]], null],
              ],
            ],
            [
              4949,
              [
                [1125, [0, '', ''], 249],
                [[[1126, null]], null],
              ],
            ],
            [
              5234,
              [
                [1126, [0, "      locale: 'en-US',"], 249],
                [[[1148, null]], null],
              ],
            ],
            [
              5600,
              [
                [1148, [0, '', ''], 249],
                [[[1149, null]], null],
              ],
            ],
            [
              5809,
              [
                [1149, [0, "      siteName: 'https://example.com',"], 249],
                [[[1187, null]], null],
              ],
            ],
            [
              6176,
              [
                [1187, [0, '', ''], 249],
                [[[1188, null]], null],
              ],
            ],
            [
              6413,
              [
                [1188, [0, '      tags: post.tags,'], 249],
                [[[1210, null]], null],
              ],
            ],
          ]),
          ...ch1(3293, 3293, [[1239, [[1459], [[[782, 790]], null]]]]),
          ...ch1(3334, 3356, [
            [
              651,
              [
                [792, [9, '[]'], 658],
                [[[794, null]], null],
              ],
            ],
            [
              1382,
              [
                [793, [0, "'C++'"], 659],
                [[[798, null]], null],
              ],
            ],
            [
              1794,
              [
                [798, [0, ", 'Angular'"], 659],
                [[[809, null]], null],
              ],
            ],
            [
              2168,
              [
                [809, [0, ", 'Cats'"], 659],
                [[[817, null]], null],
              ],
            ],
            [
              2564,
              [
                [817, [0, ", 'Memes'"], 659],
                [[[826, null]], null],
              ],
            ],
            [
              2960,
              [
                [826, [0, ", 'News'"], 659],
                [[[834, null]], null],
              ],
            ],
          ]),
          ...ch1(3391, 3391, [
            [
              3382,
              [
                [792, [43, 'post.tags'], 658],
                [[[801, null]], null],
              ],
            ],
          ]),
          ...ch1(3496, 3520, [
            [1197, [[1459], [[[847, 854]], null]]],
            [2466, [[1459], [[[909, 917]], null]]],
          ]),
          ...ch1(3770, 3784, [
            [
              417,
              [
                [1188, [22], 249],
                [[[1188, null]], null],
              ],
            ],
            [
              704,
              [
                [1187, [1], 249],
                [[[1187, null]], null],
              ],
            ],
            [
              937,
              [
                [1149, [38], 249],
                [[[1149, null]], null],
              ],
            ],
            [
              1147,
              [
                [1148, [1], 249],
                [[[1148, null]], null],
              ],
            ],
            [
              1341,
              [
                [1126, [22], 249],
                [[[1126, null]], null],
              ],
            ],
            [
              1542,
              [
                [1125, [1], 249],
                [[[1125, null]], null],
              ],
            ],
            [
              1731,
              [
                [1093, [32], 249],
                [[[1093, null]], null],
              ],
            ],
            [
              1894,
              [
                [1092, [1], 249],
                [[[1092, null]], null],
              ],
            ],
            [
              2081,
              [
                [1060, [32], 249],
                [[[1060, null]], null],
              ],
            ],
            [
              2288,
              [
                [1059, [1], 249],
                [[[1059, null]], null],
              ],
            ],
            [
              2494,
              [
                [1037, [22], 249],
                [[[1037, null]], null],
              ],
            ],
            [
              2718,
              [
                [1036, [1], 249],
                [[[1036, null]], null],
              ],
            ],
            [
              2948,
              [
                [934, [25], 326],
                [[[934, null]], null],
              ],
            ],
            [
              3198,
              [
                [933, [1], 326],
                [[[933, null]], null],
              ],
            ],
            [
              3434,
              [
                [905, [28], 326],
                [[[905, null]], null],
              ],
            ],
            [
              3686,
              [
                [904, [1], 326],
                [[[904, null]], null],
              ],
            ],
            [
              3961,
              [
                [874, [30], 326],
                [[[874, null]], null],
              ],
            ],
            [
              4187,
              [
                [873, [1], 326],
                [[[873, null]], null],
              ],
            ],
            [
              4449,
              [
                [843, [30], 326],
                [[[843, null]], null],
              ],
            ],
            [
              4690,
              [
                [842, [1], 326],
                [[[842, null]], null],
              ],
            ],
            [
              4978,
              [
                [803, [39], 326],
                [[[803, null]], null],
              ],
            ],
            [
              5214,
              [
                [802, [1], 326],
                [[[802, null]], null],
              ],
            ],
            [
              5501,
              [
                [778, [24], 326],
                [[[778, null]], null],
              ],
            ],
            [
              5939,
              [
                [777, [1], 326],
                [[[777, null]], null],
              ],
            ],
          ]),
          ...ch1(3886, 3900, [
            [
              631,
              [
                [861, [0, '', ''], 242],
                [[[862, null]], null],
              ],
            ],
            [
              970,
              [
                [862, [0, '    twitter: {'], 242],
                [[[876, null]], null],
              ],
            ],
            [
              1250,
              [
                [876, [0, '', ''], 242],
                [[[877, null]], null],
              ],
            ],
            [
              1462,
              [
                [877, [0, '      title,'], 242],
                [[[889, null]], null],
              ],
            ],
            [
              1744,
              [
                [889, [0, '', ''], 242],
                [[[890, null]], null],
              ],
            ],
            [
              1978,
              [
                [890, [0, '      description,'], 242],
                [[[908, null]], null],
              ],
            ],
            [
              2270,
              [
                [908, [0, '', ''], 242],
                [[[909, null]], null],
              ],
            ],
            [
              2548,
              [
                [909, [0, '      images: thumbnailUrl,'], 242],
                [[[936, null]], null],
              ],
            ],
            [
              2960,
              [
                [936, [0, '', ''], 242],
                [[[937, null]], null],
              ],
            ],
            [
              3359,
              [
                [937, [0, '    },'], 242],
                [[[943, null]], null],
              ],
            ],
          ]),
          ...ch1(4190, 4210, [
            [
              465,
              [
                [937, [6], 242],
                [[[937, null]], null],
              ],
            ],
            [
              786,
              [
                [936, [1], 242],
                [[[936, null]], null],
              ],
            ],
            [
              1080,
              [
                [909, [27], 242],
                [[[909, null]], null],
              ],
            ],
            [
              1360,
              [
                [908, [1], 242],
                [[[908, null]], null],
              ],
            ],
            [
              1652,
              [
                [890, [18], 242],
                [[[890, null]], null],
              ],
            ],
            [
              1932,
              [
                [889, [1], 242],
                [[[889, null]], null],
              ],
            ],
            [
              2208,
              [
                [877, [12], 242],
                [[[877, null]], null],
              ],
            ],
            [
              2496,
              [
                [876, [1], 242],
                [[[876, null]], null],
              ],
            ],
            [
              2812,
              [
                [862, [14], 242],
                [[[862, null]], null],
              ],
            ],
            [
              3164,
              [
                [861, [1], 242],
                [[[861, null]], null],
              ],
            ],
          ]),
          ...ch1(4282, 4282, [[2200, [[1103], [[[865, 748]], null]]]]),
          ...ch1(4344, 4390, [
            [2662, [[1103], [[[754, 759]], null]]],
            [3939, [[1103], [[[765, 776]], null]]],
          ]),
          ...ch1(4422, 4422, [[7465, [[1103], [[[713, 736]], null]]]]),
          ...ch1(4456, 4456, [[10675, [[1103], [[[865, 748]], null]]]]),
          ...ch1(5255, 5280, [
            [
              727,
              [
                [150, [0, '', ''], 953],
                [[[151, null]], null],
              ],
            ],
            [
              1596,
              [
                [
                  151,
                  [
                    0,
                    "import { constructMetadata } from '~/lib/metadata/construct-metadata'",
                  ],
                  953,
                ],
                [[[220, null]], null],
              ],
            ],
            [2371, [[1173], [[[151, 221]], null]]],
            [
              3569,
              [
                [
                  592,
                  [
                    110,
                    '    return constructMetadata({',
                    "      title: 'Post Not Found',",
                    '    })',
                  ],
                  471,
                ],
                [[[660, null]], null],
              ],
            ],
            [5841, [[1131], [[[660, 596]], null]]],
            [
              7176,
              [
                [
                  666,
                  [99, '  const { title, description, thumbnailUrl } = post'],
                  366,
                ],
                [[[717, null]], null],
              ],
            ],
            [9273, [[1083], [[[717, 668]], null]]],
            [
              10450,
              [
                [
                  719,
                  [
                    126,
                    '  return constructMetadata({',
                    '    title,',
                    '    description,',
                    '    images: thumbnailUrl,',
                    '  })',
                  ],
                  238,
                ],
                [[[806, null]], null],
              ],
            ],
            [12465, [[1044], [[[806, 721]], null]]],
          ]),
          ...ch1(5334, 5334, [
            [
              978,
              [
                [746, [59], 239],
                [[[746, null]], null],
              ],
            ],
          ]),
          ...ch1(5381, 5381, [
            [
              1569,
              [
                [746, [0, '{', "    title: 'Blog',", '  }'], 239],
                [[[770, null]], null],
              ],
            ],
          ]),
          ...ch1(5394, 5394, [
            [
              2188,
              [
                [
                  746,
                  [
                    24,
                    '{',
                    "    description: 'Some unique description'",
                    '  }',
                  ],
                  239,
                ],
                [[[794, null]], null],
              ],
            ],
          ]),
          ...ch1(5424, 5424, [
            [
              2755,
              [
                [
                  746,
                  [
                    48,
                    '{',
                    '    title,',
                    '    description,',
                    '    images: thumbnailUrl,',
                    '  }',
                  ],
                  239,
                ],
                [[[805, null]], null],
              ],
            ],
          ]),
        ],
      }),
      new AssetText({
        _id: 'lib/react/with-static-params.ts',
        type: 'text',
        name: 'lib/react/with-static-params.ts',
        initialValue: textFromTemplate(''),
        advances: [
          ...ch1(2334, 2334, [
            [
              841,
              [
                [
                  [
                    0,
                    'export type WithStaticParams<F> = F extends () => Promise<',
                    '  ReadonlyArray<infer T>',
                    '>',
                    '  ? { params: Promise<T> }',
                    '  : never',
                    '',
                  ],
                ],
                [[[123, 0]], null],
              ],
            ],
          ]),
        ],
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
        advances: [],
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
          ...ch1(4660, 4675, [
            [
              654,
              [
                [144, [0, '', ''], 4],
                [[[145, null]], null],
              ],
            ],
            [
              939,
              [
                [145, [0, '  '], 4],
                [[[147, null]], null],
              ],
            ],
            [
              1208,
              [
                [144, [0, '', ''], 7],
                [[[145, null]], null],
              ],
            ],
            [
              1533,
              [
                [145, [0, '    title,'], 7],
                [[[155, null]], null],
              ],
            ],
            [
              1781,
              [
                [155, [0, '', ''], 7],
                [[[156, null]], null],
              ],
            ],
            [
              2050,
              [
                [156, [0, '    description,'], 7],
                [[[172, null]], null],
              ],
            ],
            [
              2293,
              [
                [172, [0, '', ''], 7],
                [[[173, null]], null],
              ],
            ],
            [
              2547,
              [
                [173, [0, '    openGraph: {'], 7],
                [[[189, null]], null],
              ],
            ],
            [
              2808,
              [
                [189, [0, '', ''], 7],
                [[[190, null]], null],
              ],
            ],
            [
              3139,
              [
                [190, [0, '    },'], 7],
                [[[196, null]], null],
              ],
            ],
            [
              3384,
              [
                [189, [0, '', ''], 14],
                [[[190, null]], null],
              ],
            ],
            [
              3651,
              [
                [190, [0, '      title,'], 14],
                [[[202, null]], null],
              ],
            ],
            [
              3919,
              [
                [202, [0, '', ''], 14],
                [[[203, null]], null],
              ],
            ],
            [
              4223,
              [
                [203, [0, '      description,'], 14],
                [[[221, null]], null],
              ],
            ],
            [
              4689,
              [
                [221, [0, '', ''], 14],
                [[[222, null]], null],
              ],
            ],
            [
              4853,
              [
                [222, [0, '      images,'], 14],
                [[[235, null]], null],
              ],
            ],
          ]),
          ...ch1(4770, 4785, [
            [
              342,
              [
                [133, [0, '', '  title = ``'], 116],
                [[[146, 133]], null],
              ],
            ],
            [
              733,
              [
                [145, [0, '${title}'], 117],
                [[[153, 145]], null],
              ],
            ],
            [
              1177,
              [
                [153, [0, ' • '], 117],
                [[[156, 153]], null],
              ],
            ],
            [
              1653,
              [
                [156, [0, '${constants.appName}'], 117],
                [[[176, 156]], null],
              ],
            ],
          ]),
          ...ch1(4846, 4855, [
            [
              658,
              [
                [74, [1, '', '  '], 218],
                [[[77, null]], null],
              ],
            ],
            [
              1061,
              [
                [90, [2, '', '  '], 203],
                [[[93, null]], null],
              ],
            ],
            [
              1523,
              [
                [112, [2, '', '  '], 182],
                [[[115, null]], null],
              ],
            ],
            [
              1987,
              [
                [129, [1, '', ''], 167],
                [[[130, null]], null],
              ],
            ],
            [
              2501,
              [
                [82, [8, '?: string | undefined'], 207],
                [[[103, null]], null],
              ],
            ],
          ]),
          ...ch1(4960, 4975, [
            [
              3025,
              [
                [161, [0, 'title ? '], 149],
                [[[169, null]], null],
              ],
            ],
            [
              3555,
              [
                [202, [0, ' : constants.appName'], 116],
                [[[222, null]], null],
              ],
            ],
          ]),
          ...ch1(5030, 5045, [
            [
              558,
              [
                [117, [8, '?: string | undefined'], 213],
                [[[138, null]], null],
              ],
            ],
            [
              1315,
              [
                [58, [0, ' = constants.appDescription'], 293],
                [[[85, null]], null],
              ],
            ],
          ]),
          ...ch1(5115, 5135, [
            [
              489,
              [
                [95, [0, " = '/images/og.png'"], 283],
                [[[114, null]], null],
              ],
            ],
            [
              850,
              [
                [
                  119,
                  [
                    84,
                    'Partial<{',
                    '  title: string',
                    '  description: string',
                    '  images: string',
                    '}>',
                  ],
                  194,
                ],
                [[[186, null]], null],
              ],
            ],
            [
              1215,
              [
                [186, [0, ' = {}'], 194],
                [[[191, null]], null],
              ],
            ],
            [1260, [[385], [[[189, 191]], null]]],
          ]),
          ...ch1(5424, 5445, [
            [
              383,
              [
                [115, [0, '', '  '], 270],
                [[[118, null]], null],
              ],
            ],
            [
              720,
              [
                [118, [0, 'canonical,', '  noIndex'], 270],
                [[[138, null]], null],
              ],
            ],
            [
              1040,
              [
                [206, [0, '', '  '], 202],
                [[[209, null]], null],
              ],
            ],
            [
              1365,
              [
                [209, [0, 'canonical: string', '  noIndex: boolean'], 202],
                [[[245, null]], null],
              ],
            ],
            [
              3170,
              [
                [440, [0, '', '    '], 7],
                [[[445, null]], null],
              ],
            ],
            [
              3417,
              [
                [
                  445,
                  [
                    0,
                    '...(canonical && {',
                    '\t  alternates: {',
                    '\t    canonical,',
                    '\t  },',
                    '\t}),',
                    '\t...(noIndex && {',
                    '\t  robots: {',
                    '\t    index: false,',
                    '\t    follow: false,',
                    '\t  },',
                    '\t}),',
                  ],
                  7,
                ],
                [[[588, null]], null],
              ],
            ],
          ]),
          ...ch1(8015, 8015, [[1285, [[595], [[[115, 89]], null]]]]),
          ...ch1(8028, 8028, [[1285, [[595], [[[115, 89]], null]]]]),
        ],
      }),
      new AssetText({
        _id: 'app/sitemap.ts',
        type: 'text',
        name: 'app/sitemap.ts',
        initialValue:
          textFromTemplate(`export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
}
`),
        advances: [
          ...ch1(5705, 5732, [
            [
              606,
              [
                [
                  73,
                  [0, '', '  const posts = await fetchAllPostSlugsWithDates()'],
                  3,
                ],
                [[[124, 73]], null],
              ],
            ],
            [
              1577,
              [
                [
                  124,
                  [
                    0,
                    '',
                    '',
                    '  return [',
                    '    {',
                    "      url: 'https://example.com',",
                    '    },',
                    '    {',
                    "      url: 'https://example.com/about',",
                    '    },',
                    '    {',
                    "      url: 'https://example.com/blog',",
                    '    },',
                    '    ...posts.map(({ slug, updatedAt }) => ({',
                    '      url: `https://example.com/blog/${slug}`,',
                    '      lastModified: updatedAt,',
                    '    })),',
                    '  ]',
                  ],
                  3,
                ],
                [[[424, 124]], null],
              ],
            ],
          ]),
          ...ch1(6312, 6340, [
            [
              429,
              [
                [[0, '', ''], 427],
                [[[1, null]], null],
              ],
            ],
            [
              749,
              [
                [1, [0, '', ''], 427],
                [[[2, null]], null],
              ],
            ],
            [
              1113,
              [
                [
                  [
                    0,
                    "import type { MetadataRoute } from 'next'",
                    "import { resolveUrl } from '~/lib/metadata/resolvers'",
                  ],
                  429,
                ],
                [[[95, null]], null],
              ],
            ],
            [
              1456,
              [
                [251, [21, 'resolveUrl()'], 252],
                [[[263, null]], null],
              ],
            ],
            [
              1845,
              [
                [289, [27, "resolveUrl('about')"], 199],
                [[[308, null]], null],
              ],
            ],
            [
              2218,
              [
                [334, [26, "resolveUrl('blog')"], 147],
                [[[352, null]], null],
              ],
            ],
            [
              2571,
              [
                [417, [34, "resolveUrl('blog/${slug}')"], 48],
                [[[443, null]], null],
              ],
            ],
          ]),
          ...ch1(6566, 6723, [
            [981, [[491], [[[451, 463]], null]]],
            [2773, [[491], [[[458, null]], null]]],
          ]),
        ],
      }),
      new AssetText({
        _id: 'lib/metadata/resolvers.ts',
        type: 'text',
        name: 'lib/metadata/resolvers.ts',
        initialValue: textFromTemplate(''),
        advances: [
          ...ch1(6130, 6163, [
            [
              550,
              [
                [
                  [
                    0,
                    "import {} from 'next/dist/lib/metadata/resolvers/resolve-url'",
                    '',
                  ],
                ],
                [[[0, 62]], null],
              ],
            ],
            [
              1173,
              [
                [
                  8,
                  [
                    0,
                    '',
                    '  getSocialImageMetadataBaseFallback,',
                    '  resolveAbsoluteUrlWithPathname,',
                    '',
                  ],
                  54,
                ],
                [[[81, 8]], null],
              ],
            ],
            [
              1809,
              [
                [
                  134,
                  [
                    0,
                    '',
                    '',
                    "export const resolveUrl = (url = '/') =>",
                    '  resolveAbsoluteUrlWithPathname()',
                  ],
                  1,
                ],
                [[[211, 134]], null],
              ],
            ],
            [
              2717,
              [
                [
                  210,
                  [
                    0,
                    '',
                    '    url,',
                    '    getSocialImageMetadataBaseFallback(null),',
                    '    {',
                    '      trailingSlash: false,',
                    "      pathname: '/',",
                    '      isStaticMetadataRouteFile: false,',
                    '    },',
                    '  ',
                  ],
                  2,
                ],
                [[[370, 210]], null],
              ],
            ],
          ]),
        ],
      }),
      new AssetText({
        _id: 'app/robots.ts',
        type: 'text',
        name: 'app/robots.ts',
        initialValue:
          textFromTemplate(`import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {}
}
`),
        advances: [
          ...ch1(7822, 7834, [
            [
              606,
              [
                [110, [0, '', '    ', '  '], 4],
                [[[115, null]], null],
              ],
            ],
            [
              927,
              [
                [
                  115,
                  [
                    0,
                    'rules: [',
                    '      {',
                    "        userAgent: '*',",
                    "        allow: ['/'],",
                    '      },',
                    '    ],',
                  ],
                  7,
                ],
                [[[193, null]], null],
              ],
            ],
          ]),
          ...ch1(7848, 7892, [
            [639, [[200], [[[177, null]], null]]],
            [
              300,
              [
                [177, [0, '', '        '], 23],
                [[[186, null]], null],
              ],
            ],
            [
              600,
              [
                [186, [0, "disallow: ['/api/*']"], 23],
                [[[206, null]], null],
              ],
            ],
            [
              910,
              [
                [178, [28], 23],
                [[[178, null]], null],
              ],
            ],
            [
              1200,
              [
                [177, [1], 23],
                [[[177, null]], null],
              ],
            ],
          ]),
          ...ch1(7894, 7920, [
            [
              481,
              [
                [41, [0, '', ''], 159],
                [[[42, null]], null],
              ],
            ],
            [
              1206,
              [
                [
                  42,
                  [0, "import { resolveUrl } from '~/lib/metadata/resolvers'"],
                  159,
                ],
                [[[95, null]], null],
              ],
            ],
            [
              1641,
              [
                [247, [0, '', '    '], 7],
                [[[252, null]], null],
              ],
            ],
            [
              2213,
              [
                [252, [0, "sitemap: resolveUrl('sitemap.xml'),"], 7],
                [[[287, null]], null],
              ],
            ],
          ]),
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
