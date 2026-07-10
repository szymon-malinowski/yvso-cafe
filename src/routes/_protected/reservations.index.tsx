/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useGetAllBookings } from "../../hooks/useBookings";
import { Spinner } from "../../components/ui/Spinner";
import { initMockData } from "../../services/mockData";

export const Route = createFileRoute("/_protected/reservations/")({
  beforeLoad: () => {
    initMockData();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isError } = useGetAllBookings();

  if (isLoading) return <Spinner label="Lädt Reservierungen..." />;
  if (isError)
    return <p className="p-4 text-center">Etwas ist schiefgelaufen.</p>;
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center flex gap-6 flex-col items-center">
        <p>Keine Reservierungen gefunden.</p>
        <Link
          to="/reservations/new"
          className="btn btn-primary mt-2 w-full sm:w-fit"
        >
          Erste Reservierung erstellen
        </Link>
      </div>
    );
  }

  return (
    <main className="p-4">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="break-words text-xl font-semibold">Reservierungen</h1>
        <Link
          to="/reservations/new"
          className="btn btn-primary w-full sm:w-fit"
        >
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
