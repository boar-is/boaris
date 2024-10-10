import type { ComponentPropsWithoutRef } from 'react'
import { cx } from '~/src/lib/react/cx'
import { Image } from '~/src/primitives/image'

import cssFileTypeSrc from '~/public/icons/file-types/css.svg'
import defaultFileTypeSrc from '~/public/icons/file-types/default.svg'
import htmlFileTypeSrc from '~/public/icons/file-types/html.svg'
import imageFileTypeSrc from '~/public/icons/file-types/image.svg'
import javascriptFileTypeSrc from '~/public/icons/file-types/javascript.svg'
import jsonFileTypeSrc from '~/public/icons/file-types/json.svg'
import jsxFileTypeSrc from '~/public/icons/file-types/jsx.svg'
import markdownFileTypeSrc from '~/public/icons/file-types/markdown.svg'
import sassFileTypeSrc from '~/public/icons/file-types/sass.svg'
import shellFileTypeSrc from '~/public/icons/file-types/shell.svg'
import tsxFileTypeSrc from '~/public/icons/file-types/tsx.svg'
import typescriptFileTypeSrc from '~/public/icons/file-types/typescript.svg'
import yamlFileTypeSrc from '~/public/icons/file-types/yaml.svg'

export {
  MenuIcon,
  XIcon as CloseIcon,
  FileVideo as VideoFileTypeIcon,
  LinkIcon,
} from 'lucide-react'

type SvgIconProps = ComponentPropsWithoutRef<'svg'>
type ImageIconProps = { className?: string | undefined }

function ImageIconBase({
  className,
  src,
  alt,
  ...props
}: ImageIconProps & { src: string; alt: string }) {
  return (
    <div className={cx('relative', className)} {...props}>
      <Image src={src} alt={alt} fill />
    </div>
  )
}

