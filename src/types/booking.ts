export type BookingCategory = "dinner" | "meeting" | "birthday" | "other";
export type BookingStatus = "planned" | "active" | "completed";

export interface Booking {
  id: string;
  title: string;
  description: string;
  category: BookingCategory;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;

  guestName: string;
  guestPhone: string;
  guestsCount: number;
  tableNumber: number;
}
