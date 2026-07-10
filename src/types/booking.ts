export interface Booking {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "planned" | "active" | "completed";
  createdAt: string;
  updatedAt: string;

  guestName: string;
  guestPhone: string;
  guestsCount: number;
  tableNumber: number;
  bookingDate: string;
  bookingTime: string;
}