export function Brand2Icon(props: SvgIconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 106 25" {...props}>
      <title>Coursair</title>
      <path d="M12.66 17.12a16.07 16.07 0 0 1-1.72 3.07 12.3 12.3 0 0 1-1.99 2.18 7.6 7.6 0 0 1-2.08 1.28c-.7.28-1.38.41-2.05.41-.66 0-1.27-.15-1.82-.44-.53-.3-1-.75-1.4-1.35a7.86 7.86 0 0 1-1-2.2 12.2 12.2 0 0 1-.35-3.08A21.45 21.45 0 0 1 3.42 5.8a13 13 0 0 1 3.55-3.74A7.87 7.87 0 0 1 11.54.6a3.52 3.52 0 0 1 2.7 1.21 5.13 5.13 0 0 1 1.12 3.26v.42c0 .13-.02.27-.04.42l-4.2 1.12c-.25-.53-.55-.8-.89-.8-.34 0-.7.2-1.09.6-.36.4-.72.9-1.08 1.54a23.92 23.92 0 0 0-2.6 6.72c-.15.7-.22 1.28-.22 1.73 0 .68.09 1.16.26 1.44.19.28.43.42.73.42.24 0 .5-.09.8-.26.3-.19.58-.42.83-.7a5.58 5.58 0 0 0 1.16-2.08l3.64 1.47Zm17.2-10.43c0 1.75-.2 3.4-.58 4.96a21.26 21.26 0 0 1-1.47 4.25 17.6 17.6 0 0 1-4.74 6.05c-.9.7-1.8 1.25-2.72 1.63-.91.37-1.79.55-2.62.55-.7 0-1.34-.13-1.92-.39a4.46 4.46 0 0 1-1.5-1.18 6.17 6.17 0 0 1-1.03-2.02 11.2 11.2 0 0 1-.35-2.97c0-1.2.15-2.46.45-3.78.3-1.32.7-2.63 1.21-3.93.52-1.3 1.14-2.54 1.9-3.72.74-1.17 1.56-2.2 2.46-3.1.9-.92 1.85-1.64 2.88-2.18a6.87 6.87 0 0 1 3.2-.8 4.24 4.24 0 0 1 3.84 2.15c.36.62.61 1.32.76 2.11.15.79.23 1.58.23 2.37ZM17.7 16.74a2.33 2.33 0 0 0 .48 1.4c.15.2.33.37.54.52.24.12.48.19.74.19.96 0 1.81-.33 2.56-1a8.18 8.18 0 0 0 1.85-2.43c.5-.96.87-1.98 1.12-3.07.28-1.09.42-2.08.42-2.97a5.9 5.9 0 0 0-.26-1.67 1.35 1.35 0 0 0-.44-.64 1.1 1.1 0 0 0-.8-.29 3.6 3.6 0 0 0-1.9.52c-.57.34-1.1.8-1.56 1.37-.45.56-.84 1.2-1.18 1.92-.35.7-.64 1.43-.9 2.18a13.57 13.57 0 0 0-.67 3.97Zm23.33 1.02a9.87 9.87 0 0 1-1.28 3.1 7.64 7.64 0 0 1-4.26 3.33 8.3 8.3 0 0 1-2.5.39c-.48 0-.98-.09-1.5-.26a4 4 0 0 1-2.4-1.92 3.69 3.69 0 0 1-.38-1.73v-.25a57.66 57.66 0 0 1 .45-3.42l.6-3.88c.22-1.34.45-2.69.71-4.03a220.29 220.29 0 0 1 1.5-7.84l1.6-.16a614.71 614.71 0 0 0 3.68-.35 695.6 695.6 0 0 0-1.47 7l-.57 2.7c-.17.89-.34 1.7-.52 2.46a69.2 69.2 0 0 1-.7 3.26l-.26 1.31c-.08.51-.12.98-.12 1.41 0 .34.08.63.25.86.17.22.39.32.64.32.37 0 .66-.13.9-.41.23-.3.43-.65.57-1.06.18-.4.3-.8.36-1.21a322.24 322.24 0 0 0 1.12-5.4 89 89 0 0 0 .48-2.54l.48-2.5c.36-1.87.71-3.81 1.05-5.82L44.33.8l-.16.83a391.22 391.22 0 0 0-1 5.35c-.19 1.17-.41 2.4-.67 3.68a1132.28 1132.28 0 0 1-1.47 7.1Zm.22 6.27 1.67-8.32c.19-1.15.4-2.34.64-3.58.23-1.26.45-2.5.64-3.71a172.71 172.71 0 0 0 1.02-6.7A31 31 0 0 1 53.35.6c.83 0 1.51.1 2.05.3.55.19.98.47 1.28.83.32.34.54.74.67 1.21s.2 1 .2 1.57c0 .86-.16 1.7-.46 2.53a11.85 11.85 0 0 1-2.94 4.35 9.22 9.22 0 0 1-2.08 1.47c.38.86.79 1.8 1.21 2.82a132.51 132.51 0 0 1 2.56 6.08l-4.96 1.73c-.42-1.47-.8-2.86-1.15-4.16a168.52 168.52 0 0 1-.86-3.23c-.13-.52-.24-.96-.32-1.35a8.2 8.2 0 0 1-.16-.9l-.42.13c-.13.69-.28 1.52-.48 2.5l-.48 2.85-.57 3.36-5.19 1.34Zm7.52-13.89c.4-.04.9-.2 1.47-.5a10.18 10.18 0 0 0 3.07-2.37c.4-.45.58-.85.58-1.19a.68.68 0 0 0-.22-.54 1.3 1.3 0 0 0-.64-.32 3.46 3.46 0 0 0-.87-.16 14.92 14.92 0 0 0-1.72 0h-.64l-1.03 5.08Zm20.44 5.96a7.64 7.64 0 0 1-2.56 5.76 8.06 8.06 0 0 1-2.75 1.63 9.76 9.76 0 0 1-3.4.57c-.85 0-1.7-.22-2.56-.67a8.34 8.34 0 0 1-2.46-2.2l2.37-4.65c.15.28.37.57.67.87.3.28.63.52 1 .73.38.22.75.4 1.11.55a2.72 2.72 0 0 0 2.6-.32c.23-.17.4-.36.54-.58.15-.23.22-.5.22-.8 0-.51-.17-.98-.51-1.4a6.09 6.09 0 0 0-1.22-1.25c-.49-.4-1.02-.81-1.6-1.22-.57-.4-1.1-.83-1.6-1.28a7.51 7.51 0 0 1-1.21-1.5 3.47 3.47 0 0 1-.51-1.86c0-1.1.33-2.14.99-3.1a9.66 9.66 0 0 1 2.46-2.47c1-.7 2.1-1.26 3.27-1.66 1.17-.4 2.28-.61 3.32-.61.58 0 1.12.07 1.64.22.5.13.94.36 1.3.68a3 3 0 0 1 .9 1.15c.24.47.36 1.05.36 1.76 0 .3-.04.6-.1.9l-.13.95-4.64 1.35a4.6 4.6 0 0 0 .16-1.03c0-.64-.12-1.1-.35-1.37a1 1 0 0 0-.86-.45c-.18 0-.39.06-.64.2-.24.12-.48.3-.74.5-.24.2-.44.43-.6.7a1.96 1.96 0 0 0 .16 2.18c.29.35.65.67 1.08.96.43.3.88.61 1.38.93a5.62 5.62 0 0 1 2.46 3.04c.3.73.45 1.66.45 2.79Zm11.35 7.26a270.97 270.97 0 0 0-3.5.58l.27-2.08.16-1.8.16-1.53h-2.79l-1.28 4.6-1.66.23a118.86 118.86 0 0 0-3.81.45l2.53-8.39c.34-1.15.7-2.35 1.05-3.61.39-1.26.76-2.5 1.12-3.75l1.1-3.61.89-3.17c1.45-.1 2.92-.23 4.41-.38a59.6 59.6 0 0 0 4.42-.61l-.22 2.56a324.8 324.8 0 0 0-.39 7.04l-.2 3.84c-.1 2.94-.21 6.07-.34 9.37-.64.11-1.28.2-1.92.26Zm-4.93-8.03h.45c.23-.02.47-.03.7-.03.26-.03.5-.04.7-.04l.45-.06c0-.13.01-.34.04-.64l.1-1.06a93.16 93.16 0 0 0 .25-2.68c.08-1.1.19-2.27.32-3.52l.19-2.79-.48.03-.74 2.76-1.98 8.03Zm12.05 8.03c-.2 0-.56.03-1.12.1-.55.04-1.13.1-1.73.19a72.1 72.1 0 0 0-2.4.32c.26-.92.51-1.93.77-3.04a237.89 237.89 0 0 0 1.54-7.27l.73-3.64a505.8 505.8 0 0 0 1.57-8.42l5-.8a1185.61 1185.61 0 0 1-2.4 12.06 1223.29 1223.29 0 0 1-1.38 7.36l-.58 3.14Zm1.48.67c.58-2.84 1.13-5.6 1.66-8.32.2-1.15.4-2.34.64-3.58.24-1.26.45-2.5.64-3.71a172.71 172.71 0 0 0 1.03-6.7A31 31 0 0 1 101.26.6c.83 0 1.51.1 2.04.3.56.19.98.47 1.28.83.32.34.55.74.67 1.21.13.47.2 1 .2 1.57 0 .86-.15 1.7-.45 2.53a11.79 11.79 0 0 1-2.94 4.35 9.22 9.22 0 0 1-2.08 1.47c.38.86.78 1.8 1.21 2.82a132.51 132.51 0 0 1 2.56 6.08l-4.96 1.73c-.43-1.47-.8-2.86-1.15-4.16a165.7 165.7 0 0 1-.86-3.23c-.13-.52-.24-.96-.32-1.35a8.17 8.17 0 0 1-.16-.9l-.42.13-.48 2.5-.48 2.85c-.2 1.09-.38 2.2-.58 3.36l-5.18 1.34Zm7.52-13.89c.4-.04.9-.2 1.47-.5a10.15 10.15 0 0 0 3.07-2.37c.39-.45.58-.85.58-1.19a.68.68 0 0 0-.22-.54 1.3 1.3 0 0 0-.64-.32 3.46 3.46 0 0 0-.87-.16 14.9 14.9 0 0 0-1.73 0h-.64l-1.02 5.08Z" />
    </svg>
  )
}

