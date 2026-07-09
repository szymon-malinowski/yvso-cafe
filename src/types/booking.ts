import type {
  ReservationCategory,
  ReservationStatus,
} from "../schemas/reservationSchema";

export type BookingCategory = ReservationCategory;
export type BookingStatus = ReservationStatus;

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
  reservationDate: string;
  reservationTime: string;
}
