import React from 'react'

const Header = () => {
    return <div className="flex justify-between items-center p-4">
<h1 className="text-[22px] md:text-[24px] font-semibold text-gray-900 mb-4">Add Inventory</h1>

  <div className="flex items-center gap-4">
    <button onClick={() => alert("Requesting event...")} className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition">
      Request Event
    </button>
    <button className="bg-[#00AEEF] w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-[#0095cc] transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.657 0-3.197-.402-4.465-1.093L3 20l1.279-3.836C3.464 15.104 3 13.593 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </button>
  </div>
</div>;
}

export default Header;
