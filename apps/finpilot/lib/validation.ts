export const EXPENSE_CATEGORIES = [
  "software_license",
  "hosting",
  "telecom",
  "hardware",
  "office",
  "vehicle",
  "other",
] as const;

export const EXPENSE_STATUSES = ["draft", "pending", "paid"] as const;
export const EXTERNAL_INCOME_STATUSES = ["draft", "waiting", "paid"] as const;
export const RECURRING_FREQUENCIES = [
  "monthly",
  "quarterly",
  "yearly",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type ExpenseStatus = (typeof EXPENSE_STATUSES)[number];
export type ExternalIncomeStatus = (typeof EXTERNAL_INCOME_STATUSES)[number];
export type RecurringFrequency = (typeof RECURRING_FREQUENCIES)[number];

type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function isInList<T extends readonly string[]>(
  value: unknown,
  allowed: T,
): value is T[number] {
  return typeof value === "string" && allowed.includes(value);
}

export function parseNonNegativeAmount(
  value: unknown,
  field: string,
): ValidationResult<number> {
  const amount =
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : typeof value === "number"
        ? value
        : Number.NaN;

  if (!Number.isFinite(amount)) {
    return { ok: false, error: `${field} must be a valid number` };
  }

  if (amount < 0) {
    return { ok: false, error: `${field} must be zero or greater` };
  }

  return { ok: true, value: amount };
}

export function parseRequiredDate(
  value: unknown,
  field: string,
): ValidationResult<Date> {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return { ok: false, error: `${field} is required` };
  }

  if (
    typeof value !== "string" &&
    typeof value !== "number" &&
    !(value instanceof Date)
  ) {
    return { ok: false, error: `${field} must be a valid date` };
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { ok: false, error: `${field} must be a valid date` };
  }

  return { ok: true, value: date };
}

export function parseExpenseCategory(
  value: unknown,
  field = "category",
): ValidationResult<ExpenseCategory> {
  if (!isInList(value, EXPENSE_CATEGORIES)) {
    return {
      ok: false,
      error: `${field} must be one of ${EXPENSE_CATEGORIES.join(" | ")}`,
    };
  }

  return { ok: true, value };
}

export function parseExpenseStatus(
  value: unknown,
  field = "status",
): ValidationResult<ExpenseStatus> {
  if (!isInList(value, EXPENSE_STATUSES)) {
    return {
      ok: false,
      error: `${field} must be one of ${EXPENSE_STATUSES.join(" | ")}`,
    };
  }

  return { ok: true, value };
}

export function parseExternalIncomeStatus(
  value: unknown,
  field = "status",
): ValidationResult<ExternalIncomeStatus> {
  if (!isInList(value, EXTERNAL_INCOME_STATUSES)) {
    return {
      ok: false,
      error: `${field} must be one of ${EXTERNAL_INCOME_STATUSES.join(" | ")}`,
    };
  }

  return { ok: true, value };
}

export function parseRecurringFrequency(
  value: unknown,
  field = "frequency",
): ValidationResult<RecurringFrequency> {
  if (!isInList(value, RECURRING_FREQUENCIES)) {
    return {
      ok: false,
      error: `${field} must be one of ${RECURRING_FREQUENCIES.join(" | ")}`,
    };
  }

  return { ok: true, value };
}

export function parseOptionalBoolean(
  value: unknown,
  field: string,
): ValidationResult<boolean | undefined> {
  if (value === undefined) return { ok: true, value: undefined };
  if (typeof value === "boolean") return { ok: true, value };

  return { ok: false, error: `${field} must be true or false` };
}
