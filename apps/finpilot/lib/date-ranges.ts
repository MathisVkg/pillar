export type ReportingDateRange = {
  start: Date;
  end: Date;
  startDateOnly: string;
  endDateOnly: string;
};

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatDateOnly(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function parseYear(
  value: string | null,
  fallbackYear = new Date().getFullYear(),
): number | null {
  const year = value === null ? fallbackYear : Number(value);
  if (!Number.isInteger(year) || year < 2000 || year > 2100) return null;
  return year;
}

export function parseDateOnly(value: string | null): Date | null {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return date;
}

export function getDateOnlyRange(
  from: string | null,
  to: string | null,
): ReportingDateRange | null {
  const startDay = parseDateOnly(from);
  const endDay = parseDateOnly(to);
  if (!startDay || !endDay || startDay > endDay) return null;

  const start = new Date(startDay);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDay);
  end.setHours(23, 59, 59, 999);

  return {
    start,
    end,
    startDateOnly: formatDateOnly(startDay),
    endDateOnly: formatDateOnly(endDay),
  };
}

export function getMonthRange(date: Date): ReportingDateRange {
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  return {
    start,
    end,
    startDateOnly: formatDateOnly(start),
    endDateOnly: formatDateOnly(end),
  };
}

export function getQuarterRange(
  year: number,
  quarter: 1 | 2 | 3 | 4,
): ReportingDateRange {
  const startMonth = (quarter - 1) * 3;
  const start = new Date(year, startMonth, 1, 0, 0, 0, 0);
  const end = new Date(year, startMonth + 3, 0, 23, 59, 59, 999);

  return {
    start,
    end,
    startDateOnly: formatDateOnly(start),
    endDateOnly: formatDateOnly(end),
  };
}

export function getQuarterRangeForDate(date: Date): ReportingDateRange {
  const quarter = (Math.floor(date.getMonth() / 3) + 1) as 1 | 2 | 3 | 4;
  return getQuarterRange(date.getFullYear(), quarter);
}

export function getYearRange(year: number): ReportingDateRange {
  const start = new Date(year, 0, 1, 0, 0, 0, 0);
  const end = new Date(year, 11, 31, 23, 59, 59, 999);

  return {
    start,
    end,
    startDateOnly: formatDateOnly(start),
    endDateOnly: formatDateOnly(end),
  };
}
