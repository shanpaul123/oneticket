// app/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import {
  FiArrowRight,
  FiGrid,
  FiPlusSquare,
  FiList,
  FiShoppingCart,
  FiBarChart2,
  FiStar,
  FiKey,
  FiUploadCloud,
  FiLogOut,
} from 'react-icons/fi';

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(2); // default active

  const menuItems = [
    { icon: <FiGrid />, label: 'Dashboard' },
    { icon: <FiPlusSquare />, label: 'Add Inventory' },
    { icon: <FiList />, label: 'List' },
    { icon: <FiShoppingCart />, label: 'Orders' },
    { icon: <FiBarChart2 />, label: 'Analytics' },
    { icon: <FiStar />, label: 'Ratings' },
    { icon: <FiKey />, label: 'Keys' },
    { icon: <FiUploadCloud />, label: 'Uploads' },
    { icon: <FiLogOut />, label: 'Logout' },
  ];

  return (
    <div className="h-screen w-16 bg-[#15006E] text-white flex flex-col items-center py-4 space-y-4">
      <div className="rounded-full bg-white p-2 text-xs text-[#00B8F1] font-bold w-12 h-12 flex items-center justify-center">
        <span>Ticket</span>
      </div>

      <FiArrowRight className="text-lg text-white" />

      <div className="bg-[#2C1A8C] w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold">
        MJ
      </div>

      {menuItems.map((item, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-md transition 
            ${
              i === activeIndex
                ? 'bg-[#00B8F1] text-white'
                : 'text-white hover:bg-[#1B0E50]'
            }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
