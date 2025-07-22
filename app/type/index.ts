// types/index.ts
export interface InventoryItem {
    id: string; // Unique ID for each item
    ticketType: string;
    quantity: number;
    splitType: string;
    seatingArrangement: string;
    maxDisplayQuantity: number;
    fanArea: string;
    category: string;
    sectionBlock: string;
    row: string;
    firstSeat: number;
    faceValue: number;
    payoutPrice: number;
    restrictions: string;
    dateToShip: Date | null;
    ticketsInHand: boolean;
    uploadedTickets: boolean; // Not directly used in the form state but useful for mock data
  }