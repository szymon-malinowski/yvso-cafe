import type { Booking } from "../types/booking";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LOCAL_STORAGE_KEY = "restaurant_bookings";

const isRestaurantOpen = (dateString: string, timeString: string): boolean => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  
  const [hours, minutes] = timeString.split(":").map(Number);
  const bookingMinutes = hours * 60 + minutes;

  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    return bookingMinutes >= 480 && bookingMinutes <= 1140;
  }
  
  if (dayOfWeek === 6) {
    return bookingMinutes >= 540 && bookingMinutes <= 1200;
  }
  
  if (dayOfWeek === 0) {
    return bookingMinutes >= 540 && bookingMinutes <= 1080;
  }

  return false;
};

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

  getBookingById: async (id: string): Promise<Booking> => {
    await delay(300);
    const bookings = getLocalData();
    const booking = bookings.find((b) => b.id === id);
    
    if (!booking) {
      throw new Error("Buchung nicht gefunden!");
    }
    return booking;
  },

  createBooking: async (
    newBooking: Omit<Booking, "id" | "createdAt" | "updatedAt">,
  ): Promise<Booking> => {
    await delay(500);

    if (!isRestaurantOpen(newBooking.bookingDate, newBooking.bookingTime)) {
      throw new Error(
        "Ausserhalb der Öffnungszeiten! (Mo-Fr 08-19, Sa 09-20, So 09-18)"
      );
    }

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
      throw new Error("Reservierung nicht gefunden");
    }

    const currentBooking = bookings[index];
    const finalDate = updatedFields.bookingDate || currentBooking.bookingDate;
    const finalTime = updatedFields.bookingTime || currentBooking.bookingTime;

    if (!isRestaurantOpen(finalDate, finalTime)) {
      throw new Error(
        "Ausserhalb der Öffnungszeiten! (Mo-Fr 08-19, Sa 09-20, So 09-18)"
      );
    }

    const updatedBooking: Booking = {
      ...currentBooking,
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