// components/TableRow.tsx
'use client'; // This is a client component

import React from 'react';
import { InventoryItem } from '../type/index'; // Adjust path if you put types elsewhere

interface TableRowProps {
  item: InventoryItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClone: (item: InventoryItem) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  onClone,
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap">
        <input
          type="checkbox"
          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
        />
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.ticketType}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.splitType}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.maxDisplayQuantity}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.sectionBlock}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.row}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.firstSeat}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">£{item.faceValue.toFixed(2)}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">£{item.payoutPrice.toFixed(2)}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
  {item.ticketsInHand ? '✋' : '❌'}
</td>

      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
        {item.dateToShip ? item.dateToShip.toLocaleDateString('en-GB') : 'N/A'}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
        <button onClick={() => onEdit(item.id)} className="text-blue-600 hover:text-blue-900 mr-2">
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900 mr-2">
          Delete
        </button>
        <button onClick={() => onClone(item)} className="text-gray-600 hover:text-gray-900">
          Clone
        </button>
      </td>
    </tr>
  );
};

export default TableRow;