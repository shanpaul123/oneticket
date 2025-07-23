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
  FiMenu,
  FiX,
} from 'react-icons/fi';

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(2); // default active
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile

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
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden text-white bg-[#15006E] p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-[#15006E] text-white flex flex-col py-4 px-3 space-y-4 transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:w-16 md:px-0 md:items-center
        `}
      >
        {/* Top Logo */}
        <div className="rounded-full bg-white p-2 text-xs text-[#00B8F1] font-bold w-12 h-12 flex items-center justify-center mx-auto md:mx-0">
          <span>Ticket</span>
        </div>

        <FiArrowRight className="text-lg text-white hidden md:block" />

        {/* User Icon */}
        <div className="bg-[#2C1A8C] w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold mx-auto md:mx-0">
          MJ
        </div>

        {/* Menu Items */}
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              setSidebarOpen(false); // auto-close on mobile after click
            }}
            className={`flex items-center md:justify-center gap-2 w-full md:w-10 h-10 px-3 md:px-0 rounded-md transition 
              ${
                i === activeIndex
                  ? 'bg-[#00B8F1] text-white'
                  : 'text-white hover:bg-[#1B0E50]'
              }`}
          >
            {item.icon}
            <span className="md:hidden text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
