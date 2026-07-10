/* eslint-disable react-refresh/only-export-components */
import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  useDeleteBooking,
  useGetOneBooking,
} from "../../hooks/useBookings";
import {
  reservationCategoryLabels,
  reservationStatusLabels,
  type ReservationCategory,
  type ReservationStatus,
} from "../../schemas/reservationSchema";
import { Spinner } from "../../components/ui/Spinner";

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
  const { data: booking, isLoading, isError } =
    useGetOneBooking(reservationId);
  const deleteBooking = useDeleteBooking();

  if (isLoading) return <Spinner label="Lädt Reservierung..." />;
  if (isError || !booking)
    return (
      <div className="p-4 text-center">
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
    <main className="p-4 max-w-xl bg-base-100 rounded-2xl shadow-md mx-auto mt-6 flex flex-col gap-4 items-center text-center">
      <h1 className="text-3xl font-semibold mb-2">{booking.title}</h1>
      <p className="text-sm text-base-content/60 mb-4">{booking.description}</p>

      <div className="grid gap-4 mb-6 text-left w-full max-w-sm">
        <p>
          <strong className="mr-2">Kategorie:</strong>{" "}
          {reservationCategoryLabels[booking.category as ReservationCategory]}
        </p>
        <p>
          <strong className="mr-2">Status:</strong>{" "}
          {reservationStatusLabels[booking.status as ReservationStatus]}
        </p>
        <p>
          <strong className="mr-2">Gast:</strong> {booking.guestName}
        </p>
        <p>
          <strong className="mr-2">Telefon:</strong> {booking.guestPhone}
        </p>
        <p>
          <strong className="mr-2">Anzahl der Gäste:</strong>{" "}
          {booking.guestsCount}
        </p>
        <p>
          <strong className="mr-2">Tischnummer:</strong> {booking.tableNumber}
        </p>
        <p>
          <strong className="mr-2">Datum:</strong> {booking.bookingDate}
        </p>
        <p>
          <strong className="mr-2">Uhrzeit:</strong> {booking.bookingTime}
        </p>
      </div>

      <div className="flex justify-between w-full px-20">
        <Link
          to="/reservations/$reservationId/edit"
          params={{ reservationId }}
          className="btn btn-primary w-full bg-primary/75 hover:bg-primary/90 sm:w-fit"
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
      <Link
        to="/reservations"
        className="btn btn-ghost btn-md mt-6 border border-base-content/20"
      >
        Zurück zur Übersicht
      </Link>
    </main>
  );
}
