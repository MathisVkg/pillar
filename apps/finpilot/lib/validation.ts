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
export const ROAD_BOOK_TYPES = ["professional", "personal"] as const;
export const COMPANY_ASSET_STATUSES = [
  "active",
  "sold",
  "retired",
  "lost",
] as const;
export const COMPANY_ASSET_CATEGORIES = EXPENSE_CATEGORIES;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type ExpenseStatus = (typeof EXPENSE_STATUSES)[number];
export type ExternalIncomeStatus = (typeof EXTERNAL_INCOME_STATUSES)[number];
export type RecurringFrequency = (typeof RECURRING_FREQUENCIES)[number];
export type RoadBookType = (typeof ROAD_BOOK_TYPES)[number];
export type CompanyAssetStatus = (typeof COMPANY_ASSET_STATUSES)[number];
export type CompanyAssetCategory = (typeof COMPANY_ASSET_CATEGORIES)[number];

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

export function parseOptionalDate(
  value: unknown,
  field: string,
): ValidationResult<Date | null | undefined> {
  if (value === undefined) return { ok: true, value: undefined };
  if (value === null || (typeof value === "string" && value.trim() === "")) {
    return { ok: true, value: null };
  }

  return parseRequiredDate(value, field);
}

export function parseRequiredString(
  value: unknown,
  field: string,
): ValidationResult<string> {
  if (typeof value !== "string" || value.trim() === "") {
    return { ok: false, error: `${field} is required` };
  }

  return { ok: true, value: value.trim() };
}

export function parseOptionalString(
  value: unknown,
  field: string,
): ValidationResult<string | null | undefined> {
  if (value === undefined) return { ok: true, value: undefined };
  if (value === null) return { ok: true, value: null };
  if (typeof value !== "string") {
    return { ok: false, error: `${field} must be a string` };
  }

  const trimmed = value.trim();
  return { ok: true, value: trimmed === "" ? null : trimmed };
}

