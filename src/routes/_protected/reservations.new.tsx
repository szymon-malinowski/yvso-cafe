/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ReservationForm } from "../../components/reservations/ReservationForm";
import { useCreateBooking } from "../../hooks/useBookings";

export const Route = createFileRoute("/_protected/reservations/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-base-content">
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
