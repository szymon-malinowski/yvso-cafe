import type { Booking } from "../types/booking";

const LOCAL_STORAGE_KEY = "restaurant_bookings";
const MOCK_DATA_INITIALIZED_KEY = "restaurant_bookings_initialized";

export const initMockData = () => {
  if (localStorage.getItem(MOCK_DATA_INITIALIZED_KEY) === "true") {
    return;
  }

  const storedBookings = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (storedBookings) {
    try {
      const bookings = JSON.parse(storedBookings) as unknown;

      if (Array.isArray(bookings) && bookings.length > 0) {
        localStorage.setItem(MOCK_DATA_INITIALIZED_KEY, "true");
        return;
      }
    } catch {
      // Replace malformed stored data with valid sample reservations below.
    }
  }

  const sampleBookings: Booking[] = [
    {
      id: "1",
      title: "Geburtstagsfeier",
      description: "Tisch in der Nähe des Fensters, Blumen-Deko erwünscht.",
      category: "birthday",
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
      category: "meeting",
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
  localStorage.setItem(MOCK_DATA_INITIALIZED_KEY, "true");
};