export function parseOptionalNonNegativeInteger(
  value: unknown,
  field: string,
): ValidationResult<number | null | undefined> {
  if (value === undefined) return { ok: true, value: undefined };
  if (value === null || (typeof value === "string" && value.trim() === "")) {
    return { ok: true, value: null };
  }

  const parsed =
    typeof value === "string" ? Number(value) : typeof value === "number" ? value : Number.NaN;

  if (!Number.isInteger(parsed)) {
    return { ok: false, error: `${field} must be a whole number` };
  }

  if (parsed < 0) {
    return { ok: false, error: `${field} must be zero or greater` };
  }

  return { ok: true, value: parsed };
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

export function parseRoadBookType(
  value: unknown,
  field = "type",
): ValidationResult<RoadBookType> {
  if (!isInList(value, ROAD_BOOK_TYPES)) {
    return {
      ok: false,
      error: `${field} must be one of ${ROAD_BOOK_TYPES.join(" | ")}`,
    };
  }

  return { ok: true, value };
}

export function parseCompanyAssetStatus(
  value: unknown,
  field = "status",
): ValidationResult<CompanyAssetStatus> {
  if (!isInList(value, COMPANY_ASSET_STATUSES)) {
    return {
      ok: false,
      error: `${field} must be one of ${COMPANY_ASSET_STATUSES.join(" | ")}`,
    };
  }

  return { ok: true, value };
}

export function parseCompanyAssetCategory(
  value: unknown,
  field = "category",
): ValidationResult<CompanyAssetCategory> {
  if (!isInList(value, COMPANY_ASSET_CATEGORIES)) {
    return {
      ok: false,
      error: `${field} must be one of ${COMPANY_ASSET_CATEGORIES.join(" | ")}`,
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

export type RoadBookValidationContext = {
  partial?: boolean;
  existing?: {
    type: string;
    purpose: string | null;
    odometerStart: number | null;
    odometerEnd: number | null;
  };
};

export function validateRoadBookInput(
  body: Record<string, unknown>,
  context: RoadBookValidationContext = {},
): ValidationResult<Record<string, unknown>> {
  const data: Record<string, unknown> = {};
  const { partial = false, existing } = context;

  if (!partial || body.tripDate !== undefined) {
    const result = parseRequiredDate(body.tripDate, "tripDate");
    if (!result.ok) return result;
    data.tripDate = result.value;
  }

  if (!partial || body.type !== undefined) {
    const result = parseRoadBookType(body.type);
    if (!result.ok) return result;
    data.type = result.value;
  }

  for (const field of ["vehicleName", "startLocation", "endLocation"] as const) {
    if (!partial || body[field] !== undefined) {
      const result = parseRequiredString(body[field], field);
      if (!result.ok) return result;
      data[field] = result.value;
    }
  }

  const purposeResult = parseOptionalString(body.purpose, "purpose");
  if (!purposeResult.ok) return purposeResult;
  if (purposeResult.value !== undefined) data.purpose = purposeResult.value;

  const notesResult = parseOptionalString(body.notes, "notes");
  if (!notesResult.ok) return notesResult;
  if (notesResult.value !== undefined) data.notes = notesResult.value;

  const hasOdometerStart = body.odometerStart !== undefined;
  const hasOdometerEnd = body.odometerEnd !== undefined;
  if (hasOdometerStart !== hasOdometerEnd) {
    return {
      ok: false,
      error: "odometerStart and odometerEnd must be provided together",
    };
  }

  if (hasOdometerStart && hasOdometerEnd) {
    const startResult = parseOptionalNonNegativeInteger(
      body.odometerStart,
      "odometerStart",
    );
    if (!startResult.ok) return startResult;

    const endResult = parseOptionalNonNegativeInteger(
      body.odometerEnd,
      "odometerEnd",
    );
    if (!endResult.ok) return endResult;

    if (startResult.value === null || endResult.value === null) {
      data.odometerStart = null;
      data.odometerEnd = null;
    } else if (
      startResult.value !== undefined &&
      endResult.value !== undefined
    ) {
      if (endResult.value < startResult.value) {
        return {
          ok: false,
          error: "odometerEnd must be greater than or equal to odometerStart",
        };
      }
      data.odometerStart = startResult.value;
      data.odometerEnd = endResult.value;
      data.distanceKm = endResult.value - startResult.value;
    }
  }

  if (data.distanceKm === undefined && (!partial || body.distanceKm !== undefined)) {
    const distanceResult = parseNonNegativeAmount(body.distanceKm, "distanceKm");
    if (!distanceResult.ok) return distanceResult;
    data.distanceKm = distanceResult.value;
  }

  const resolvedType = (data.type as string | undefined) ?? existing?.type;
  const resolvedPurpose =
    data.purpose !== undefined ? data.purpose : existing?.purpose;
  if (resolvedType === "professional" && !resolvedPurpose) {
    return {
      ok: false,
      error: "purpose is required for professional trips",
    };
  }

  return { ok: true, value: data };
}

export function validateCompanyAssetInput(
  body: Record<string, unknown>,
  { partial = false }: { partial?: boolean } = {},
): ValidationResult<Record<string, unknown>> {
  const data: Record<string, unknown> = {};

  if (!partial || body.name !== undefined) {
    const result = parseRequiredString(body.name, "name");
    if (!result.ok) return result;
    data.name = result.value;
  }

  if (!partial || body.category !== undefined) {
    const result = parseCompanyAssetCategory(body.category);
    if (!result.ok) return result;
    data.category = result.value;
  }

  if (!partial || body.purchaseDate !== undefined) {
    const result = parseRequiredDate(body.purchaseDate, "purchaseDate");
    if (!result.ok) return result;
    data.purchaseDate = result.value;
  }

  if (!partial || body.purchasePriceExcl !== undefined) {
    const result = parseNonNegativeAmount(
      body.purchasePriceExcl,
      "purchasePriceExcl",
    );
    if (!result.ok) return result;
    data.purchasePriceExcl = result.value;
  }

  if (!partial || body.vatAmount !== undefined) {
    const result = parseNonNegativeAmount(body.vatAmount ?? 0, "vatAmount");
    if (!result.ok) return result;
    data.vatAmount = result.value;
  }

  if (!partial || body.status !== undefined) {
    const result = parseCompanyAssetStatus(body.status ?? "active");
    if (!result.ok) return result;
    data.status = result.value;
  }

  for (const field of ["serialNumber", "vendor", "location", "notes"] as const) {
    const result = parseOptionalString(body[field], field);
    if (!result.ok) return result;
    if (result.value !== undefined) data[field] = result.value;
  }

  const warrantyResult = parseOptionalDate(body.warrantyUntil, "warrantyUntil");
  if (!warrantyResult.ok) return warrantyResult;
  if (warrantyResult.value !== undefined) {
    data.warrantyUntil = warrantyResult.value;
  }

  return { ok: true, value: data };
}
