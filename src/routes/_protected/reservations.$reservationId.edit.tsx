import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ReservationForm } from "../../components/reservations/ReservationForm";
import { useBookings } from "../../hooks/useBookings";
import type { ReservationFormValues } from "../../schemas/reservationSchema";

export const Route = createFileRoute(
  "/_protected/reservations/$reservationId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { reservationId } = Route.useParams();
  const navigate = useNavigate();
  const { useGetOne, useUpdate } = useBookings();

  const { data: booking, isLoading, isError } = useGetOne(reservationId);
  const updateBooking = useUpdate(reservationId);

  if (isLoading) return <p className="p-4">Lädt Reservierung...</p>;
  if (isError || !booking)
    return <p className="p-4">Reservierung nicht gefunden.</p>;

  const { id, createdAt, updatedAt, ...rest } = booking;
  const formValues: ReservationFormValues = {
    ...rest,
    category: rest.category as ReservationFormValues["category"],
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold mb-4 text-center">
        Reservierung bearbeiten
      </h1>

      <ReservationForm
        defaultValues={formValues}
        isSubmitting={updateBooking.isPending}
        submitError={updateBooking.error?.message}
        submitLabel="Änderungen speichern"
        onSubmit={async (values) => {
          await updateBooking.mutateAsync(values);
          navigate({
            to: "/reservations/$reservationId",
            params: { reservationId },
          });
        }}
      />
    </main>
  );
}
