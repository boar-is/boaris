import { Match } from 'effect'
import { TsxFileTypeIcon } from './icons/tsx-file-type'
import { TypeScriptFileTypeIcon } from './icons/typescript-file-type'

export const matchTagIcon = (tag: string) =>
  Match.value(tag.toLowerCase()).pipe(
    Match.when('typescript', () => TypeScriptFileTypeIcon),
    Match.when('react', () => TsxFileTypeIcon),
    Match.orElse(() => null),
  )
