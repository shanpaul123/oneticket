'use client';

import React, { useState } from 'react';
import TableRow from './TableRow';
import { InventoryItem } from '../types';

interface TableSectionProps {
  inventory: InventoryItem[];
  onUpdateInventory: (inventory: InventoryItem[]) => void;
  onEditItem: (item: InventoryItem) => void;
  isLoading: boolean;
  error: string | null;
}

const TableSection: React.FC<TableSectionProps> = ({
  inventory,
  onUpdateInventory,
  onEditItem,
  isLoading,
  error,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleToggleSelect = (id: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === inventory.length && inventory.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(inventory.map((item) => item.id));
    }
  };

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleDeleteSelected = async () => {
    if (confirm(`Are you sure you want to delete ${selectedRows.length} selected items?`)) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const updatedInventory = inventory.filter((item) => !selectedRows.includes(item.id));
      onUpdateInventory(updatedInventory);
      setSelectedRows([]);
    }
  };

  const handleEdit = (id: string) => {
    const itemToEdit = inventory.find((item) => item.id === id);
    if (itemToEdit) {
      onEditItem(itemToEdit); // 🔥 Lifts editing item to parent
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const updatedInventory = inventory.filter((item) => item.id !== id);
      onUpdateInventory(updatedInventory);
    }
  };

  const handleClone = async (itemToClone: InventoryItem) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const clonedItem: InventoryItem = {
      ...itemToClone,
      id: `item-${Date.now()}-cloned-${Math.random().toString(36).substring(2, 5)}`,
      uploadedTickets: false,
    };
    onUpdateInventory([...inventory, clonedItem]);
  };

  const handlePublishLive = () => {
    alert('Publishing selected items live! (Mock action)');
  };

  const handleCancel = () => {
    alert('Cancelling changes! (Mock action)');
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button onClick={handleSelectAll} className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Select All
          </button>
          <button onClick={handleDeselectAll} className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Deselect All
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0 || isLoading}
            className={`px-3 py-1 border border-gray-300 rounded-md text-sm font-medium ${
              selectedRows.length === 0 || isLoading
                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">
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
                'Face Value', 'Payout Price', 'Tickets in Hand', 'Date to Ship', 'Actions'
              ].map((label, idx) => (
                <th key={idx} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  isSelected={selectedRows.includes(item.id)}
                  onToggleSelect={handleToggleSelect}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onClone={handleClone}
                />
              ))
            ) : (
              <tr>
                <td colSpan={14} className="px-4 py-8 text-center text-gray-500">
                  No inventory items added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="flex justify-end mt-4 space-x-3">
        <button
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handlePublishLive}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Publish Live
        </button>
      </div>
    </div>
  );
};

export default TableSection;
