/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { contactDetails } from "../../config/contactDetails";

export const Route = createFileRoute("/_public/impressum")({
  component: Impressum,
});

const owners = [
  "Yana Khariebova",
  "Vladislav Nedbalo",
  "Szymon Malinowski",
  "Olha Khodakivska",
];

function Impressum() {
  return (
    <section className="bg-base-200 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
          Rechtliches
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-base-content sm:text-5xl">
          Impressum
        </h1>

        <div className="mt-10 space-y-8 rounded-2xl border border-base-content/10 bg-base-100 p-6 shadow-sm sm:p-8">
          <section aria-labelledby="operator-details">
            <h2
              id="operator-details"
              className="font-serif text-2xl font-semibold text-base-content"
            >
              Betreiberangaben
            </h2>
            <p className="mt-4 font-semibold text-base-content">
              Y.V.S.O. Café
            </p>
            <p className="mt-2 leading-7 text-base-content/70">
              {owners.join(", ")}
            </p>
            <address className="mt-4 not-italic leading-7 text-base-content/70">
              Kaffeegasse 7
              <br />
              10115 Berlin
              <br />
              Deutschland
            </address>
          </section>

          <section
            aria-labelledby="contact-details"
            className="border-t border-base-content/10 pt-8"
          >
            <h2
              id="contact-details"
              className="font-serif text-2xl font-semibold text-base-content"
            >
              Kontakt
            </h2>
            <address className="mt-4 not-italic leading-7 text-base-content/70">
              <span>Telefon: </span>
              <a
                href={`tel:${contactDetails.phoneHref}`}
                className="underline decoration-base-content/25 underline-offset-4 transition-colors hover:text-primary"
              >
                {contactDetails.phone}
              </a>
              <br />
              <span>E-Mail: </span>
              <a
                href={`mailto:${contactDetails.email}`}
                className="underline decoration-base-content/25 underline-offset-4 transition-colors hover:text-primary"
              >
                {contactDetails.email}
              </a>
            </address>
          </section>

          <section
            aria-labelledby="project-notice"
            className="border-t border-base-content/10 pt-8"
          >
            <h2
              id="project-notice"
              className="font-serif text-2xl font-semibold text-base-content"
            >
              Hinweis zum Projekt
            </h2>
            <p className="mt-4 leading-7 text-base-content/70">
              Diese Website ist ein nicht kommerzielles Lernprojekt. Die hier
              verwendeten Café- und Adressdaten dienen ausschließlich zu
              Demonstrationszwecken. Vor einer realen Veröffentlichung müssen
              vollständige und rechtlich geprüfte Unternehmens- und Kontaktdaten
              ergänzt werden.
            </p>
          </section>
          <section>
            <p className="mt-8 text-xs text-base-content/50">
              Getränkedaten bereitgestellt von{" "}
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
          </section>
        </div>
      </div>
    </section>
  );
}
