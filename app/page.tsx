// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from './components/Layout';
import FormSection from './components/FormSection';
import TableSection from './components/TableSection';
import { InventoryItem } from './type/index';
import FooterActions from './footer/FooterActions'
import Header from './components/Header';
import TopFilter from './components/TopFilter';

export default function AddInventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockData: InventoryItem[] = [
          {
            id: 'item-1700000000-abc',
            ticketType: 'E-ticket',
            quantity: 2,
            splitType: 'Split Evenly',
            seatingArrangement: 'Seated Together',
            maxDisplayQuantity: 2,
            fanArea: 'Home',
            category: 'Home Fans Section',
            sectionBlock: 'Longside Lower Tier Central',
            row: 'A',
            firstSeat: 10,
            faceValue: 120.0,
            payoutPrice: 110.0,
            restrictions: 'None',
            dateToShip: new Date('2024-10-25'),
            ticketsInHand: true,
            uploadedTickets: false,
          },
          {
            id: 'item-1700000001-def',
            ticketType: 'Local Delivery',
            quantity: 4,
            splitType: 'None',
            seatingArrangement: 'Not Seated Together',
            maxDisplayQuantity: 4,
            fanArea: 'Away',
            category: 'Away Fans Section',
            sectionBlock: 'Shortside Upper Tier',
            row: 'B',
            firstSeat: 1,
            faceValue: 80.0,
            payoutPrice: 70.0,
            restrictions: 'Age Restricted',
            dateToShip: new Date('2024-11-15'),
            ticketsInHand: false,
            uploadedTickets: true,
          },
        ];
        setInventory(mockData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch inventory.');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleAddListing = async (newItem: InventoryItem) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingItem) {
        // Update mode
        setInventory((prevInventory) =>
          prevInventory.map((item) =>
            item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item
          )
        );
        setEditingItem(null); // Clear edit mode
      } else {
        // Add new
        setInventory((prevInventory) => [...prevInventory, newItem]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to add/update listing.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInventory = async (updatedInventory: InventoryItem[]) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setInventory(updatedInventory);
    } catch (err: any) {
      setError(err.message || 'Failed to update inventory.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
  };

  return (
    <Layout>
      <Header />
      <TopFilter />
      <FormSection
        onAddListing={handleAddListing}
        editingItem={editingItem}
      />

      <TableSection
        inventory={inventory}
        onUpdateInventory={handleUpdateInventory}
        onEditItem={handleEditItem}
        isLoading={loading}
        error={error}
      />
            

    </Layout>
  );
}
