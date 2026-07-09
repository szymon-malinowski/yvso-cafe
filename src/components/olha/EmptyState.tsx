// src/components/olha/EmptyState.tsx

export default function EmptyState() {
  return (
    <div className="rounded-xl border-2 border-dashed border-base-300 p-8 text-center">
      <p className="font-medium text-base-content/70">Keine Ergebnisse gefunden.</p>
      <p className="mt-1 text-sm text-base-content/50">Bitte ändern Sie die Filter oder erstellen Sie eine neue Reservierung.</p>
    </div>
  );
}
