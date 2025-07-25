'use client'

import React, { useState, useCallback } from 'react'
import { InventoryItem } from '../types'
import FooterActions from '../footer/FooterActions'
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  HandRaisedIcon as HandRaisedOutline,
  ArrowDownTrayIcon as ArrowDownOutline,
} from '@heroicons/react/24/outline'
import { HandRaisedIcon as HandRaisedSolid } from '@heroicons/react/24/solid'

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

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    )
  }, [])

  const handleSelectAll = useCallback(() => {
    setSelectedRows((prevSelected) =>
      prevSelected.length === inventory.length ? [] : inventory.map((item) => item.id)
    )
  }, [inventory])

  const handleDeselectAll = useCallback(() => setSelectedRows([]), [])

  const handleDeleteSelected = useCallback(async () => {
    if (confirm(`Delete ${selectedRows.length} selected items?`)) {
      await new Promise((res) => setTimeout(res, 300))
      onUpdateInventory(inventory.filter((item) => !selectedRows.includes(item.id)))
      setSelectedRows([])
    }
  }, [selectedRows, inventory, onUpdateInventory])

  const handleEdit = useCallback(
    (id: string) => {
      const item = inventory.find((i) => i.id === id)
      if (item) onEditItem(item)
    },
    [inventory, onEditItem]
  )

  const handleClone = useCallback(
    async (id: string) => {
      const item = inventory.find((i) => i.id === id)
      if (!item) return
      await new Promise((res) => setTimeout(res, 300))
      const clonedItem: InventoryItem = {
        ...item,
        id: `item-${Date.now()}-cloned-${Math.random().toString(36).substring(2, 5)}`,
        uploadedTickets: false,
      }
      onUpdateInventory([...inventory, clonedItem])
    },
    [inventory, onUpdateInventory]
  )

  return (
    <div className="w-full bg-gray-100 grow flex flex-col">
      <div className='px-5 py-4 grow'>
        <div className='bg-white rounded shadow-sm'>


          {/* Event Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#230B6F] text-white text-sm font-medium rounded-t-md px-4 py-3">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white" />
                </span>
                <span>Chelsea vs Arsenal - Premier League</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>Sun, 10 Nov 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>16:30</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>Stamford Bridge, London</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto mb-4">
            {!isLoading && !error && (
              <table className="min-w-[1200px] border border-gray-200 text-[13px] text-gray-700">
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
  { label: 'Ticket Type', width: 'w-[150px]' },
  { label: 'Quantity', width: 'w-[70px]' },
  { label: 'Split Type', width: 'w-[150px]' },
  { label: 'Max Display Quantity', width: 'w-[50]' },
  { label: 'Category', width: 'w-[100px]' },
  { label: 'Section/Block', width: 'w-[100px]' },
  { label: 'Row', width: 'w-[90px]' },
  { label: 'First Seat', width: 'w-[110px]' },
  { label: 'Face Value', width: 'w-[110px]' },
  { label: 'Payout Price', width: 'w-[120px]' },
  { label: 'Seating', width: 'w-[200px]' },
  { label: 'Actions', width: 'w-[100px]' },
].map((col, idx) => (
  <th
    key={idx}
    className={`px-2 py-3 border border-gray-200 text-left whitespace-nowrap normal-case ${col.width}`}
  >
    {col.label}
  </th>
))}


                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {inventory.length > 0 ? (
                    inventory.map((item) => (
                      <tr key={item.id} className={`${selectedRows.includes(item.id) ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
                        <td className="px-2 py-2 border border-gray-200 shadow-2xl">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => handleToggleSelect(item.id)}
                          />
                        </td>
                        {[
                          item.ticketType, item.quantity, item.splitType, item.maxDisplayQuantity,
                          item.category, item.sectionBlock, item.row, item.firstSeat,
                          item.faceValue, item.payoutPrice, item.seatingArrangement
                        ].map((val, i) => (
                          <td key={i} className="px-2 py-2 border border-gray-200">
                            <div className="border border-gray-300 rounded px-2 py-1">{val}</div>
                          </td>
                        ))}
                        <td className="px-2 py-2 text-gray-400 ">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-10 h-10 rounded-md border border-[#E5E5E5] bg-white shadow-sm">
                              {item.ticketsInHand ? (
                                <HandRaisedSolid className="h-5 w-5 text-[#20BD8E]" />
                              ) : (
                                <HandRaisedOutline className="h-5 w-5 text-[#384072]" />
                              )}
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 rounded-md border border-[#E5E5E5] bg-white shadow-sm">
                              <ArrowDownOutline className="h-5 w-5 text-[#384072]" />
                            </div>
                          </div>
                        </td>
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
            {isLoading && <p className="text-center text-blue-600">Loading inventory...</p>}
            {error && <p className="text-center text-red-600">Error: {error}</p>}
          </div>

        </div>
      </div>

      {/* Actions */}

      {/* Footer */}
      <FooterActions
        selectedRows={selectedRows}
        count={inventory.length}
        onEdit={handleEdit}
        onClone={handleClone}
        onDeleteSelected={handleDeleteSelected}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
      />
    </div>
  )
}

export default TableSection
