import { Booking } from "../types/booking";

const LOCAL_STORAGE_KEY = "restaurant_bookings";

export const initMockData = () => {
  if (localStorage.getItem(LOCAL_STORAGE_KEY)) return;

  const sampleBookings: Booking[] = [
    {
      id: "1",
      title: "Geburtstagsfeier",
      description: "Tisch in der Nähe des Fensters, Blumen-Deko erwünscht.",
      category: "VIP",
      status: "planned",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      guestName: "Max Mustermann",
      guestPhone: "+49 123 456789",
      guestsCount: 4,
      tableNumber: 5,
      bookingDate: "2026-07-15",
      bookingTime: "18:00",
    },
    {
      id: "2",
      title: "Geschäftsessen",
      description: "Ruhiger Tisch für wichtige Verhandlungen.",
      category: "Business",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      guestName: "Anna Schmidt",
      guestPhone: "+49 987 654321",
      guestsCount: 2,
      tableNumber: 12,
      bookingDate: "2026-07-11",
      bookingTime: "14:00",
    }
  ];

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleBookings));
};