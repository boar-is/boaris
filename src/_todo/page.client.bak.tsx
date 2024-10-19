'use client'

import { Match } from 'effect'
import { AnimatePresence, m } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { Image } from '~/lib/media/image'

function LayoutMainGrid({
  tracks,
  grid: { areas, columns, rows },
  storageMap,
}: {
  tracks: Array<Track>
  grid: LayoutGrid
  storageMap: Record<StorageDoc['_id'], StorageDoc['src']>
}) {
  const areasSet = new Set(areas.flat())
  const filteredTracks = tracks.filter((it) => areasSet.has(it._id))
  const gridTemplateAreas = areas.map((row) => `'${row.join(' ')}'`).join(' ')
  const gridTemplateColumns = (
    columns ?? ensureDefined(areas[0]).map(() => 'minmax(0, 1fr)')
  ).join(' ')
  const gridTemplateRows = (
    rows ?? ensureDefined(areas).map(() => 'minmax(0, 1fr)')
  ).join(' ')

  return (
    <ul
      className="sticky bottom-8 grid h-[60vh] gap-2 *:*:h-full"
      style={{
        gridTemplateAreas,
        gridTemplateColumns,
        gridTemplateRows,
      }}
    >
      <AnimatePresence mode="popLayout">
        {filteredTracks.map((it) => (
          <m.li
            key={it._id}
            style={{ gridArea: it._id }}
            initial={{ opacity: 0, filter: 'blur(15px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(15px)' }}
          >
            <LayoutMainGridPanel name={it.name}>
              {Match.type<Track>().pipe(
                Match.tag('ImageTrack', (track) => {
                  const src = ensureDefined(storageMap[track.value.storageId])

                  return (
                    <>
                      <section className="overflow-hidden flex-1 relative">
                        <Image
                          src={src}
                          className="object-cover blur-md"
                          alt="Image's backdrop"
                          fill
                        />
                        <Image
                          src={src}
                          className="object-contain"
                          alt={
                            track.value.alt ??
                            track.value.caption ??
                            'The author did not provide any alt to this image'
                          }
                          fill
                        />
                      </section>
                      {track.value.caption && (
                        <footer className="bg-gray-1 rounded-b-xl py-2 px-3.5 text-sm text-gray-10 text-center text-pretty">
                          {track.value.caption}
                        </footer>
                      )}
                    </>
                  )
                }),
                Match.tag('VideoTrack', (track) => (
                  <>
                    <section className="flex-1 relative overflow-hidden">
                      <video
                        className="absolute inset-0 size-full -z-[2] object-cover blur-md"
                        src={ensureDefined(storageMap[track.value.storageId])}
                        autoPlay
                        playsInline
                        muted
                        loop
                      />
                      <video
                        className="max-h-full mx-auto"
                        src={ensureDefined(storageMap[track.value.storageId])}
                        autoPlay
                        playsInline
                        muted
                        loop
                      />
                    </section>
                    {track.value.caption && (
                      <footer className="bg-gray-1 rounded-b-xl py-2 px-3.5 text-sm text-gray-10 text-center text-pretty">
                        {track.value.caption}
                      </footer>
                    )}
                  </>
                )),
                Match.tag('TextTrack', (track) => (
                  <div>track: {track._id}</div>
                )),
                Match.exhaustive,
              )(it)}
            </LayoutMainGridPanel>
          </m.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

function LayoutMainGridPanel({
  name,
  children,
}: PropsWithChildren & { name: string }) {
  const FileTypeIcon = matchFileTypeIcon(name)

  return (
    <article className="bg-gray-2/75 backdrop-blur-sm backdrop-saturate-150 border border-gray-4 rounded-xl flex flex-col">
      <header className="bg-gray-1 rounded-t-xl py-2 px-3.5 text-sm text-gray-11 flex items-center gap-1">
        <FileTypeIcon className="size-4 text-gray-9" />
        {name.split('/').pop()}
      </header>
      {children}
    </article>
  )
}
