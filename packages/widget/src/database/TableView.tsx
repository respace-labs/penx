import { PropsWithChildren, useCallback, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Box, css } from '@fower/react'
import {
  DataEditor,
  DataEditorRef,
  Rectangle,
} from '@glideapps/glide-data-grid'
import {
  ELEMENT_DATABASE_CONTAINER,
  SIDEBAR_WIDTH,
  TODO_DATABASE_NAME,
} from '@penx/constants'
import { DataSource } from '@penx/model-types'
import { AddColumnBtn } from './AddColumnBtn'
import { cellRenderers } from './cells'
import { useDatabaseContext } from './DatabaseContext'
import { DeleteColumnModal } from './DeleteColumnModal'
import { useCellMenu } from './hooks/useCellMenu'
import { useColumnMenu } from './hooks/useColumnMenu'
import { useTableView } from './hooks/useTableView'
import { useUndoRedo } from './use-undo-redo'

interface Props {
  height: number | string
}

export const TableView = ({ height }: Props) => {
  const { database, sortedColumns } = useDatabaseContext()
  const isTagDataSource = database.props.dataSource === DataSource.TAG
  const isTodo = database.props.name === TODO_DATABASE_NAME
  const canNewRow = !isTodo && !isTagDataSource

  const {
    rowsNum,
    cols,
    filterRows,
    getContent,
    setCellValue,
    onColumnResize,
    onColumnResizeEnd,
    onDeleteColumn,
    onRowAppended,
  } = useTableView()

  const gridRef = useRef<DataEditorRef>(null)
  const {
    gridSelection,
    onGridSelectionChange,
    onCellEdited,
    undo,
    canRedo,
    canUndo,
    redo,
  } = useUndoRedo(gridRef, getContent, setCellValue)

  const { setColumnMenu, columnMenuUI } = useColumnMenu(sortedColumns)
  const { setCellMenu, cellMenuUI } = useCellMenu()

  const onHeaderMenuClick = useCallback(
    (col: number, bounds: Rectangle) => {
      setColumnMenu({ col, bounds })
    },
    [setColumnMenu],
  )

  return (
    <Box borderTop-2>
      <DeleteColumnModal onDeleteColumn={onDeleteColumn} />

      <DataEditor
        ref={gridRef}
        // className={css('roundedXL shadowPopover')}
        columns={cols}
        rows={rowsNum}
        freezeColumns={1}
        theme={{
          bgHeader: 'white',
        }}
        smoothScrollX
        smoothScrollY
        height={height}
        width={isMobile ? '100vw' : `calc(100vw - ${SIDEBAR_WIDTH + 30}px)`}
        // width={`calc(100vw)`}
        rowMarkers="number"
        getCellsForSelection={true}
        onPaste
        rightElement={<AddColumnBtn />}
        customRenderers={cellRenderers}
        getCellContent={getContent}
        onCellEdited={onCellEdited}
        gridSelection={gridSelection ?? undefined}
        onGridSelectionChange={onGridSelectionChange}
        onColumnResize={onColumnResize}
        onColumnResizeEnd={onColumnResizeEnd}
        onHeaderMenuClick={onHeaderMenuClick}
        onCellContextMenu={
          canNewRow
            ? (cell, e) => {
                setCellMenu({ row: filterRows[cell[1]], bounds: e.bounds })
                e.preventDefault()
              }
            : undefined
        }
        onHeaderClicked={() => {
          // console.log('click')
        }}
        trailingRowOptions={
          canNewRow
            ? {
                // How to get the trailing row to look right
                sticky: true,
                tint: true,
                hint: 'New row...',
              }
            : {}
        }
        onRowAppended={canNewRow ? onRowAppended : undefined}
      />
      {canNewRow && cellMenuUI}
      {columnMenuUI}
    </Box>
  )
}
