import { Link } from "@tanstack/react-router";

const highlights = [
  { label: "Mit Sorgfalt", detail: "Jede Tasse" },
  { label: "Mit Liebe", detail: "Frisch serviert" },
  { label: "Mit Zeit", detail: "Für dich" },
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

const HeroComponent = () => {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-65px)] overflow-hidden bg-neutral text-white">
      <img
        src="/hero.png"
        alt="Gemütlicher Gastraum des Y.V.S.O. Cafés am Abend"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 -z-10 bg-black/35 dark:bg-black/45" />
      <div className="absolute inset-0 -z-10 hidden ] dark:block" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/2 bg-gradient-to-t from-black/70 to-transparent dark:block" />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-white/75">
          <span className="h-px w-10 bg-primary" />
          Y.V.S.O. Café · Willkommen
        </div>

        <div className="my-auto grid items-end gap-12 py-16 lg:grid-cols-[1fr_17rem] lg:gap-20 lg:py-20">
          <div className="max-w-4xl">
            <h1 className="font-serif text-5xl leading-[0.96] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Hier darf der Tag ein bisschen langsamer sein.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Ehrlich guter Kaffee, frische Lieblingsgerichte und ein Ort, an
              dem aus kurzen Pausen lange Gespräche werden.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/reservations"
                className="group inline-flex items-center gap-3 rounded-full bg-primary/75 px-6 py-3.5 text-sm font-bold text-primary-content shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Tisch reservieren
                <ArrowIcon />
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Unsere Geschichte
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <aside className="hidden border-l border-white/30 pl-7 lg:block">
            <p className="mt-5 font-serif text-2xl leading-snug">
              Guter Kaffee. Gutes Essen. Gute Gesellschaft.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Komm vorbei, mach es dir gemütlich und bleib, solange du möchtest.
            </p>
          </aside>
        </div>

        <div className="grid grid-cols-3 border-t border-white/25 pt-6 sm:max-w-2xl sm:gap-8 lg:max-w-3xl">
          {highlights.map((highlight) => (
            <div key={highlight.label}>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                {highlight.label}
              </p>
              <p className="mt-1 font-serif text-sm text-white sm:text-lg">
                {highlight.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
