import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "../services/bookingService";
import type { Booking } from "../types/booking";

const QUERY_KEY = ["bookings"];

export const useBookings = () => {
  const queryClient = useQueryClient();

  const useGetAll = () => {
    return useQuery({
      queryKey: QUERY_KEY,
      queryFn: () => bookingService.getBookings(),
    });
  };

  const useGetOne = (id: string) => {
    return useQuery({
      queryKey: ["booking", id],
      queryFn: () => bookingService.getBookingById(id),
      enabled: !!id,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: (data: Omit<Booking, "id" | "createdAt" | "updatedAt">) =>
        bookingService.createBooking(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
    });
  };

  const useUpdate = (id: string) => {
    return useMutation({
      mutationFn: (data: Partial<Booking>) =>
        bookingService.updateBooking(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        queryClient.invalidateQueries({ queryKey: ["booking", id] });
      },
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: (id: string) => bookingService.deleteBooking(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      },
    });
  };

  return {
    useGetAll,
    useGetOne,
    useCreate,
    useUpdate,
    useDelete,
  };
};