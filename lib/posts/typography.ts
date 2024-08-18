export const typography = {
  name: 'Typography',
  lead: 'Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.',
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you ',
          },
          {
            type: 'text',
            marks: [{ type: 'italic' }],
            text: 'really are',
          },
          {
            type: 'text',
            text: ' just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'We get lots of complaints about it actually, with people regularly asking us things like:',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a ",
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'p' },
          {
            type: 'text',
            text: ' element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look ',
          },
          { type: 'text', marks: [{ type: 'italic' }], text: 'awesome' },
          { type: 'text', text: ', not awful.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'The ' },
          {
            type: 'text',
            marks: [{ type: 'code' }],
            text: '@tailwindcss/typography',
          },
          {
            type: 'text',
            text: ' plugin is our attempt to give you what you ',
          },
          { type: 'text', marks: [{ type: 'italic' }], text: 'actually' },
          {
            type: 'text',
            text: ' want, without any of the downsides of doing something stupid like disabling our base styles.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'It adds a new ' },
          { type: 'text', marks: [{ type: 'code' }], text: 'prose' },
          {
            type: 'text',
            text: ' class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'textStyle' }],
            text: 'For more information about how to use the plugin and the features it includes, ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://github.com/tailwindcss/typography/blob/master/README.md',
                },
              },
            ],
            text: 'read the documentation',
          },
          { type: 'text', marks: [{ type: 'textStyle' }], text: '.' },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 0 },
        content: [
          {
            type: 'text',
            text: 'What to expect from here on out',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like ",
          },
          { type: 'text', marks: [{ type: 'bold' }], text: 'bold text' },
          {
            type: 'text',
            text: ', unordered lists, ordered lists, code blocks, block quotes, ',
          },
          {
            type: 'text',
            marks: [{ type: 'italic' }],
            text: 'and even italics',
          },
          { type: 'text', text: '.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "It's important to cover all of these use cases for a few reasons:",
          },
        ],
      },
      {
        type: 'orderedList',
        attrs: { start: 1 },
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'We want everything to look good out of the box.',
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
                    text: "Really just the first reason, that's the whole point of the plugin.",
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
                    text: "Here's a third pretend reason though a list with three items looks more realistic than a list with two items.",
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
            text: "Now we're going to try out another header style.",
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [
          {
            type: 'text',
            text: 'Typography should be easy',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Something a wise person once told me about typography is:',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "It's probably important that images look okay here by default as well:",
          },
          { type: 'hardBreak' },
          { type: 'hardBreak' },
          {
            type: 'text',
            text: "Now I'm going to show you an example of an unordered list to make sure that looks good, too:",
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
                    text: 'So here is the first item in this list.',
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
                    text: "In this example we're keeping the items short.",
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
                    text: "Later, we'll use longer, more complex list items.",
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
          { type: 'text', text: "And that's the end of this section." },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 0 },
        content: [
          {
            type: 'text',
            text: 'What if we stack headings?',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [
          {
            type: 'text',
            text: 'We should make sure that looks good, too.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [
          {
            type: 'text',
            text: 'When a heading comes after a paragraph…',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.",
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
                    marks: [{ type: 'bold' }],
                    text: 'I often do this thing where list items have headings.',
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: "For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.",
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: "I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.",
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
                    marks: [{ type: 'bold' }],
                    text: 'Since this is a list, I need at least two items.',
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: "I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.",
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
                    marks: [{ type: 'bold' }],
                    text: "It's not a bad idea to add a third item either.",
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: "I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it. I'm going to press ",
                  },
                  {
                    type: 'text',
                    marks: [{ type: 'bold' }],
                    text: 'Enter',
                  },
                  { type: 'text', text: ' now.' },
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
            text: 'After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 0 },
        content: [
          {
            type: 'text',
            text: 'Code should look okay by default.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'I think most people are going to use ' },
          {
            type: 'text',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://highlightjs.org/',
                },
              },
            ],
            text: 'highlight.js',
          },
          { type: 'text', text: ' or ' },
          {
            type: 'text',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://prismjs.com/',
                },
              },
            ],
            text: 'Prism',
          },
          {
            type: 'text',
            text: " or something if they want to style their code blocks but it wouldn't hurt to make them look ",
          },
          { type: 'text', marks: [{ type: 'italic' }], text: 'okay' },
          {
            type: 'text',
            text: ' out of the box, even with no syntax highlighting.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: "Here's what a default " },
          {
            type: 'text',
            marks: [{ type: 'code' }],
            text: 'tailwind.config.js',
          },
          { type: 'text', text: ' file looks like at the time of writing:' },
          { type: 'hardBreak' },
          { type: 'hardBreak' },
          {
            type: 'text',
            marks: [{ type: 'textStyle' }],
            text: 'Hopefully that looks good enough to you.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [
          {
            type: 'text',
            text: 'What about nested lists?',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.",
          },
        ],
      },
      {
        type: 'orderedList',
        attrs: { start: 1 },
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    marks: [{ type: 'bold' }],
                    text: 'Nested lists are rarely a good idea.',
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
                            text: 'You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.',
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
                            text: 'Nested navigation in UIs is a bad idea too, keep things as flat as possible.',
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
                            text: 'Nesting tons of folders in your source code is also not helpful.',
                          },
                        ],
                      },
                    ],
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
                    marks: [{ type: 'bold' }],
                    text: "Since we need to have more items, here's another one.",
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
                            text: "I'm not sure if we'll bother styling more than two levels deep.",
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
                            text: 'Two is already too much, three is guaranteed to be a bad idea.',
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
                            text: 'If you nest four levels deep you belong in prison.',
                          },
                        ],
                      },
                    ],
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
                    marks: [{ type: 'bold' }],
                    text: "Two items isn't really a list, three is good though.",
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
                            text: "Again please don't nest lists if you want people to actually read your content.",
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
                            text: 'Nobody wants to look at this.',
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
                            text: "I'm upset that we even have to bother styling this.",
                          },
                        ],
                      },
                    ],
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
            text: 'The most annoying thing about lists in Markdown is that ',
          },
          { type: 'text', marks: [{ type: 'code' }], text: '<li>' },
          { type: 'text', text: " elements aren't given a child " },
          { type: 'text', marks: [{ type: 'code' }], text: '<p>' },
          {
            type: 'text',
            text: ' tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.',
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
                    marks: [{ type: 'bold' }],
                    text: "For example, here's another nested list.",
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'But this time with a second paragraph.',
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
                            text: "These list items won't have ",
                          },
                          {
                            type: 'text',
                            marks: [{ type: 'code' }],
                            text: '<p>',
                          },
                          { type: 'text', text: ' tags' },
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
                            text: 'Because they are only one line each',
                          },
                        ],
                      },
                    ],
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
                    marks: [{ type: 'bold' }],
                    text: 'But in this second top-level list item, they will.',
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'This is especially annoying because of the spacing on this paragraph.',
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
                            text: "As you can see here, because I've added a second line, this list item now has a ",
                          },
                          {
                            type: 'text',
                            marks: [{ type: 'code' }],
                            text: '<p>',
                          },
                          { type: 'text', text: ' tag.' },
                        ],
                      },
                      {
                        type: 'paragraph',
                        content: [
                          {
                            type: 'text',
                            text: "This is the second line I'm talking about by the way.",
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
                            text: "Finally here's another list item so it's more like a list.",
                          },
                        ],
                      },
                    ],
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
                    text: 'A closing list item, but with no nested list, because why not?',
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
            text: 'And finally a sentence to close off this section.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 0 },
        content: [
          {
            type: 'text',
            text: "We didn't forget about description lists",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Well, that's not exactly true, we first released this plugin back in 2020 and it took three years before we added description lists. But they're here now, so let's just be happy about that…okay? They can be great for things like FAQs.",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'bold' }],
            text: 'Why do you never see elephants hiding in trees?',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'bold' }],
            text: 'What do you call someone with no body and no nose?',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, voluptas ipsa quia excepturi, quibusdam natus exercitationem sapiente tempore labore voluptatem.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'bold' }],
            text: "Why can't you hear a pterodactyl go to the bathroom?",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Because the pee is silent. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, quas voluptatibus ex culpa ipsum, aspernatur blanditiis fugiat ullam magnam suscipit deserunt illum natus facilis atque vero consequatur! Quisquam, debitis error.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 0 },
        content: [
          {
            type: 'text',
            text: 'There are other elements we need to style',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'I almost forgot to mention links, like ' },
          {
            type: 'text',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://tailwindcss.com/',
                },
              },
            ],
            text: 'this link to the Tailwind CSS website',
          },
          {
            type: 'text',
            text: ". We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'textStyle' }],
            text: 'We also need to make sure inline code looks good, like if I wanted to talk about ',
          },
          { type: 'text', marks: [{ type: 'code' }], text: '<span>' },
          {
            type: 'text',
            marks: [{ type: 'textStyle' }],
            text: ' elements or tell you the good news about ',
          },
          {
            type: 'text',
            marks: [{ type: 'code' }],
            text: '@tailwindcss/typography',
          },
          { type: 'text', marks: [{ type: 'textStyle' }], text: '.' },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [
          {
            type: 'text',
            text: 'Sometimes I even use ',
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'code' },
          { type: 'text', text: ' in headings' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Even though it's probably a bad idea, and historically I've had a hard time making it look good. This ",
          },
          {
            type: 'text',
            marks: [{ type: 'italic' }],
            text: '"wrap the code blocks in backticks"',
          },
          { type: 'text', text: ' trick works pretty well though really.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Another thing I've done in the past is put a ",
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'code' },
          {
            type: 'text',
            text: ' tag inside of a link, like if I wanted to tell you about the ',
          },
          {
            type: 'text',
            marks: [{ type: 'code' }],
            text: 'tailwindcss/docs',
          },
          {
            type: 'text',
            text: " repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'bold' }],
            text: "We haven't used an ",
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'h4' },
          { type: 'text', text: ' yet' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: "But now we have. Please don't use " },
          { type: 'text', marks: [{ type: 'code' }], text: 'h5' },
          { type: 'text', text: ' or ' },
          { type: 'text', marks: [{ type: 'code' }], text: 'h6' },
          {
            type: 'text',
            text: ' in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a ',
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'before' },
          {
            type: 'text',
            text: ' pseudo-element to scream at you if you use an ',
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'h5' },
          { type: 'text', text: ' or ' },
          { type: 'text', marks: [{ type: 'code' }], text: 'h6' },
          { type: 'text', text: '.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "We don't style them at all out of the box because ",
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'h4' },
          {
            type: 'text',
            text: ' elements are already so small that they are the same size as the body copy. What are we supposed to do with an ',
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'h5' },
          { type: 'text', text: ', make it ' },
          { type: 'text', marks: [{ type: 'italic' }], text: 'smaller' },
          { type: 'text', text: ' than the body copy? No thanks.' },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [
          {
            type: 'text',
            text: 'We still need to think about stacked headings though.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [{ type: 'bold' }],
            text: "Let's make sure we don't screw that up with ",
          },
          { type: 'text', marks: [{ type: 'code' }], text: 'h4' },
          { type: 'text', text: ' elements, either.' },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Phew, with any luck we have styled the headings above this text and they look pretty good.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.",
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "What I've written here is probably long enough, but adding this final sentence can't hurt.",
          },
        ],
      },
    ],
  },
}
