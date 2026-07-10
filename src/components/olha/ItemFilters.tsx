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
    <section className="grid grid-cols-1 gap-4 border border-base-300 bg-base-100 p-4 shadow-sm dark:border-warning/30 dark:bg-warning/20 md:grid-cols-2 lg:grid-cols-5">
      <label className="flex min-w-0 flex-col gap-1 lg:col-span-2">
        <span className="text-sm font-medium text-base-content/75">Suche</span>
        <input
          className="border border-base-300 bg-base-100 px-3 py-2 text-base-content dark:border-base-content/10 dark:bg-base-300"
          type="search"
          value={filters.search}
          placeholder="Nach Titel oder Gast suchen"
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateFilter('search', event.target.value)}
        />
      </label>

      <label className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-medium text-base-content/75">Kategorie</span>
        <select
          className="border border-base-300 bg-base-100 px-3 py-2 text-base-content dark:border-base-content/10 dark:bg-base-300"
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
        <span className="text-sm font-medium text-base-content/75">Status</span>
        <select
          className="border border-base-300 bg-base-100 px-3 py-2 text-base-content dark:border-base-content/10 dark:bg-base-300"
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
        <span className="text-sm font-medium text-base-content/75">Sortierung</span>
        <select
          className="border border-base-300 bg-base-100 px-3 py-2 text-base-content dark:border-base-content/10 dark:bg-base-300"
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
        className="w-full bg-base-200 px-4 py-2 text-sm font-semibold text-base-content transition-colors hover:bg-base-300 dark:bg-base-300 dark:hover:bg-base-content/15 md:col-span-2 lg:col-span-1"
        type="button"
        onClick={onReset}
      >
        Zurücksetzen
      </button>
    </section>
  );
}
