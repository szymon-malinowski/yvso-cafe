/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/about")({
  component: About,
});

const values = [
  {
    number: "01",
    title: "Kaffee mit Sorgfalt",
    description:
      "Unsere Karte ist bewusst übersichtlich und jede Tasse wird mit Sorgfalt zubereitet – vom ersten Espresso am Morgen bis zum letzten Kaffee am Nachmittag.",
  },
  {
    number: "02",
    title: "Zum Teilen gemacht",
    description:
      "Einfache, großzügige Gerichte und frisches Gebäck – zum Teilen am Tisch oder ganz für dich allein.",
  },
  {
    number: "03",
    title: "Platz für alle",
    description:
      "Ein gemütlicher Tisch, ein herzliches Willkommen und kein Grund zur Eile. Komm für fünf Minuten oder bleib den ganzen Nachmittag.",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function About() {
  return (
    <main className="overflow-hidden bg-base-100">
      <section className="relative isolate border-b border-base-300">
        <div
          aria-hidden="true"
          className="absolute -left-24 top-16 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16 lg:py-28">
          <div className="max-w-xl">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
              <span className="h-px w-10 bg-primary" />
              Unsere Geschichte
            </p>

            <h1 className="font-serif text-5xl leading-[0.98] font-semibold tracking-tight text-base-content sm:text-6xl lg:text-7xl">
              Kaffee schmeckt besser, wenn Zeit zum Bleiben ist.
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-base-content/70">
              Das Y.V.S.O. Café ist ein Treffpunkt für entspannte Morgen,
              lebhafte Gespräche und alles dazwischen. Guter Kaffee hat uns
              zusammengebracht, echte Gastfreundschaft lässt uns bleiben.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/reservations"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-content shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/85"
              >
                Tisch reservieren
                <ArrowIcon />
              </Link>

              <a
                href="#our-place"
                className="inline-flex items-center rounded-full px-4 py-3 text-sm font-bold text-base-content underline decoration-base-content/25 underline-offset-8 transition hover:decoration-primary"
              >
                Lerne uns kennen
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
            <div className="absolute -right-5 -top-5 hidden h-full w-full rounded-[2.25rem] border border-primary/25 sm:block" />
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-base-300 shadow-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src="/hero.png"
                alt="Der gemütlich beleuchtete Innenraum des Y.V.S.O. Cafés"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <figcaption className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-white sm:right-7 sm:bottom-7 sm:left-7">
                <p className="max-w-[15rem] font-serif text-2xl leading-tight sm:text-3xl">
                  Dein Platz wartet schon.
                </p>
              </figcaption>
            </figure>

            <div className="absolute -bottom-7 -left-4 max-w-[15rem] rounded-2xl border border-base-300 bg-base-100 p-5 shadow-xl sm:-left-8 sm:max-w-[17rem]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Typisch Y.V.S.O.
              </p>
              <p className="mt-2 font-serif text-xl leading-snug text-base-content">
                Für entspannte Morgen und Gespräche ohne Eile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="our-place"
        className="scroll-mt-24 bg-base-200 px-5 py-24 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
                Mehr als eine Tasse
              </p>
              <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight font-semibold text-base-content sm:text-5xl">
                Ein kleines Café mit großer Gastfreundschaft.
              </h2>
            </div>

            <div className="max-w-2xl space-y-5 text-lg leading-8 text-base-content/70">
              <p>
                Wir haben uns das Y.V.S.O. als den Ort vorgestellt, den wir uns
                selbst in unserer Nachbarschaft immer gewünscht haben: vertraut
                genug, um sich wie zu Hause anzufühlen, und besonders genug, um
                aus einem gewöhnlichen Tag etwas Schönes zu machen.
              </p>
              <p>
                Diese Idee prägt alles – vom Kaffee, den wir servieren, über die
                Musik, die bei uns läuft, bis zu der Art, wie wir dich an der
                Tür begrüßen. Unkompliziert und ohne Eile. Einfach ehrlicher
                Geschmack, gemütliche Ecken und Menschen, die sich freuen, dass
                du da bist.
              </p>
            </div>
          </div>

          <div className="mt-16 grid border-y border-base-300 md:grid-cols-3">
            {values.map((value, index) => (
              <article
                key={value.number}
                className={`py-9 md:px-8 md:py-12 ${
                  index > 0
                    ? "border-t border-base-300 md:border-t-0 md:border-l"
                    : ""
                }`}
              >
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-primary">
                  {value.number}
                </span>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-base-content">
                  {value.title}
                </h3>
                <p className="mt-3 leading-7 text-base-content/65">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral px-5 py-20 text-neutral-content sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <blockquote>
            <p className="mt-7 max-w-3xl font-serif text-3xl leading-snug sm:text-4xl lg:text-5xl">
              „Die besten Cafés servieren nicht nur Kaffee. Sie geben dem Tag
              einen Ort, an dem er stattfinden kann.“
            </p>
          </blockquote>

          <div className="border-l border-neutral-content/25 pl-7 sm:pl-9">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-content/60">
              Komm, wie du bist
            </p>
            <p className="mt-4 text-lg leading-8 text-neutral-content/75">
              Bring einen Freund, ein Buch, eine halbfertige Idee oder einfach
              nur dich selbst mit. Wir kümmern uns um den Kaffee.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-primary px-5 py-20 text-primary-content sm:px-8 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] [background-size:26px_26px]"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] opacity-70">
              Bis bald
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight font-semibold sm:text-5xl">
              An unserem Tisch ist immer noch ein Platz frei.
            </h2>
          </div>

          <Link
            to="/reservations"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-primary-content px-6 py-3.5 text-sm font-bold text-primary shadow-xl transition hover:-translate-y-0.5 hover:opacity-90"
          >
            Jetzt reservieren
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
