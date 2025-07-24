'use client'

import React, { useState, useEffect } from 'react'
import { InventoryItem } from '../type'
import { HandRaisedIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // dollar icon
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from '@mui/material'

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
  const ticketTypes = [
    { value: '', label: 'Select' },
    { value: 'E-ticket', label: 'E-ticket' },
    { value: 'Local Delivery', label: 'Local Delivery' },
  ];
  const cat = [
    { value: '', label: 'Select' },
    { value: 'premium', label: 'Premium' },
    { value: 'luxury', label: 'Luxury' },
  ];
  const section = [
    { value: '', label: 'Select' },
    { value: 'Section 1', label: 'Section 1' },
    { value: 'Section 2', label: 'Section 2' },
  ];
  const restriction = [
    { value: '', label: 'Select' },
    { value: 'Restriction 1', label: 'Restriction 1' },
    { value: 'Restriction 2', label: 'Restriction 2' },
  ];
  return (
    <form
      onSubmit={handleSubmit}

    >
      <div className="bg-white px-5 py-5 border-b border-[#e5e7eb] shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Ticket Type */}
          
          <div>
         
<TextField
  select
  size="small"
  margin="dense"
  required
  fullWidth
  name="ticketType"
  id="outlined-ticketType"
  label="Ticket Type"
  value={formData.ticketType || 'E-ticket'}
  onChange={handleChange}
  sx={{
    "& .MuiInputBase-root": {
      fontSize: "0.75rem", // Match text size to Tailwind's `text-sm`
    },
    "& .MuiInputLabel-asterisk": {
      color: "red", // Make the asterisk red
    },
  }}
>
  {ticketTypes.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>
          
          </div>

<TextField
  required
  label="Quantity"
  name="quantity"
  type="number"
  value={formData.quantity}
  onChange={handleChange}
  fullWidth
  size="small"
  margin="dense"
  sx={{
    "& .MuiInputBase-root": {
      fontSize: "0.75rem",
    },
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
  }}
/>

<TextField
  label="Split Type"
  name="splitType"
  type="text"
  value={formData.splitType || " "}
  onChange={handleChange}
  fullWidth
  size="small"
  margin="dense"
  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem" } }}
/>

<TextField
  label="Seating Arrangement"
  name="seatingArrangement"
  type="text"
  value={formData.seatingArrangement || " "}
  onChange={handleChange}
  fullWidth
  size="small"
  margin="dense"
  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem" } }}
/>

<TextField
  label="Max Display Quantity"
  name="maxDisplayQuantity"
  type="number"
  value={formData.maxDisplayQuantity}
  onChange={handleChange}
  fullWidth
  size="small"
  margin="dense"
  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem" } }}
/>

<TextField
  label="Fan Area"
  name="fanArea"
  type="text"
  value={formData.fanArea || " "}
  onChange={handleChange}
  fullWidth
  size="small"
  margin="dense"
  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem" } }}
/>

<FormControl fullWidth size="small" margin="dense">
  <InputLabel
    id="category-label"
    sx={{ fontSize: "0.75rem" }}
  >
    Category
  </InputLabel>
  <Select
    labelId="category-label"
    id="category"
    name="category"
    value={formData.category || "premium"}
    onChange={handleChange}
    sx={{ fontSize: "0.75rem" }}
    label="Category"
  >
  {cat.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<FormControl fullWidth size="small" margin="dense">
  <InputLabel
    id="Section-label"
    sx={{ fontSize: "0.75rem" }}
  >
    Section Block
  </InputLabel>
  <Select
    labelId="Section-label"
    id="sectionBlock"
    name="sectionBlock"
    value={formData.sectionBlock || "Section 1"}
    onChange={handleChange}
    sx={{ fontSize: "0.75rem" }}
    label="sectionBlock"
  >
  {section.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
</FormControl>

{/* <TextField
  label="Section Block"
  name="sectionBlock"
  type="text"
  value={formData.sectionBlock || ""}
  onChange={handleChange}
  fullWidth
  size="small"
  margin="dense"
  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem" } }}
/> */}

<TextField
  label="Row"
  name="row"
  type="text"
  value={formData.row || " "}
  onChange={handleChange}
  fullWidth
  size="small"
  margin="dense"
  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem" } }}
/>

<TextField
  label="First Seat"
  name="firstSeat"
  type="number"
  value={formData.firstSeat}
  onChange={handleChange}
  fullWidth
  size="small"
  margin="dense"
  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem" } }}
/>
<TextField
  label="Face Value"
  name="faceValue"
  type="number"
  value={formData.faceValue}
  onChange={handleChange}
  step="0.01"
  fullWidth
  size="small"
  margin="dense"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AttachMoneyIcon sx={{ fontSize: '1rem', color: '#6b7280' }} />
      </InputAdornment>
    ),
  }}
  sx={{
    "& .MuiInputBase-root": { fontSize: "0.75rem" }
  }}
/>
<TextField
  required
  label="Payout Price"
  name="payoutPrice"
  type="number"
  value={formData.payoutPrice}
  onChange={handleChange}
  step="0.01"
  fullWidth
  size="small"
  margin="dense"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AttachMoneyIcon sx={{ fontSize: '1rem', color: '#6b7280' }} />
      </InputAdornment>
    ),
  }}
  sx={{
    "& .MuiInputBase-root": {
      fontSize: "0.75rem",
    },
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
  }}
