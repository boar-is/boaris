import { Schema } from 'effect'
import { JsonContentFromJson } from '~/lib/pm/json-content'

export class Captions extends Schema.Class<Captions>('Captions')({
  postSlug: Schema.NonEmptyTrimmedString,
  content: JsonContentFromJson,
}) {}
