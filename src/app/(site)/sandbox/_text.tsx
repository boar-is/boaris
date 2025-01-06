'use client'

import { deleteToLineStart, history } from '@codemirror/commands'
import ReactCodeMirror, {
  EditorSelection,
  EditorView,
  keymap,
  StateEffect,
  Text,
} from '@uiw/react-codemirror'
import { Option, Schema } from 'effect'
import { useEffect, useMemo, useRef, useState } from 'react'
import { codemirrorTheme } from '~/lib/cm/codemirror-theme'
import { matchCodemirrorExtensions } from '~/lib/cm/match-codemirror-extensions'
import { OffsetChange } from '~/lib/cm/offset-change'
import { reversedChanges } from '~/lib/cm/reversed-changes'
import { seekChanges } from '~/lib/cm/seek-changes'
import { findClosestIndex } from '~/lib/collections/find-closest-index'
import { mono } from '~/lib/media/fonts/mono'
import { cx } from '~/lib/react/cx'
import { assetRepository } from '~/model/asset'

const encodeChange = Schema.encodeSync(OffsetChange)
const decodeChange = Schema.decodeUnknownSync(OffsetChange)

type Recording = {
  name: string
  initialValue: Array<string>
  offsetChanges: Array<typeof OffsetChange.Encoded>
}

class RecordingManager {
  #recording: Recording | undefined
  #rafId: number | undefined
  #anchor: number | undefined
  #offset: number | undefined

  constructor(private view: EditorView) {
    this.view.dispatch({
      effects: StateEffect.appendConfig.of(
        EditorView.updateListener.of((update) => {
          if (
            !this.#offset ||
            !(update.docChanged || update.selectionSet) ||
            !this.#recording
          ) {
            return
          }

          this.#recording.offsetChanges.push(
            encodeChange([
              Math.floor(performance.now() - this.#offset),
              [
                update.changes,
                update.selectionSet ? update.state.selection : undefined,
              ],
            ]),
          )
        }),
      ),
    })
  }

  start(name: string) {
    this.#recording = {
      name,
      initialValue: this.view.state.doc.toJSON(),
      offsetChanges: [],
    }

    this.#offset = performance.now()
    this.view.focus()
  }

  stop() {
    this.#offset = undefined
    this.#persist()

    this.#rafId && cancelAnimationFrame(this.#rafId)
  }

  play(name: string) {
    this.stop()
    this.#anchor = undefined
    this.#recording = RecordingManager.loadRecording(name)

    if (!this.#recording || this.#offset) {
      alert('No recording found')
      return
    }

    const startTime = performance.now()

    const initialValue = Text.of(this.#recording.initialValue)
    const advances = this.#recording.offsetChanges.map((it) => decodeChange(it))
    const reverses = reversedChanges(initialValue, advances)

    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: Text.of(this.#recording.initialValue),
      },
      selection: EditorSelection.single(0),
    })

    const tick = () => {
      if (!this.#recording) {
        return
      }

      const head = findClosestIndex(
        this.#recording.offsetChanges,
        Math.floor(performance.now() - startTime),
        (it) => it[0],
      ).pipe(Option.getOrUndefined)

      if (head === undefined) {
        this.#rafId = requestAnimationFrame(tick)
        return
      }

      const spec = seekChanges({
        currentValue: this.view.state.doc,
        initialValue,
        advances,
        reverses,
        anchor: this.#anchor,
        head,
      })

      this.view.dispatch(spec)

      this.#anchor = head

      if (head === this.#recording.offsetChanges.length - 1) {
        return this.stop()
      }

      this.#rafId = requestAnimationFrame(tick)
    }

    this.#rafId = requestAnimationFrame(tick)
  }

  #persist() {
    if (!this.#recording) {
      return
    }

    const recordings = RecordingManager.loadRecordings()

    const index = recordings.findIndex(
      (it) => it.name === this.#recording?.name,
    )

    if (index === -1) {
      recordings.push(this.#recording)
    } else {
      recordings[index] = this.#recording
    }

    localStorage.setItem('recordings', JSON.stringify(recordings))
  }

  static loadRecording(name: string) {
    return RecordingManager.loadRecordings().find((it) => it.name === name)
  }

  static loadRecordings() {
    return JSON.parse(
      localStorage.getItem('recordings') || '[]',
    ) as Array<Recording>
  }
}

export function SandboxText() {
  const { name, content } = assetRepository?.find(
    (asset) => asset.name === 'app/blog/[slug]/page.tsx',
  )!

  if (content._tag !== 'AssetContentText') {
    throw new Error('Not a text')
  }

  const extensions = useMemo(
    () => [
      history({ minDepth: 500, newGroupDelay: 0 }),
      keymap.of([
        {
          key: 'Alt-Backspace',
          run: deleteToLineStart,
        },
      ]),
      ...matchCodemirrorExtensions(name),
    ],
    [name],
  )

  const [view, setView] = useState<EditorView>()

  const recordingNameRef = useRef('Untitled')
  const [manager, setManager] = useState<RecordingManager>()
  useEffect(() => {
    if (!view) {
      return
    }

    const manager = new RecordingManager(view)
    setManager(manager)
    return manager.stop
  }, [view])

  return (
    <div className={cx(mono.variable, 'container')}>
      <div>
        <input
          type="text"
          onChange={(e) => {
            recordingNameRef.current = e.target.value
          }}
        />
      </div>
      {manager && (
        <div>
          <div className="space-x-4">
            <button
              type="button"
              onClick={() => manager.start(recordingNameRef.current)}
            >
              Start
            </button>
            <button type="button" onClick={() => manager.stop()}>
              Stop
            </button>
            <button
              type="button"
              onClick={() => manager.play(recordingNameRef.current)}
            >
              Play
            </button>
          </div>
        </div>
      )}
      <ReactCodeMirror
        ref={(editor) => setView(editor?.view)}
        value={content.initialValue.toString()}
        theme={codemirrorTheme}
        extensions={extensions}
        className="bg-gray-1"
      />
    </div>
  )
}
