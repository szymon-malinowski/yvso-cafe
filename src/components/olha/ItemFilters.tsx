// src/components/olha/ItemFilters.tsx
import type { ChangeEvent } from 'react';
import type { BookingCategory } from '../../types/booking';
import type { BookingFilters, BookingSortOption } from './types';
import { categoryLabels, statusLabels } from './types';

type ItemFiltersProps = {
  filters: BookingFilters;
  categories: BookingCategory[];
  onChange: (filters: BookingFilters) => void;
  onReset: () => void;
};

const sortLabels: Record<BookingSortOption, string> = {
  newest: 'Neueste zuerst',
  oldest: 'Älteste zuerst',
  titleAsc: 'Titel A-Z',
  titleDesc: 'Titel Z-A',
  guestsAsc: 'Wenigste Gäste',
  guestsDesc: 'Meiste Gäste',
};

export default function ItemFilters({ filters, categories, onChange, onReset }: ItemFiltersProps) {
  function updateFilter<Key extends keyof BookingFilters>(key: Key, value: BookingFilters[Key]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <section className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2 lg:grid-cols-5">
      <label className="flex min-w-0 flex-col gap-1 lg:col-span-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Suche</span>
        <input
          className="rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          type="search"
          value={filters.search}
          placeholder="Nach Titel oder Gast suchen"
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateFilter('search', event.target.value)}
        />
      </label>

      <label className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategorie</span>
        <select
          className="rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          value={filters.category}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            updateFilter('category', event.target.value as BookingFilters['category'])
          }
        >
          <option value="all">Alle Kategorien</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {categoryLabels[category]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
        <select
          className="rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          value={filters.status}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            updateFilter('status', event.target.value as BookingFilters['status'])
          }
        >
          <option value="all">Alle Status</option>
          {Object.entries(statusLabels).map(([status, label]) => (
            <option key={status} value={status}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sortierung</span>
        <select
          className="rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          value={filters.sort}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            updateFilter('sort', event.target.value as BookingSortOption)
          }
        >
          {Object.entries(sortLabels).map(([sort, label]) => (
            <option key={sort} value={sort}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <button
        className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-100 md:col-span-2 lg:col-span-1"
        type="button"
        onClick={onReset}
      >
        Zurücksetzen
      </button>
    </section>
  );
}