export function GitHubIcon(props: SvgIconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <title>GitHub</title>
      <path d="M10 0c5.52 0 10 4.59 10 10.25 0 4.53-2.86 8.37-6.83 9.73-.51.1-.69-.22-.69-.5l.01-2.8c0-.96-.32-1.58-.68-1.9 2.23-.26 4.57-1.12 4.57-5.06a4 4 0 0 0-1.03-2.75c.1-.26.45-1.3-.1-2.72 0 0-.84-.27-2.75 1.05a9.4 9.4 0 0 0-5 0C5.59 3.98 4.75 4.25 4.75 4.25a3.78 3.78 0 0 0-.1 2.72 4.03 4.03 0 0 0-1.03 2.75c0 3.93 2.33 4.8 4.55 5.06-.28.26-.54.71-.63 1.38-.57.26-2.02.71-2.91-.86 0 0-.53-.98-1.53-1.05 0 0-.98-.02-.07.62 0 0 .65.32 1.1 1.5 0 0 .6 1.83 3.38 1.21l.01 1.9c0 .28-.18.6-.68.5A10.23 10.23 0 0 1 0 10.25C0 4.6 4.48 0 10 0" />
    </svg>
  )
}

export function LinkedInIcon(props: SvgIconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 256 256" {...props}>
      <title>LinkedIn</title>
      <path d="M218 218h-38v-59c0-14 0-33-20-33-19 0-22 16-22 32v60h-38V96h36v17h1a40 40 0 0 1 36-20c38 0 45 25 45 58v67ZM57 79a22 22 0 1 1 22-22 22 22 0 0 1-22 22m19 139H38V96h38v122ZM237 0H19C9 0 0 8 0 18v220c0 10 9 18 19 18h218c10 0 19-8 19-18V18c0-10-9-18-19-18" />
    </svg>
  )
}