/>

<FormControl fullWidth size="small" margin="dense">
  <InputLabel
    id="Restrictions"
    sx={{ fontSize: "0.75rem" }}
  >
   Restrictions
  </InputLabel>
  <Select
    labelId="Restrictions-label"
    id="Restrictions"
    name="restrictions"
    value={formData.restrictions || "Restriction 1"}
    onChange={handleChange}
    sx={{ fontSize: "0.75rem" }}
    label="sectionBlock"
  >
  {restriction.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
</FormControl>



<TextField
  label="Date to Ship"
  name="dateToShip"
  type="date"
  value={
    formData.dateToShip
      ? new Date(formData.dateToShip).toISOString().split("T")[0]
      : ""
  }
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      dateToShip: new Date(e.target.value),
    }))
  }
  fullWidth
  size="small"
  margin="dense"
  InputLabelProps={{ shrink: true }}
  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem" } }}
/>




          {/* Tickets in Hand */}
          <FormControl fullWidth size="small" margin="dense">
  <div className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium shadow-sm h-[36px]">
    <HandRaisedIcon className="h-4 w-4 text-[#384072] mr-2" />
    <span className="mr-auto">Tickets in Hand</span>
    <input
      type="checkbox"
      name="ticketsInHand"
      className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-0"
      checked={formData.ticketsInHand}
      onChange={handleChange}
    />
  </div>
</FormControl>



          {/* Upload Tickets */}
          <FormControl fullWidth size="small" margin="dense">
  <label htmlFor="upload-tickets">
    <input
      id="upload-tickets"
      name="uploadTickets"
      type="file"
      accept=".pdf,.jpg,.png"
      onChange={handleFileUpload}
      style={{ display: 'none' }}
    />

    <Button
      variant="outlined"
      component="span"
      startIcon={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CloudUploadIcon style={{ color: '#5C5C8A' }} />
          {/* Vertical Line */}
          <div
            style={{
              height: 20,
              width: 1,
              backgroundColor: '#E0E0E0',
              marginLeft: 8,
              marginRight: 8,
            }}
          />
        </div>
      }
      sx={{
        justifyContent: 'flex-start',
        fontSize: '0.75rem',
        textTransform: 'none',
        paddingY: 0.6,
        paddingX: 2,
        borderRadius: 1,
        width: '100%',
        color: '#5C5C8A',
        borderColor: '#E0E0E0',
        backgroundColor: '#FAFAFA',
        minHeight: '35px',
      }}
    >
      Upload Tickets
    </Button>
  </label>
</FormControl>

        </div>
      </div>
      {/* Submit */}
      <div className="px-5 py-3 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-1.5 rounded transition flex justify-between"
        >
          <PlusIcon className='h-5 w-5 pr-1 text-white' />
          {editingItem ? 'Update Listing' : 'Add Listing'}
        </button>
      </div>

    </form>
  )
}

export default FormSection
