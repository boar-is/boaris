import { v } from 'convex/values'
import { interpolation } from '~/convex/values/interpolation'

const layoutMode = v.union(
  v.literal('static'),
  v.literal('scrolling'),
  v.literal('watching'),
  v.literal('sliding'),
)

const layoutLayer = v.object({
  /**
   * Values are track IDs or a null token (`.`)
   */
  areas: v.string(),
  columns: v.optional(v.string()),
  rows: v.optional(v.string()),
})

const trackBase = v.object({
  id: v.string(),
  name: v.string(),
})

export const revisionFields = {
  captions: v.optional(
    v.object({
      /**
       * @see JSONContent
       */
      value: v.any(),
      interpolation: v.optional(interpolation),
    }),
  ),
  layouts: v.optional(
    v.object({
      primary: v.object({
        /**
         * Empty or undefined array means every mode
         */
        modes: v.optional(v.array(layoutMode)),
        changes: v.optional(
          v.array(
            v.object({
              /**
               * id is needed for patching optimizations
               */
              id: v.string(),
              /**
               * a number from 0 to 1
               */
              at: v.number(),
              /**
               * null is for skip
               */
              value: v.optional(
                v.object({
                  static: v.optional(layoutLayer),
                  floating: v.optional(layoutLayer),
                }),
              ),
            }),
          ),
        ),
      }),
      overrides: v.optional(
        v.array(
          v.object({
            modes: v.optional(v.array(layoutMode)),
            minWidthPx: v.optional(v.number()),
            disabled: v.optional(v.boolean()),
            /**
             * @see Delta
             */
            changesDelta: v.any(),
          }),
        ),
      ),
    }),
  ),
  tracks: v.optional(
    v.array(
      v.union(
        v.object({
          ...trackBase.fields,
          type: v.literal('dynamic-image'),
          storageId: v.id('_storage'),
          caption: v.optional(v.string()),
        }),
        v.object({
          ...trackBase.fields,
          type: v.literal('static-image'),
          storageId: v.id('_storage'),
          caption: v.optional(v.string()),
          alt: v.optional(v.string()),
        }),
        /**
         * @example coding files like .ts, .tsx, .etc.
         * @example plain text files
         * @example unknown file formats that would open with CodeMirror
         */
        v.object({
          ...trackBase.fields,
          type: v.literal('text'),
          value: v.string(),
        }),
      ),
    ),
  ),
}
