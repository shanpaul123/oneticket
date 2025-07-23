'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import {
  FiCheckSquare,
  FiXSquare,
  FiCopy,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi'

type FooterActionsProps = {
  selectedRows?: string[]
  count: number;
  onEdit: (id: string) => void
  onClone: (id: string) => void
  onDeleteSelected: () => void
  onSelectAll: () => void
  onDeselectAll: () => void
}

const FooterActions: React.FC<FooterActionsProps> = ({
  selectedRows = [],
  count = 0,
  onEdit,
  onClone,
  onDeleteSelected,
  onSelectAll,
  onDeselectAll,
}) => {
  console.log('🚨 FooterActions rendered') // debug

  const handleEdit = React.useCallback(() => {
    selectedRows.forEach((id) => onEdit(id))
  }, [selectedRows, onEdit])

  const handleClone = React.useCallback(() => {
    selectedRows.forEach((id) => onClone(id))
  }, [selectedRows, onClone])

  const isAllSelected = count === selectedRows.length;

  return (
    <div className="flex justify-between items-center px-5 py-3 mt-auto border-t bg-white shadow-sm rounded">
      <div className="flex flex-wrap gap-2 text-gray-700">
        <span className="text-sm font-medium text-gray-700 content-center pr-2">
          {selectedRows.length} selected
        </span>

        <div
          className="hover:bg-gray-10 flex items-center"
        >
          <input
            type="checkbox"
            id="select_all_btn"
            className="h-4 w-4 border-gray-300 rounded"
            checked={isAllSelected}
            onChange={isAllSelected ? onDeselectAll : onSelectAll}
          />
          <label htmlFor="select_all_btn" className='pl-1 '>Select all</label>


        </div>
        <button
          onClick={onDeselectAll}
          className="px-3 py-1 border border-gray-300 bg-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600 flex items-center"
        >
          <XMarkIcon className='w-4 h-4 border text-blue-600 mr-2' />
          Deselect All
        </button>

        <button
          onClick={handleEdit}
          className="flex items-center gap-1 text-sm px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100"
        >
          <FiEdit className="text-blue-600" />
          Edit
        </button>

        <button
          onClick={handleClone}
          className="flex items-center gap-1 text-sm px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100"
        >
          <FiCopy className="text-blue-600" />
          Clone
        </button>

        <button
          onClick={onDeleteSelected}
          className="flex items-center gap-1 text-sm px-3 py-1.5 border border-gray-300 text-red-600 rounded hover:bg-red-50"
        >
          <FiTrash2 className="text-red-600" />
          Delete
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onDeselectAll}
          className="px-4 py-1.5 text-sm border rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 text-sm text-white bg-green-600 rounded hover:bg-green-700">
          Publish Live
        </button>
      </div>
    </div>
  )
}

// ✅ Only re-renders if props actually change
export default React.memo(FooterActions)
