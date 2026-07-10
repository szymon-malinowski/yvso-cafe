import { Link } from "@tanstack/react-router";
import { contactDetails } from "../../config/contactDetails";
import { openingHoursGroups } from "../../config/openingHours";

const owners = [
  "Yana Khariebova",
  "Vladislav Nedbalo",
  "Szymon Malinowski",
  "Olha Khodakivska",
];

const Footer = () => {
  return (
    <footer className="border-t border-base-content/15 bg-base-100 text-base-content">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-12 md:py-14">
        <div>
          <Link
            to="/"
            aria-label="Y.V.S.O. Café – zur Startseite"
            className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
          >
            <img
              src="/yvso_cafe_logo_final.svg"
              alt=""
              className="h-24 w-28 object-contain object-left"
            />
          </Link>
          <p className="mt-3 max-w-sm leading-7 text-base-content/70">
            Guter Kaffee, frische Lieblingsgerichte und Zeit für die schönen
            Dinge des Tages.
          </p>
        </div>

        <section aria-labelledby="footer-address">
          <h2
            id="footer-address"
            className="text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            Adresse
          </h2>
          <address className="mt-4 not-italic leading-7 text-base-content/75">
            Kaffeegasse 7
            <br />
            10115 Berlin
            <span className="mt-4 block">
              <a
                href={`tel:${contactDetails.phoneHref}`}
                className="block w-fit underline decoration-base-content/25 underline-offset-4 transition-colors hover:text-primary"
              >
                {contactDetails.phone}
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="block w-fit underline decoration-base-content/25 underline-offset-4 transition-colors hover:text-primary"
              >
                {contactDetails.email}
              </a>
            </span>
          </address>
        </section>

        <section aria-labelledby="footer-hours">
          <h2
            id="footer-hours"
            className="text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            Öffnungszeiten
          </h2>
          <dl className="mt-4 space-y-2 text-sm text-base-content/75">
            {openingHoursGroups.map(({ days, opensAt, closesAt }) => (
              <div
                key={days}
                className="flex items-baseline justify-between gap-5"
              >
                <dt>{days}</dt>
                <dd className="shrink-0 font-semibold text-base-content">
                  {opensAt} – {closesAt} Uhr
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className="border-t border-base-content/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 text-xs text-base-content/55 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} Y.V.S.O. Café
            <span className="mt-1 block">{owners.join(" · ")}</span>
          </p>

          <Link
            to="/impressum"
            className="w-fit font-semibold text-base-content underline decoration-base-content/30 underline-offset-4 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
