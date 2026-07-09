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
      <div className="p-4">
        <p>Keine Reservierungen gefunden.</p>
        <Link to="/reservations/new" className="btn btn-primary mt-2">
          Erste Reservierung erstellen
        </Link>
      </div>
    );
  }

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Reservierungen</h1>
        <Link to="/reservations/new" className="btn btn-primary">
          Neue Reservierung
        </Link>
      </div>

      <div className="grid gap-4">
        {data.map((booking) => (
          <Link
            key={booking.id}
            to="/reservations/$reservationId"
            params={{ reservationId: booking.id }}
            className="card bg-base-100 shadow p-4 hover:shadow-md transition"
          >
            <p className="font-medium">{booking.title}</p>
            <p className="text-sm text-gray-500">
              {booking.guestName} · Tisch {booking.tableNumber} ·{" "}
              {booking.guestsCount} Gäste
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
