'use client';

import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../type';

interface FormSectionProps {
  onAddListing: (item: InventoryItem) => void;
  editingItem?: InventoryItem | null;
  onEditDone?: () => void;
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
};

const FormSection: React.FC<FormSectionProps> = ({ onAddListing, editingItem, onEditDone }) => {
  const [formData, setFormData] = useState<InventoryItem>(defaultFormState);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
      setUploadedFile(null);
    } else {
      setFormData(defaultFormState);
      setUploadedFile(null);
    }
  }, [editingItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

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
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
    setFormData((prev) => ({
      ...prev,
      uploadedTickets: !!file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.ticketType || !formData.quantity || !formData.payoutPrice) {
      alert('Please fill all required fields marked with *.');
      return;
    }

    const itemToAdd: InventoryItem = {
      ...formData,
      id: editingItem ? editingItem.id : `item-${Date.now()}`,
    };

    onAddListing(itemToAdd);
    setFormData(defaultFormState);
    setUploadedFile(null);
    onEditDone?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Ticket Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ticket Type <span className="text-red-500">*</span>
          </label>
          <select
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            required
            className="form-select mt-1 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="E-ticket">E-ticket</option>
            <option value="Local Delivery">Local Delivery</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Split Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Split Type</label>
          <input
            type="text"
            name="splitType"
            value={formData.splitType || ''}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Seating Arrangement */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Seating Arrangement</label>
          <input
            type="text"
            name="seatingArrangement"
            value={formData.seatingArrangement || ''}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Max Display Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Display Quantity</label>
          <input
            type="number"
            name="maxDisplayQuantity"
            value={formData.maxDisplayQuantity}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Fan Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fan Area</label>
          <input
            type="text"
            name="fanArea"
            value={formData.fanArea || ''}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Section Block */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Section Block</label>
          <input
            type="text"
            name="sectionBlock"
            value={formData.sectionBlock || ''}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Row */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Row</label>
          <input
            type="text"
            name="row"
            value={formData.row || ''}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* First Seat */}
        <div>
          <label className="block text-sm font-medium text-gray-700">First Seat</label>
          <input
            type="number"
            name="firstSeat"
            value={formData.firstSeat}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Face Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Face Value</label>
          <input
            type="number"
            name="faceValue"
            value={formData.faceValue}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
            step="0.01"
          />
        </div>

        {/* Payout Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payout Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="payoutPrice"
            value={formData.payoutPrice}
            onChange={handleChange}
            required
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
            step="0.01"
          />
        </div>

        {/* Restrictions */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Restrictions</label>
          <input
            type="text"
            name="restrictions"
            value={formData.restrictions || ''}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Date to Ship */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date to Ship</label>
          <input
            type="date"
            name="dateToShip"
            value={formData.dateToShip ? new Date(formData.dateToShip).toISOString().split('T')[0] : ''}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                dateToShip: new Date(e.target.value),
              }));
            }}
            className="form-input mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Tickets in Hand */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="ticketsInHand"
            checked={formData.ticketsInHand}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Tickets in Hand</label>
        </div>

        {/* Upload Tickets */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Tickets</label>
          <input
            type="file"
            name="uploadedTickets"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="form-input mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md"
          />
          {uploadedFile && (
            <p className="text-xs text-gray-500 mt-1">Selected: {uploadedFile.name}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {editingItem ? 'Update Listing' : 'Add Listing'}
        </button>
      </div>
    </form>
  );
};

export default FormSection;
