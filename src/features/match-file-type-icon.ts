import * as M from 'effect/Match'
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
} from '~/lib/media/icons'

export const matchFileTypeIcon = M.type<string>().pipe(
  M.when(
    (it) => /\.(css)$/i.test(it),
    () => CssFileTypeIcon,
  ),
  M.when(
    (it) => /\.(html)$/i.test(it),
    () => HtmlFileTypeIcon,
  ),
  M.when(
    (it) => /\.(gif|jpeg|jpg|png|webp|svg)$/i.test(it),
    () => ImageFileTypeIcon,
  ),
  M.when(
    (it) => /\.(js|cjs|mjs)$/i.test(it),
    () => JavaScriptFileTypeIcon,
  ),
  M.when(
    (it) => /\.(json|jsonc|jsonl|.babelrc|.eslintrc|.prettierrc)$/i.test(it),
    () => JsonFileTypeIcon,
  ),
  M.when(
    (it) => /\.(jsx)$/i.test(it),
    () => JsxFileTypeIcon,
  ),
  M.when(
    (it) => /\.(markdown|md)$/i.test(it),
    () => MarkdownFileTypeIcon,
  ),
  M.when(
    (it) => /\.(sass|scss)$/i.test(it),
    () => SassFileTypeIcon,
  ),
  M.when(
    (it) => /\.(bash|sh|zsh)$/i.test(it),
    () => ShellFileTypeIcon,
  ),
  M.when(
    (it) => /\.(tsx)$/i.test(it),
    () => TsxFileTypeIcon,
  ),
  M.when(
    (it) => /\.(ts|cts|mts)$/i.test(it),
    () => TypeScriptFileTypeIcon,
  ),
  M.when(
    (it) => /\.(yaml|yml)$/i.test(it),
    () => YamlFileTypeIcon,
  ),
  M.when(
    (it) => /\.(mp4)$/i.test(it),
    () => VideoFileTypeIcon,
  ),
  M.orElse(() => DefaultFileTypeIcon),
)
