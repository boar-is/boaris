'use client'

import ReactCodeMirror, {
  type BasicSetupOptions,
  type ReactCodeMirrorRef,
} from '@uiw/react-codemirror'
import { Match } from 'effect'
import { useAtomValue } from 'jotai'
import { AnimatePresence } from 'motion/react'
import { memo, useEffect, useMemo, useRef } from 'react'
import {
  type AssetImageDynamicWithState,
  type AssetImageStaticWithState,
  type AssetTextWithState,
  usePostPage,
} from '~/app/(site)/blog/[slug]/provider'
import { codemirrorTheme } from '~/lib/cm/codemirror-theme'
import { matchCodemirrorExtensions } from '~/lib/cm/match-codemirror-extensions'
import { matchFileTypeIcon } from '~/lib/media/match-file-type-icon'
import { motion } from '~/lib/motion/motion'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'

export function PostScrollingLayout({
  className,
}: {
  className?: string | undefined
}) {
  const { areasAtom, assetsAtom } = usePostPage()

  const gridTemplateAreas = useAtomValue(areasAtom)
  const assets = useAtomValue(assetsAtom)

  return (
    <ul
      className={cx('grid gap-2', { 'min-h-[40vh]': assets.length }, className)}
      style={{
        gridTemplateAreas,
        gridAutoColumns: 'minmax(0, 1fr)',
        gridAutoRows: 'minmax(0, 1fr)',
      }}
    >
      <AnimatePresence mode="popLayout">
        {assets.map((asset) => (
          <motion.li
            key={asset._id}
            className={cx(
              shadowInsetStyles,
              '~rounded-xl/2xl after:~rounded-xl/2xl bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md  overflow-hidden',
            )}
            style={{ gridArea: asset._id }}
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(16px)' }}
            layout
          >
            <motion.article
              layout="position"
              className="flex flex-col justify-between relative h-full"
            >
              {Match.value(asset).pipe(
                Match.when({ type: 'image-dynamic' }, (asset) => (
                  <AssetImageDynamicView asset={asset} />
                )),
                Match.when({ type: 'image-static' }, (asset) => (
                  <AssetImageStaticView asset={asset} />
                )),
                Match.when({ type: 'text' }, (asset) => (
                  <AssetTextView asset={asset} />
                )),
                Match.exhaustive,
              )}
            </motion.article>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

const AssetImageDynamicView = memo(function AssetImageDynamicView({
  asset,
}: { asset: AssetImageDynamicWithState }) {
  return <p>AssetImageDynamicView: {asset._id}</p>
})

const AssetImageStaticView = memo(function AssetImageStaticView({
  asset,
}: { asset: AssetImageStaticWithState }) {
  return <p>AssetImageStaticView: {asset._id}</p>
})

const basicCmSetup: BasicSetupOptions = {
  lineNumbers: false,
  foldGutter: false,
  highlightActiveLine: false,
}

const AssetTextView = memo(function AssetTextView({
  asset,
}: { asset: AssetTextWithState }) {
  const { assetTextEffect, getCurrentAssetTextValue } = usePostPage()

  const cmRef = useRef<ReactCodeMirrorRef | null>(null)

  useEffect(
    () =>
      assetTextEffect({
        asset,
        getView: () => cmRef.current?.view,
      }),
    [assetTextEffect, asset],
  )

  const extensions = useMemo(
    () => matchCodemirrorExtensions(asset.name),
    [asset.name],
  )

  return (
    <>
      <LayoutPanelHeader name={asset.name} />
      <ReactCodeMirror
        className="flex-1 h-full [&_.cm-editor]:h-full [&_.cm-scroller]:[scrollbar-width:thin] [&_.cm-scroller]:!~text-xs/sm [&_.cm-line]:px-4 [&_.cm-scroller]:overflow-hidden"
        value={getCurrentAssetTextValue(asset)}
        extensions={extensions}
        editable={false}
        theme={codemirrorTheme}
        basicSetup={basicCmSetup}
        ref={cmRef}
      />
    </>
  )
})

const panelEdgeClassName = cx(
  'bg-accent-1/30 text-gray-11 font-medium py-2 px-3.5 text-xs flex items-center gap-1.5 z-10 tracking-wide',
)

function LayoutPanelHeader({ name }: { name: string }) {
  const FileTypeIcon = matchFileTypeIcon(name)

  return (
    <header className={panelEdgeClassName}>
      <FileTypeIcon className="size-4 text-accent-11" />
      {name.split('/').pop()}
    </header>
  )
}