export function XIcon(props: SvgIconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 1200 1227" {...props}>
      <title>X</title>
      <path
        fill="currentColor"
        d="M714 519 1161 0h-106L667 451 357 0H0l468 682L0 1226h106l409-476 328 476h357L714 519ZM569 688l-47-68L144 80h163l304 436 48 68 396 566H892L569 688Z"
      />
    </svg>
  )
}

export function StackOverflowIcon(props: SvgIconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 32 32" {...props}>
      <title>Stack Overflow</title>
      <path
        fill="currentColor"
        d="M25.3 29.2v-8.6h2.9V32H2.5V20.6h2.8v8.6zM8.1 26.3h14.4v-2.8H8zm.4-6.5 14 3L23 20 9 17zm1.8-6.7 13 6 1.1-2.6-12.9-6-1.2 2.6zM14 6.7 25 16l1.8-2.2-11-9.1-1.8 2zM21 0l-2.3 1.7 8.5 11.5 2.3-1.7z"
      />
    </svg>
  )
}

export function DiscordIcon(props: SvgIconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <title>Discord</title>
      <path
        fill="currentColor"
        d="M18.59 5.89a15.7 15.7 0 0 0-3.92-1.23c-.17.3-.37.71-.5 1.04a14.35 14.35 0 0 0-4.34 0c-.14-.33-.34-.74-.51-1.04A15.7 15.7 0 0 0 5.4 5.89a16.41 16.41 0 0 0-2.82 10.98 15.7 15.7 0 0 0 4.81 2.46c.39-.53.73-1.1 1.03-1.69a9.34 9.34 0 0 1-1.62-.79l.4-.31a11.09 11.09 0 0 0 9.61 0l.4.31c-.51.31-1.06.57-1.62.79.3.59.64 1.16 1.03 1.69a15.59 15.59 0 0 0 4.81-2.46c.39-4.17-.67-7.78-2.82-10.98h-.02Zm-9.75 8.78c-.94 0-1.71-.87-1.71-1.94 0-1.07.75-1.94 1.71-1.94s1.72.87 1.71 1.94c0 1.06-.75 1.94-1.71 1.94Zm6.31 0c-.94 0-1.71-.87-1.71-1.94 0-1.07.75-1.94 1.71-1.94s1.72.87 1.71 1.94c0 1.06-.75 1.94-1.71 1.94Z"
      />
    </svg>
  )
}

