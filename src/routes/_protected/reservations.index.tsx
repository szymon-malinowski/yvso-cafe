/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useBookings } from "../../hooks/useBookings";

export const Route = createFileRoute("/_protected/reservations/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { useGetAll } = useBookings();
  const { data, isLoading, isError } = useGetAll();

  if (isLoading)
    return <p className="p-4 text-center">Lädt Reservierungen...</p>;
  if (isError)
    return <p className="p-4 text-center">Etwas ist schiefgelaufen.</p>;
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center flex gap-6 flex-col items-center">
        <p>Keine Reservierungen gefunden.</p>
        <Link to="/reservations/new" className="btn btn-primary mt-2 w-full sm:w-fit">
          Erste Reservierung erstellen
        </Link>
      </div>
    );
  }

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-6">
        <h1 className="text-xl font-semibold">Reservierungen</h1>
        <Link to="/reservations/new" className="btn btn-primary w-full sm:w-fit">
          Neue Reservierung
        </Link>
      </div>

      <div className="grid gap-2 mx-auto max-w-6xl space-y-6 p-6">
        {data.map((booking) => (
          <Link
            key={booking.id}
            to="/reservations/$reservationId"
            params={{ reservationId: booking.id }}
            className="card min-w-0 bg-base-100 p-4 shadow transition hover:shadow-md"
          >
            <p className="font-medium">{booking.title}</p>
            <p className="text-md text-base-content/60">
              {booking.guestName} · Tisch {booking.tableNumber} ·{" "}
              {booking.guestsCount} Gäste · {booking.bookingDate}{" "}
              {booking.bookingTime}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
