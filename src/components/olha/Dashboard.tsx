// src/components/olha/Dashboard.tsx
import { useMemo, useState } from 'react';
import { useBookings } from '../../hooks/useBookings';
import { useTheme } from './AppContext';
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
  const { theme, toggleTheme } = useTheme();
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

  if (isLoading) {
    return <div className="p-6 text-center font-medium">Dashboard-Daten werden geladen...</div>;
  }

  if (isError) {
    return <div className="p-6 text-center font-medium text-red-500">Fehler beim Laden der Daten.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
        <header className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:flex-row md:items-center">
          <div className="min-w-0">
            <p className="text-sm font-medium text-red-600 dark:text-red-300">Y.V.S.O Café</p>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 sm:text-3xl">YVSO Café Dashboard</h1>
          </div>
          <button
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 sm:w-fit"
            type="button"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Helles Theme' : 'Dunkles Theme'}
          </button>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 shadow-sm dark:border-blue-900 dark:bg-blue-950">
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-300">Gesamte Reservierungen</h3>
            <p className="mt-1 text-2xl font-bold">{total}</p>
          </div>

          <div className="rounded-xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-green-900 dark:bg-green-950">
            <h3 className="text-sm font-medium text-green-600 dark:text-green-300">Aktive Reservierungen</h3>
            <p className="mt-1 text-2xl font-bold">{statusCounts.active}</p>
          </div>

          <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4 shadow-sm dark:border-yellow-900 dark:bg-yellow-950">
            <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-300">Ø Gäste pro Tisch</h3>
            <p className="mt-1 text-2xl font-bold">{avgGuests}</p>
          </div>

          <div className="rounded-xl border border-purple-100 bg-purple-50 p-4 shadow-sm dark:border-purple-900 dark:bg-purple-950">
            <h3 className="text-sm font-medium text-purple-600 dark:text-purple-300">Erwarteter Umsatz</h3>
            <p className="mt-1 text-2xl font-bold">{currencyFormatter.format(revenue)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div
              key={status}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {statusLabels[status as keyof typeof statusLabels]}
              </h3>
              <p className="mt-1 text-2xl font-bold">{count}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-100">Neueste Reservierungen</h2>
          {recent.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">Keine Reservierungen vorhanden.</p>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {recent.map((booking) => (
                <li key={booking.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="break-words font-medium text-gray-900 dark:text-gray-100">{booking.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.guestsCount} Gäste • Tisch {booking.tableNumber} • {booking.category}
                    </p>
                  </div>
                  <span className="w-fit shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
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

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-100">Gefilterte Reservierungen</h2>
          {filteredBookings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredBookings.map((booking) => (
                <article key={booking.id} className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="min-w-0 break-words font-semibold text-gray-900 dark:text-gray-100">{booking.title}</h3>
                    <span className="w-fit shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                  <p className="mt-2 break-words text-sm text-gray-500 dark:text-gray-400">{booking.description}</p>
                  <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
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
