/* eslint-disable react-refresh/only-export-components */
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useBookings } from "../../hooks/useBookings";
import {
  reservationCategoryLabels,
  reservationStatusLabels,
  type ReservationCategory,
  type ReservationStatus,
} from "../../schemas/reservationSchema";

export const Route = createFileRoute("/_protected/reservations/$reservationId")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const { reservationId } = Route.useParams();
  const navigate = useNavigate();
  const isEditRoute = useRouterState({
    select: (state) => state.location.pathname.endsWith("/edit"),
  });
  const { useGetOne, useDelete } = useBookings();

  const { data: booking, isLoading, isError } = useGetOne(reservationId);
  const deleteBooking = useDelete();

  if (isLoading) return <p className="p-4">Lädt Reservierung...</p>;
  if (isError || !booking)
    return (
      <div className="p-4">
        <p>Reservierung nicht gefunden.</p>
        <Link to="/reservations" className="btn btn-ghost mt-2">
          Zurück zur Übersicht
        </Link>
      </div>
    );

  if (isEditRoute) return <Outlet />;

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Möchtest du diese Reservierung wirklich löschen?",
    );
    if (!shouldDelete) return;

    await deleteBooking.mutateAsync(booking.id);
    navigate({ to: "/reservations" });
  };

  return (
    <main className="max-w-xl p-4 sm:p-6">
      <Link to="/reservations" className="btn btn-ghost btn-sm mb-4">
        ← Zurück zur Übersicht
      </Link>

      <h1 className="mb-2 break-words text-xl font-semibold">{booking.title}</h1>
      <p className="mb-4 break-words text-sm text-gray-500">{booking.description}</p>

      <div className="grid gap-2 mb-6">
        <p>
          <strong>Kategorie:</strong>{" "}
          {reservationCategoryLabels[booking.category as ReservationCategory]}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {reservationStatusLabels[booking.status as ReservationStatus]}
        </p>
        <p>
          <strong>Gast:</strong> {booking.guestName}
        </p>
        <p>
          <strong>Telefon:</strong> {booking.guestPhone}
        </p>
        <p>
          <strong>Anzahl der Gäste:</strong> {booking.guestsCount}
        </p>
        <p>
          <strong>Tischnummer:</strong> {booking.tableNumber}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          to="/reservations/$reservationId/edit"
          params={{ reservationId }}
          className="btn btn-primary w-full sm:w-fit"
        >
          Bearbeiten
        </Link>
        <button
          className="btn btn-error w-full sm:w-fit"
          disabled={deleteBooking.isPending}
          onClick={handleDelete}
        >
          {deleteBooking.isPending ? "Wird gelöscht..." : "Löschen"}
        </button>
      </div>
    </main>
  );
}
