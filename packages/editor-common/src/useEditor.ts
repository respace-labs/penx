import { BaseEditor, Element } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor, useSlate, useSlateStatic } from 'slate-react'

export type TElement<T = string> = Element & { type: T }

export type PenxEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    elementMaps: any
    onKeyDownFns: any
    onBlurFns: any
    onClickBullet: any
    isBlockSelectorOpened: boolean
    nodeToDecorations: Map<any, Range[]>
  }

export function useEditor() {
  return useSlate() as PenxEditor
}

export function useEditorStatic() {
  return useSlateStatic() as PenxEditor
}