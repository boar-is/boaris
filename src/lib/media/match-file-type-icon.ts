import { Match } from 'effect'
import {
  CssFileTypeIcon,
  DefaultFileTypeIcon,
  HtmlFileTypeIcon,
  ImageFileTypeIcon,
  JavaScriptFileTypeIcon,
  JsonFileTypeIcon,
  JsxFileTypeIcon,
  MarkdownFileTypeIcon,
  SassFileTypeIcon,
  ShellFileTypeIcon,
  TsxFileTypeIcon,
  TypeScriptFileTypeIcon,
  VideoFileTypeIcon,
  YamlFileTypeIcon,
} from './icons'

export const matchFileTypeIcon = Match.type<string>().pipe(
  Match.when(
    (it) => /\.(css)$/i.test(it),
    () => CssFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(html)$/i.test(it),
    () => HtmlFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(gif|jpeg|jpg|png|webp|svg)$/i.test(it),
    () => ImageFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(js|cjs|mjs)$/i.test(it),
    () => JavaScriptFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(json|jsonc|jsonl|.babelrc|.eslintrc|.prettierrc)$/i.test(it),
    () => JsonFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(jsx)$/i.test(it),
    () => JsxFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(markdown|md)$/i.test(it),
    () => MarkdownFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(sass|scss)$/i.test(it),
    () => SassFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(bash|sh|zsh)$/i.test(it),
    () => ShellFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(tsx)$/i.test(it),
    () => TsxFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(ts|cts|mts)$/i.test(it),
    () => TypeScriptFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(yaml|yml)$/i.test(it),
    () => YamlFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(mp4)$/i.test(it),
    () => VideoFileTypeIcon,
  ),
  Match.orElse(() => DefaultFileTypeIcon),
)