export function YouTubeIcon(props: SvgIconProps) {
  return (
    <svg viewBox="-271 311 256 180" {...props}>
      <title>YouTube</title>
      <path
        fill="currentColor"
        d="M-59 311h-168s-44 0-44 44v92s0 44 44 44h168s44 0 44-44v-92s0-44-44-44zm-118 139v-98l84 49-84 49z"
      />
    </svg>
  )
}

export function RedditIcon(props: SvgIconProps) {
  return (
    <svg viewBox="0 0 256 256" {...props}>
      <title>Reddit</title>
      <path
        fill="currentColor"
        d="M248 104a32 32 0 0 0-53-24c-17-9-37-14-58-16l6-31 21 3a24 24 0 1 0 3-15l-30-5a8 8 0 0 0-9 7l-7 41c-22 1-43 7-60 16a32 32 0 0 0-43 48 59 59 0 0 0-2 16c0 22 12 42 34 57 21 15 49 23 78 23s57-8 78-23c22-15 34-35 34-57a59 59 0 0 0-2-16 32 32 0 0 0 10-24ZM72 132a16 16 0 1 1 16 16 16 16 0 0 1-16-16Zm93 51a80 80 0 0 1-74 0 8 8 0 0 1 8-14 64 64 0 0 0 58 0 8 8 0 0 1 8 14Zm3-35a16 16 0 1 1 16-16 16 16 0 0 1-16 16Z"
      />
    </svg>
  )
}

export function TelegramIcon(props: SvgIconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <title>Telegram</title>
      <path
        fill="currentColor"
        d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm4 5.5-1.4 6.2c0 .4-.3.5-.7.3l-2-1.5-1 1a.5.5 0 0 1-.4.2l.1-2 3.7-3.4c.2-.1 0-.2-.2 0L9.6 13l-2-.6c-.5-.2-.5-.5 0-.7l7.8-3c.3 0 .7.1.5.7Z"
      />
    </svg>
  )
}

export function CssFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={cssFileTypeSrc} alt="CSS file type" {...props} />
}

export function DefaultFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase
      src={defaultFileTypeSrc}
      alt="Default file type"
      {...props}
    />
  )
}

export function HtmlFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={htmlFileTypeSrc} alt="HTML file type" {...props} />
}

export function ImageFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase src={imageFileTypeSrc} alt="Image file type" {...props} />
  )
}

export function JavaScriptFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase
      src={javascriptFileTypeSrc}
      alt="JavaScript file type"
      {...props}
    />
  )
}

export function JsonFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={jsonFileTypeSrc} alt="JSON file type" {...props} />
}

export function JsxFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={jsxFileTypeSrc} alt="JSX file type" {...props} />
}

export function MarkdownFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase
      src={markdownFileTypeSrc}
      alt="Markdown file type"
      {...props}
    />
  )
}

export function SassFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={sassFileTypeSrc} alt="Sass file type" {...props} />
}

export function ShellFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase src={shellFileTypeSrc} alt="Shell file type" {...props} />
  )
}

export function TsxFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={tsxFileTypeSrc} alt="TSX file type" {...props} />
}

export function TypeScriptFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase
      src={typescriptFileTypeSrc}
      alt="TypeScript file type"
      {...props}
    />
  )
}

export function YamlFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={yamlFileTypeSrc} alt="YAML file type" {...props} />
}
