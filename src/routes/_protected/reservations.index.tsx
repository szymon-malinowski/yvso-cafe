/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useBookings } from "../../hooks/useBookings";

export const Route = createFileRoute("/_protected/reservations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { useGetAll } = useBookings();
  const { data, isLoading, isError } = useGetAll();

  if (isLoading) return <p>Lädt Reservierungen...</p>;
  if (isError) return <p>Etwas ist schiefgelaufen.</p>;
  if (!data || data.length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <p>Keine Reservierungen gefunden.</p>
        <Link to="/reservations/new" className="btn btn-primary mt-2 w-full sm:w-fit">
          Erste Reservierung erstellen
        </Link>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold">Reservierungen</h1>
        <Link to="/reservations/new" className="btn btn-primary w-full sm:w-fit">
          Neue Reservierung
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((booking) => (
          <Link
            key={booking.id}
            to="/reservations/$reservationId"
            params={{ reservationId: booking.id }}
            className="card min-w-0 bg-base-100 p-4 shadow transition hover:shadow-md"
          >
            <p className="break-words font-medium">{booking.title}</p>
            <p className="break-words text-sm text-gray-500">
              {booking.guestName} · Tisch {booking.tableNumber} ·{" "}
              {booking.guestsCount} Gäste
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
