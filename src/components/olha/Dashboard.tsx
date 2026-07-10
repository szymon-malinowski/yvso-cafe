// src/components/olha/Dashboard.tsx
import { useMemo, useState } from 'react';
import { useBookings } from '../../hooks/useBookings';
import EmptyState from './EmptyState';
import ItemFilters from './ItemFilters';
import {
  filterAndSortBookings,
  getAverageGuests,
  getCategories,
  getExpectedRevenue,
  getRecentReservations,
  getStatusCounts,
  getTotalReservations,
} from './dashboardHelpers';
import { statusLabels, type BookingFilters } from './types';
import { Spinner } from '../ui/Spinner';

const defaultFilters: BookingFilters = {
  search: '',
  category: 'all',
  status: 'all',
  sort: 'newest',
};

const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export default function Dashboard() {
  const { useGetAll } = useBookings();
  const { data: bookings = [], isLoading, isError } = useGetAll();
  const [filters, setFilters] = useState<BookingFilters>(defaultFilters);

  const categories = useMemo(() => getCategories(bookings), [bookings]);
  const filteredBookings = useMemo(() => filterAndSortBookings(bookings, filters), [bookings, filters]);
  const total = getTotalReservations(bookings);
  const statusCounts = getStatusCounts(bookings);
  const recent = getRecentReservations(bookings);
  const avgGuests = getAverageGuests(bookings);
  const revenue = getExpectedRevenue(bookings);

  if (isLoading) return <Spinner label="Lädt Reservierungen..." />;

  if (isError) {
    return <div className="p-6 text-center font-medium text-error">Fehler beim Laden der Daten.</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors">
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
        <header className="border border-base-300 bg-base-100 p-5 shadow-sm dark:border-base-content/10 dark:bg-base-300">
          <div className="min-w-0">
            <p className="text-sm font-medium text-primary">Y.V.S.O. Café</p>
            <h1 className="text-2xl font-bold text-base-content sm:text-3xl">Y.V.S.O. Café Dashboard</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="border border-primary/20 bg-primary/10 p-4 shadow-sm dark:border-primary/30 dark:bg-primary/20">
            <h3 className="text-sm font-semibold text-base-content/85">Gesamte Reservierungen</h3>
            <p className="mt-1 text-2xl font-bold text-base-content">{total}</p>
          </div>

          <div className="border border-success/20 bg-success/10 p-4 shadow-sm dark:border-success/30 dark:bg-success/20">
            <h3 className="text-sm font-semibold text-base-content/85">Aktive Reservierungen</h3>
            <p className="mt-1 text-2xl font-bold text-base-content">{statusCounts.active}</p>
          </div>

          <div className="border border-warning/20 bg-warning/10 p-4 shadow-sm dark:border-warning/30 dark:bg-warning/20">
            <h3 className="text-sm font-semibold text-base-content/85">Ø Gäste pro Tisch</h3>
            <p className="mt-1 text-2xl font-bold text-base-content">{avgGuests}</p>
          </div>

          <div className="border border-secondary/20 bg-secondary/10 p-4 shadow-sm dark:border-primary/20 dark:bg-primary/10">
            <h3 className="text-sm font-semibold text-base-content/85">Erwarteter Umsatz</h3>
            <p className="mt-1 text-2xl font-bold text-base-content">{currencyFormatter.format(revenue)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div
              key={status}
              className="border border-base-300 bg-base-100 p-4 shadow-sm dark:border-primary/20 dark:bg-primary/10 "
            >
              <h3 className="text-sm font-medium text-base-content/65">
                {statusLabels[status as keyof typeof statusLabels]}
              </h3>
              <p className="mt-1 text-2xl font-bold">{count}</p>
            </div>
          ))}
        </div>

        <div className="border border-base-300 bg-base-100 p-6 shadow-sm dark:border-primary/20 dark:bg-primary/10">
          <h2 className="mb-4 text-xl font-semibold leading-tight text-base-content">
            <span className="block sm:inline">Neueste</span>{' '}
            <span className="block sm:inline">Reservierungen</span>
          </h2>
          {recent.length === 0 ? (
            <p className="text-base-content/60">Keine Reservierungen vorhanden.</p>
          ) : (
            <ul className="divide-y divide-base-300">
              {recent.map((booking) => (
                <li key={booking.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="break-words font-medium text-base-content">{booking.title}</p>
                    <p className="text-sm text-base-content/60">
                      {booking.guestsCount} Gäste • Tisch {booking.tableNumber} • {booking.category}
                    </p>
                  </div>
                  <span className="w-fit shrink-0 bg-base-200 px-2 py-1 text-xs font-semibold text-base-content dark:bg-base-300">
                    {statusLabels[booking.status]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ItemFilters
          filters={filters}
          categories={categories}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />

        <div className="border border-base-300 bg-base-100 p-6 shadow-sm dark:border-primary/20 dark:bg-primary/10">
          <h2 className="mb-4 text-xl font-semibold leading-tight text-base-content">
            <span className="block sm:inline">Gefilterte</span>{' '}
            <span className="block sm:inline">Reservierungen</span>
          </h2>
          {filteredBookings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredBookings.map((booking) => (
                <article key={booking.id} className="border border-base-300 p-4 dark:border-base-content/10 dark:bg-base-300">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="min-w-0 break-words font-semibold text-base-content">{booking.title}</h3>
                    <span className="w-fit shrink-0 bg-base-200 px-2 py-1 text-xs font-semibold text-base-content dark:bg-base-300">
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                  <p className="mt-2 break-words text-sm text-base-content/60">{booking.description}</p>
                  <p className="mt-3 text-sm font-medium text-base-content/75">
                    {booking.guestName} • {booking.guestsCount} Gäste • Tisch {booking.tableNumber}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
