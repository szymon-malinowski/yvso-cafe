import { z } from "zod";
import {
  getOpeningHoursForDate,
  isValidReservationInterval,
  isWithinOpeningHours,
} from "../config/openingHours";

export const reservationCategories = [
  "dinner",
  "meeting",
  "birthday",
  "other",
] as const;

export const reservationStatuses = ["planned", "active", "completed"] as const;

export type ReservationCategory = (typeof reservationCategories)[number];
export type ReservationStatus = (typeof reservationStatuses)[number];

export const reservationCategoryLabels: Record<ReservationCategory, string> = {
  dinner: "Abendessen",
  meeting: "Besprechung",
  birthday: "Geburtstag",
  other: "Sonstiges",
};

export const reservationStatusLabels: Record<ReservationStatus, string> = {
  planned: "Geplant",
  active: "Aktiv",
  completed: "Abgeschlossen",
};

export const reservationSchema = z
  .object({
    title: z.string().min(3, "Titel muss mindestens 3 Zeichen lang sein"),
    description: z
      .string()
      .min(5, "Beschreibung muss mindestens 5 Zeichen lang sein"),
    category: z.enum(reservationCategories, {
      message: "Bitte wähle eine Kategorie aus",
    }),
    status: z.enum(reservationStatuses, {
      message: "Bitte wähle einen Status aus",
    }),
    guestName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
    guestPhone: z
      .string()
      .trim()
      .min(6, "Telefonnummer ist zu kurz")
      .regex(
        /^\+?[0-9\s()/-]+$/,
        "Telefonnummer darf keine Buchstaben enthalten",
      )
      .regex(/\d/, "Telefonnummer muss mindestens eine Zahl enthalten"),
    guestsCount: z.coerce
      .number()
      .min(1, "Mindestens 1 Gast erforderlich")
      .max(50, "Maximal 50 Gäste pro Reservierung"),
    tableNumber: z.coerce
      .number()
      .min(1, "Tischnummer muss mindestens 1 sein"),
    bookingDate: z.string().min(1, "Bitte wähle ein Datum aus"),
    bookingTime: z.string().min(1, "Bitte wähle eine Uhrzeit aus"),
  })
  .superRefine(({ bookingDate, bookingTime }, context) => {
    if (!bookingDate || !bookingTime) {
      return;
    }

    const openingHours = getOpeningHoursForDate(bookingDate);

    if (!isValidReservationInterval(bookingTime)) {
      context.addIssue({
        code: "custom",
        path: ["bookingTime"],
        message: "Bitte wähle eine Uhrzeit in 15-Minuten-Schritten",
      });
      return;
    }

    if (!openingHours || isWithinOpeningHours(bookingDate, bookingTime)) {
      return;
    }

    context.addIssue({
      code: "custom",
      path: ["bookingTime"],
      message: `Reservierungen am ${openingHours.day} sind nur zwischen ${openingHours.opensAt} und ${openingHours.closesAt} Uhr möglich`,
    });
  });

export type ReservationFormValues = z.infer<typeof reservationSchema>;

export const defaultReservationValues: ReservationFormValues = {
  title: "",
  description: "",
  category: "dinner",
  status: "planned",
  guestName: "",
  guestPhone: "",
  guestsCount: 1,
  tableNumber: 1,
  bookingDate: "",
  bookingTime: "",
};
