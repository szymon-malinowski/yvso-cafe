import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "../services/bookingService";
import type { Booking } from "../types/booking";

const BOOKINGS_KEY = ["bookings"];

export const useGetAllBookings = () => {
  return useQuery({
    queryKey: BOOKINGS_KEY,
    queryFn: () => bookingService.getBookings(),
  });
};

export const useGetOneBooking = (id: string) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => bookingService.getBookingById(id),
    enabled: !!id,
  });
};

export const useFilteredBookings = (filters: { search: string; status: string; sortBy: string }) => {
  return useQuery({
    queryKey: BOOKINGS_KEY,
    queryFn: () => bookingService.getBookings(),
    select: (bookings) => {
      let result = [...bookings];

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(
          (b) =>
            b.guestName.toLowerCase().includes(searchLower) ||
            b.title.toLowerCase().includes(searchLower)
        );
      }

      if (filters.status && filters.status !== "all") {
        result = result.filter((b) => b.status === filters.status);
      }

      if (filters.sortBy === "newest") {
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (filters.sortBy === "oldest") {
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } else if (filters.sortBy === "guests") {
        result.sort((a, b) => b.guestsCount - a.guestsCount);
      }

      return result;
    },
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: BOOKINGS_KEY,
    queryFn: () => bookingService.getBookings(),
    select: (bookings) => {
      const total = bookings.length;
      const planned = bookings.filter((b) => b.status === "planned").length;
      const active = bookings.filter((b) => b.status === "active").length;
      const completed = bookings.filter((b) => b.status === "completed").length;
      const totalGuests = bookings.reduce((sum, b) => sum + b.guestsCount, 0);

      const latestBookings = [...bookings]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

      return {
        total,
        planned,
        active,
        completed,
        totalGuests,
        latestBookings,
      };
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Booking, "id" | "createdAt" | "updatedAt">) =>
      bookingService.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Booking> }) =>
      bookingService.updateBooking(id, data),
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY });
      queryClient.invalidateQueries({ queryKey: ["booking", updatedData.id] });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingService.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY });
    },
  });
};