import { useForm } from "@tanstack/react-form";
import type { ReactNode } from "react";
import {
  getOpeningHoursForDate,
  reservationIntervalMinutes,
} from "../../config/openingHours";
import {
  defaultReservationValues,
  reservationCategories,
  reservationCategoryLabels,
  reservationSchema,
  reservationStatuses,
  reservationStatusLabels,
  type ReservationFormValues,
} from "../../schemas/reservationSchema";

type ReservationFormProps = {
  defaultValues?: ReservationFormValues;
  isSubmitting?: boolean;
  submitError?: string;
  submitLabel?: string;
  onSubmit: (values: ReservationFormValues) => Promise<void> | void;
};

export const ReservationForm = ({
  defaultValues = defaultReservationValues,
  isSubmitting = false,
  submitError,
  submitLabel = "Reservierung speichern",
  onSubmit,
}: ReservationFormProps) => {
  const form = useForm({
    defaultValues,
    validators: {
      onBlur: validateReservationForm,
      onSubmit: validateReservationForm,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(reservationSchema.parse(value));
    },
  });

  return (
    <form
      className="grid gap-4 rounded-2xl bg-base-100 p-6 shadow-md md:p-8 max-w-6xl mx-auto"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Field name="title">
        {(field) => (
          <FormField
            error={getVisibleErrorMessage(field.state.meta)}
            label="Titel"
          >
            <input
              className="input input-bordered w-full"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Abendessen am Fenster"
              value={field.state.value}
            />
          </FormField>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <FormField
            error={getVisibleErrorMessage(field.state.meta)}
            label="Beschreibung"
          >
            <textarea
              className="textarea textarea-bordered min-h-28 w-full"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Besondere Wünsche, Allergien oder Anlass"
              value={field.state.value}
            />
          </FormField>
        )}
      </form.Field>

      <div className="grid gap-4 md:grid-cols-2">
        <form.Field name="category">
          {(field) => (
            <FormField
              error={getVisibleErrorMessage(field.state.meta)}
              label="Kategorie"
            >
              <select
                className="select select-bordered w-full"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(
                    event.target.value as ReservationFormValues["category"],
                  )
                }
                value={field.state.value}
              >
                {reservationCategories.map((category) => (
                  <option key={category} value={category}>
                    {reservationCategoryLabels[category]}
                  </option>
                ))}
              </select>
            </FormField>
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <FormField
              error={getVisibleErrorMessage(field.state.meta)}
              label="Status"
            >
              <select
                className="select select-bordered w-full"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(
                    event.target.value as ReservationFormValues["status"],
                  )
                }
                value={field.state.value}
              >
                {reservationStatuses.map((status) => (
                  <option key={status} value={status}>
                    {reservationStatusLabels[status]}
                  </option>
                ))}
              </select>
            </FormField>
          )}
        </form.Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <form.Field name="bookingDate">
          {(field) => (
            <FormField
              error={getVisibleErrorMessage(field.state.meta)}
              label="Datum"
            >
              <input
                className="input input-bordered w-full"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                type="date"
                value={field.state.value}
              />
            </FormField>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.values.bookingDate}>
          {(bookingDate) => {
            const openingHours = getOpeningHoursForDate(bookingDate);

            return (
              <form.Field name="bookingTime">
                {(field) => (
                  <FormField
                    error={getVisibleErrorMessage(field.state.meta)}
                    label="Uhrzeit"
                  >
                    <input
                      className="input input-bordered w-full"
                      max={openingHours?.closesAt}
                      min={openingHours?.opensAt}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      step={reservationIntervalMinutes * 60}
                      type="time"
                      value={field.state.value}
                    />
                    {openingHours ? (
                      <span className="text-xs text-base-content/60">
                        Reservierungen am {openingHours.day}: {openingHours.opensAt}
                        {" – "}
                        {openingHours.closesAt} Uhr
                      </span>
                    ) : (
                      <span className="text-xs text-base-content/60">
                        Bitte zuerst ein Datum auswählen.
                      </span>
                    )}
                  </FormField>
                )}
              </form.Field>
            );
          }}
        </form.Subscribe>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <form.Field name="guestName">
          {(field) => (
            <FormField
              error={getVisibleErrorMessage(field.state.meta)}
              label="Name des Gastes"
            >
              <input
                className="input input-bordered w-full"
                inputMode="tel"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Max Mustermann"
                value={field.state.value}
              />
            </FormField>
          )}
        </form.Field>

        <form.Field name="guestPhone">
          {(field) => (
            <FormField
              error={getVisibleErrorMessage(field.state.meta)}
              label="Telefonnummer"
            >
              <input
                className="input input-bordered w-full"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="+49 170 1234567"
                type="tel"
                value={field.state.value}
              />
            </FormField>
          )}
        </form.Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <form.Field name="guestsCount">
          {(field) => (
            <FormField
              error={getVisibleErrorMessage(field.state.meta)}
              label="Anzahl der Gäste"
            >
              <input
                className="input input-bordered w-full"
                min={1}
                max={20}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(event.target.valueAsNumber)
                }
                type="number"
                value={field.state.value}
              />
            </FormField>
          )}
        </form.Field>

        <form.Field name="tableNumber">
          {(field) => (
            <FormField
              error={getVisibleErrorMessage(field.state.meta)}
              label="Tischnummer"
            >
              <input
                className="input input-bordered w-full"
                min={1}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(event.target.valueAsNumber)
                }
                type="number"
                value={field.state.value}
              />
            </FormField>
          )}
        </form.Field>
      </div>

      {submitError ? (
        <p className="rounded-md bg-error/10 px-3 py-2 text-sm text-error">
          {submitError}
        </p>
      ) : null}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      >
        {([canSubmit, isFormSubmitting]) => (
          <div className="flex justify-center">
            <button
              className="btn btn-primary w-full bg-primary/75 hover:bg-primary/90 md:w-fit"
              disabled={!canSubmit || isFormSubmitting || isSubmitting}
              type="submit"
            >
              {isFormSubmitting || isSubmitting
                ? "Wird gespeichert..."
                : submitLabel}
            </button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
};

type FormFieldProps = {
  children: ReactNode;
  error?: string;
  label: string;
};

const FormField = ({ children, error, label }: FormFieldProps) => (
  <label className="form-control grid gap-2">
    <span className="label-text font-medium">{label}</span>
    {children}
    {error ? (
      <span className="text-sm text-red-400 font-semibold">{error}</span>
    ) : null}
  </label>
);

type FieldErrorMeta = {
  errors: unknown[];
  errorMap?: {
    onSubmit?: unknown;
  };
  isBlurred: boolean;
};

const getVisibleErrorMessage = ({
  errors,
  errorMap,
  isBlurred,
}: FieldErrorMeta): string | undefined => {
  if (!isBlurred && !errorMap?.onSubmit) {
    return undefined;
  }

  return getErrorMessage(errors);
};

const getErrorMessage = (errors: unknown[]): string | undefined => {
  const [firstError] = errors.filter(Boolean);

  if (!firstError) {
    return undefined;
  }

  if (Array.isArray(firstError)) {
    return getErrorMessage(firstError);
  }

  if (typeof firstError === "string") {
    return firstError;
  }

  if (
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError
  ) {
    return String((firstError as { message: unknown }).message);
  }

  return "Ungültiger Wert";
};

const validateReservationForm = ({
  value,
}: {
  value: ReservationFormValues;
}) => {
  const result = reservationSchema.safeParse(value);

  if (result.success) {
    return undefined;
  }

  const fields: Partial<Record<keyof ReservationFormValues, string>> = {};

  for (const issue of result.error.issues) {
    const fieldName = issue.path[0];

    if (
      typeof fieldName === "string" &&
      fieldName in value &&
      !fields[fieldName as keyof ReservationFormValues]
    ) {
      fields[fieldName as keyof ReservationFormValues] = issue.message;
    }
  }

  return { fields };
};
