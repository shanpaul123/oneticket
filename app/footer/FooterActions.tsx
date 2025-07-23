'use client'

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
  onEdit: (id: string) => void
  onClone: (id: string) => void
  onDeleteSelected: () => void
  onDeselectAll: () => void
}

const FooterActions: React.FC<FooterActionsProps> = ({
  selectedRows = [],
  onEdit,
  onClone,
  onDeleteSelected,
  onDeselectAll,
}) => {
  console.log('🚨 FooterActions rendered') // debug

  const handleEdit = React.useCallback(() => {
    selectedRows.forEach((id) => onEdit(id))
  }, [selectedRows, onEdit])

  const handleClone = React.useCallback(() => {
    selectedRows.forEach((id) => onClone(id))
  }, [selectedRows, onClone])

  return (
    <div className="flex justify-between items-center px-4 py-3 mt-4 border-t bg-white shadow-sm rounded">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700">
          {selectedRows.length} selected
        </span>

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
