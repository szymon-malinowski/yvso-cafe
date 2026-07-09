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
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-base-content">
        Neue Reservierung
      </h1>
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
