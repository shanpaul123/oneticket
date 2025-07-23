'use client'

import React, { useState, useEffect } from 'react'
import { InventoryItem } from '../type'
import { HandRaisedIcon } from '@heroicons/react/24/outline'

interface FormSectionProps {
  onAddListing: (item: InventoryItem) => void
  editingItem?: InventoryItem | null
  onEditDone?: () => void
}

const defaultFormState: InventoryItem = {
  id: '',
  ticketType: '',
  quantity: 0,
  splitType: '',
  seatingArrangement: '',
  maxDisplayQuantity: 1,
  fanArea: '',
  category: '',
  sectionBlock: '',
  row: '',
  firstSeat: 1,
  faceValue: 0,
  payoutPrice: 0,
  restrictions: '',
  dateToShip: new Date(),
  ticketsInHand: false,
  uploadedTickets: false,
}

const FormSection: React.FC<FormSectionProps> = ({ onAddListing, editingItem, onEditDone }) => {
  const [formData, setFormData] = useState<InventoryItem>(defaultFormState)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem)
      setUploadedFile(null)
    } else {
      setFormData(defaultFormState)
      setUploadedFile(null)
    }
  }, [editingItem])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    const { name, value, type } = target
    const val = type === 'checkbox' && 'checked' in target ? target.checked : value

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'quantity' ||
        name === 'maxDisplayQuantity' ||
        name === 'firstSeat'
          ? parseInt(val)
          : name === 'faceValue' || name === 'payoutPrice'
          ? parseFloat(val)
          : val,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setUploadedFile(file)
    setFormData((prev) => ({
      ...prev,
      uploadedTickets: !!file,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.ticketType || !formData.quantity || !formData.payoutPrice) {
      alert('Please fill all required fields marked with *.')
      return
    }

    const itemToAdd: InventoryItem = {
      ...formData,
      id: editingItem ? editingItem.id : `item-${Date.now()}`,
    }

    onAddListing(itemToAdd)
    setFormData(defaultFormState)
    setUploadedFile(null)
    onEditDone?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-6 py-5 rounded-xl border border-[#e5e7eb] shadow-sm mb-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Ticket Type */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block tracking-wide">
            Ticket Type <span className="text-red-500">*</span>
          </label>
          <select
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="E-ticket">E-ticket</option>
            <option value="Local Delivery">Local Delivery</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Split Type */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Split Type</label>
          <input
            type="text"
            name="splitType"
            value={formData.splitType || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Seating Arrangement */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Seating Arrangement</label>
          <input
            type="text"
            name="seatingArrangement"
            value={formData.seatingArrangement || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Max Display Quantity */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Max Display Quantity</label>
          <input
            type="number"
            name="maxDisplayQuantity"
            value={formData.maxDisplayQuantity}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Fan Area */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Fan Area</label>
          <input
            type="text"
            name="fanArea"
            value={formData.fanArea || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Section Block */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Section Block</label>
          <input
            type="text"
            name="sectionBlock"
            value={formData.sectionBlock || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Row */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Row</label>
          <input
            type="text"
            name="row"
            value={formData.row || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* First Seat */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">First Seat</label>
          <input
            type="number"
            name="firstSeat"
            value={formData.firstSeat}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Face Value */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Face Value</label>
          <input
            type="number"
            name="faceValue"
            value={formData.faceValue}
            onChange={handleChange}
            step="0.01"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Payout Price */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">
            Payout Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="payoutPrice"
            value={formData.payoutPrice}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Restrictions */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Restrictions</label>
          <input
            type="text"
            name="restrictions"
            value={formData.restrictions || ''}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Date to Ship */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Date to Ship</label>
          <input
            type="date"
            name="dateToShip"
            value={formData.dateToShip ? new Date(formData.dateToShip).toISOString().split('T')[0] : ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dateToShip: new Date(e.target.value),
              }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Tickets in Hand */}
        <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium shadow-sm">
          <HandRaisedIcon className="h-5 w-5 text-[#384072] mr-2" />
          <span className="mr-auto">Tickets in Hand</span>
          <input
            type="checkbox"
            name="ticketsInHand"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-0"
            checked={formData.ticketsInHand}
            onChange={handleChange}
          />
        </div>

        {/* Upload Tickets */}
        <div>
          <label className="text-sm font-light text-gray-500 mb-1 block">Upload Tickets</label>
          <label className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-[#A2A2A2] text-sm font-medium cursor-pointer shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-[#A2A2A2]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
              />
            </svg>
            Upload Tickets
            <input
              type="file"
              name="uploadedTickets"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-start">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-light px-5 py-2.5 rounded-md transition"
        >
          {editingItem ? 'Update Listing' : 'Add Listing'}
        </button>
      </div>
    </form>
  )
}

export default FormSection
