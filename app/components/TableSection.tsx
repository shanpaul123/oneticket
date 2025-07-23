'use client'

import React, { useState } from 'react'
import { FaHandPaper, FaArrowsAltV } from 'react-icons/fa'
import TableRow from './TableRow'
import FooterActions from '../footer/FooterActions'
import { InventoryItem } from '../types'

interface TableSectionProps {
  inventory: InventoryItem[]
  onUpdateInventory: (inventory: InventoryItem[]) => void
  onEditItem: (item: InventoryItem) => void
  isLoading: boolean
  error: string | null
}

const TableSection: React.FC<TableSectionProps> = ({
  inventory,
  onUpdateInventory,
  onEditItem,
  isLoading,
  error,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const handleToggleSelect = (id: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedRows.length === inventory.length && inventory.length > 0) {
      setSelectedRows([])
    } else {
      setSelectedRows(inventory.map((item) => item.id))
    }
  }

  const handleDeselectAll = () => setSelectedRows([])

  const handleDeleteSelected = async () => {
    if (
      confirm(`Are you sure you want to delete ${selectedRows.length} selected items?`)
    ) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const updatedInventory = inventory.filter(
        (item) => !selectedRows.includes(item.id)
      )
      onUpdateInventory(updatedInventory)
      setSelectedRows([])
    }
  }

  const handleEdit = (id: string) => {
        console.log('Edit triggered with ID:', id)

    const itemToEdit = inventory.find((item) => item.id === id)
    if (itemToEdit) onEditItem(itemToEdit)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const updatedInventory = inventory.filter((item) => item.id !== id)
      onUpdateInventory(updatedInventory)
    }
  }

  const handleClone = async (itemToClone: InventoryItem) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const clonedItem: InventoryItem = {
      ...itemToClone,
      id: `item-${Date.now()}-cloned-${Math.random().toString(36).substring(2, 5)}`,
      uploadedTickets: false,
    }
    onUpdateInventory([...inventory, clonedItem])
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={handleSelectAll}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          >
            Select All
          </button>
          <button
            onClick={handleDeselectAll}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          >
            Deselect All
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0 || isLoading}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${
              selectedRows.length === 0 || isLoading
                ? 'text-gray-500 bg-gray-50 cursor-not-allowed'
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            Delete ({selectedRows.length})
          </button>
        </div>
      </div>

      {isLoading && <p className="text-center text-blue-600">Loading inventory...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {!isLoading && !error && (
        <table className="min-w-full border border-gray-200 text-[13px] font-[Inter] text-gray-700">
          <thead className="bg-[#F7F8FC] text-gray-500 text-xs font-medium uppercase">
            <tr>
              <th className="px-2 py-3 border border-gray-200 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={selectedRows.length === inventory.length && inventory.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              {[
                'Ticket Type', 'Quantity', 'Split Type', 'Max Display Quantity',
                'Category', 'Section/Block', 'Row', 'First Seat',
                'Face Value', 'Payout Price', 'Seating', 'Actions'
              ].map((label, idx) => (
                <th
                  key={idx}
                  className="px-2 py-3 border border-gray-200 text-left whitespace-nowrap"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white text-[13px] font-[Inter]">
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2 border border-gray-200">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleToggleSelect(item.id)}
                    />
                  </td>

                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.ticketType}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.quantity}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.splitType}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.maxDisplayQty}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.category}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.sectionBlock}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.row}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.firstSeat}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.faceValue}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.payoutPrice}</div></td>
                  <td className="px-2 py-2 border border-gray-200"><div className="border border-gray-300 rounded px-2 py-1">{item.seating}</div></td>

                  <td className="px-2 py-2 border border-gray-200 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <FaHandPaper className="text-gray-400 text-sm" />
                      <FaArrowsAltV className="text-gray-400 text-sm" />
                    </div>
                  </td>

                  {/* <td className="px-2 py-2 border border-gray-200">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:underline text-xs">Edit</button>
                      <button onClick={() => handleClone(item)} className="text-green-600 hover:underline text-xs">Clone</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-xs">Delete</button>
                    </div>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={15} className="px-4 py-8 text-center text-gray-500">
                  No inventory items added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

<FooterActions
  selectedRows={selectedRows}
  onEdit={handleEdit}
  onClone={(id) => {
    const item = inventory.find((item) => item.id === id)
    if (item) handleClone(item)
  }}
  onDeleteSelected={handleDeleteSelected}
  onDeselectAll={handleDeselectAll}
/>




    </div>
  )
}

export default TableSection
