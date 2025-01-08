import type { Captions } from '~/model/captions'

export const captionsRepository: ReadonlyArray<typeof Captions.Encoded> = [
  {
    postSlug: 'nextjs-metadata',
    content: JSON.stringify({
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
              text: ' think Next.js won’t fall back to Open Graph tags if needed?  ',
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
    }),
  },
]
