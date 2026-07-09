import type { Booking } from "../types/booking";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LOCAL_STORAGE_KEY = "restaurant_bookings";

const getLocalData = (): Booking[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalData = (data: Booking[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    await delay(500);
    return getLocalData();
  },

  getBookingById: async (id: string): Promise<Booking | undefined> => {
    await delay(300);
    const bookings = getLocalData();
    return bookings.find((b) => b.id === id);
  },

  createBooking: async (
    newBooking: Omit<Booking, "id" | "createdAt" | "updatedAt">,
  ): Promise<Booking> => {
    await delay(500);
    const bookings = getLocalData();

    const fullBooking: Booking = {
      ...newBooking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.push(fullBooking);
    saveLocalData(bookings);
    return fullBooking;
  },

  updateBooking: async (
    id: string,
    updatedFields: Partial<Booking>,
  ): Promise<Booking> => {
    await delay(500);
    const bookings = getLocalData();
    const index = bookings.findIndex((b) => b.id === id);

    if (index === -1) {
      throw new Error("Бронирование не найдено на сервере");
    }

    const updatedBooking: Booking = {
      ...bookings[index],
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };

    bookings[index] = updatedBooking;
    saveLocalData(bookings);
    return updatedBooking;
  },

  deleteBooking: async (id: string): Promise<boolean> => {
    await delay(400);
    const bookings = getLocalData();
    const filtered = bookings.filter((b) => b.id !== id);

    saveLocalData(filtered);
    return true;
  },
};