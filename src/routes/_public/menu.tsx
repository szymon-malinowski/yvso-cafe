/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "../../components/ui/Spinner";
import { cocktailService } from "../../services/cocktailService";

export const Route = createFileRoute("/_public/menu")({
  component: Menu,
});

const categoryLabels: Record<string, string> = {
  "Ordinary Drink": "Klassische Drinks",
  Cocktail: "Cocktails",
  Shake: "Shakes",
  "Other / Unknown": "Weitere Getränke",
  Cocoa: "Kakao",
  Shot: "Shots",
  "Coffee / Tea": "Kaffee & Tee",
  "Homemade Liqueur": "Hausgemachte Liköre",
  "Punch / Party Drink": "Bowle & Partygetränke",
  Beer: "Bier",
  "Soft Drink": "Alkoholfreie Getränke",
};

function Menu() {
  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["cocktail-categories"],
    queryFn: cocktailService.getCategories,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <section className="bg-base-200 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Unsere Auswahl
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-base-content sm:text-5xl">
            Getränkekarte
          </h1>
          <p className="mt-5 text-lg leading-8 text-base-content/70">
            Entdecke unsere Getränkekategorien – von klassischen Cocktails und
            Kaffee bis zu alkoholfreien Erfrischungen.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 rounded-2xl border border-base-content/10 bg-base-100">
            <Spinner label="Getränkekategorien werden geladen..." />
          </div>
        ) : error ? (
          <div
            className="mt-10 rounded-2xl border border-error/25 bg-error/10 p-6"
            role="alert"
          >
            <h2 className="font-semibold text-base-content">
              Kategorien konnten nicht geladen werden
            </h2>
            <p className="mt-2 text-sm text-base-content/70">
              {error instanceof Error
                ? error.message
                : "Bitte versuche es erneut."}
            </p>
            <button
              type="button"
              className="btn btn-primary mt-5 bg-primary/75 hover:bg-primary/90"
              disabled={isFetching}
              onClick={() => void refetch()}
            >
              {isFetching ? "Wird geladen..." : "Erneut versuchen"}
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((category, index) => (
              <article
                key={category}
                className="group rounded-2xl border border-base-content/10 bg-base-100 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="font-mono text-xs font-bold tracking-[0.18em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-serif text-2xl font-semibold text-base-content">
                  {categoryLabels[category] ?? category}
                </h2>
                <p className="mt-2 text-sm text-base-content/55">{category}</p>
              </article>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs text-base-content/50">
          Kategorien bereitgestellt von{" "}
          <a
            href="https://www.thecocktaildb.com/api.php"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            TheCocktailDB
          </a>
          .
        </p>
      </div>
    </section>
  );
}
