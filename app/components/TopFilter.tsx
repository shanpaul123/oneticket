import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";

const TopFilter = () => {

    return <div className="bg-white p-4 shadow-sm border border-gray-200">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-wrap">

    {/* Left Side */}
    <div className="flex flex-wrap items-center text-gray-700 text-sm font-medium gap-2 sm:gap-4">
      
      {/* Dropdown */}
      <div className="w-full sm:w-auto">
      <select
        className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        defaultValue="chelsea-vs-arsenal"
      >
        <option value="chelsea-vs-arsenal">Chelsea vs Arsenal - Premier League</option>
        <option value="manutd-vs-liverpool">Man Utd vs Liverpool - FA Cup</option>
        <option value="city-vs-chelsea">Man City vs Chelsea - Champions League</option>
      </select>
   </div>
      {/* Calendar */}
      <div className="flex items-center gap-1 text-gray-600">
        <CalendarIcon className="w-4 h-4 text-blue-500"/>
        <span>Sun, 10 Nov 2024</span>
      </div>

      {/* Separator */}
      <span className="text-gray-300">|</span>

      {/* Time */}
      <div className="flex items-center gap-1 text-gray-600">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>16:30</span>
      </div>

      {/* Separator */}
      <span className="text-gray-300">|</span>

      {/* Location */}
      <div className="flex items-center gap-1 text-gray-600">
        <MapPinIcon className="w-5 h-5 text-blue-500" />
        <span>Stamford Bridge, London, United Kingdom</span>
      </div>
    </div>

    {/* Right Side – View Map Link */}
    <a
      href="https://www.google.com/maps/search/?api=1&query=Stamford+Bridge,+London,+United+Kingdom"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-4 py-2 text-blue-500 rounded-md hover:bg-blue-50 text-sm transition font-bold"
    >
      <svg className="h-4 w-4 text-blue-500" fill="none">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-5.656 5.656l4.243 4.243a8 8 0 1011.314-11.314l-4.243 4.243z" />
      </svg>
      View Map
    </a>
  </div>
</div>
}

export default TopFilter;
