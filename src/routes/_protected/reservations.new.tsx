/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ReservationForm } from "../../components/reservations/ReservationForm";
import { useBookings } from "../../hooks/useBookings";

export const Route = createFileRoute("/_protected/reservations/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { useCreate } = useBookings();
  const { mutateAsync: createBooking, isPending } = useCreate();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Neue Reservierung</h1>
      <ReservationForm
        isSubmitting={isPending}
        submitLabel="Reservierung erstellen"
        onSubmit={async (values) => {
          await createBooking(values);
          navigate({ to: "/reservations" });
        }}
      />
    </div>
  );
}
