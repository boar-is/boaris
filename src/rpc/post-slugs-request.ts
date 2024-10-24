import { Schema } from 'effect'

export class PostSlugsRequest extends Schema.TaggedRequest<PostSlugsRequest>()(
  'PostSlugsRequest',
  {
    failure: Schema.Never,
    success: Schema.Array(
      Schema.Struct({
        workspaceSlug: Schema.NonEmptyTrimmedString,
        projectSlug: Schema.NonEmptyTrimmedString,
        postSlug: Schema.NonEmptyTrimmedString,
      }),
    ),
    payload: {},
  },
) {}
