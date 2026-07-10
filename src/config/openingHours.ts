export type CafeOpeningHours = {
  closesAt: string;
  opensAt: string;
};

export const reservationIntervalMinutes = 15;

const weekdayHours: CafeOpeningHours = {
  opensAt: "08:00",
  closesAt: "19:00",
};

const saturdayHours: CafeOpeningHours = {
  opensAt: "09:00",
  closesAt: "20:00",
};

const sundayHours: CafeOpeningHours = {
  opensAt: "09:00",
  closesAt: "18:00",
};

export const openingHoursGroups = [
  { days: "Montag – Freitag", ...weekdayHours },
  { days: "Samstag", ...saturdayHours },
  { days: "Sonntag", ...sundayHours },
] as const;

const openingHoursByWeekday: Record<number, CafeOpeningHours> = {
  0: sundayHours,
  1: weekdayHours,
  2: weekdayHours,
  3: weekdayHours,
  4: weekdayHours,
  5: weekdayHours,
  6: saturdayHours,
};

const weekdayNames = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
] as const;

export const getOpeningHoursForDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  const weekday = date.getDay();

  return {
    ...openingHoursByWeekday[weekday],
    day: weekdayNames[weekday],
  };
};

export const isWithinOpeningHours = (isoDate: string, time: string) => {
  const openingHours = getOpeningHoursForDate(isoDate);

  if (!openingHours || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    return false;
  }

  return time >= openingHours.opensAt && time <= openingHours.closesAt;
};

export const isValidReservationInterval = (time: string) => {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);

  if (!match) {
    return false;
  }

  return Number(match[2]) % reservationIntervalMinutes === 0;
};
