export const INVOICE_STATUSES = [
  "draft",
  "sent",
  "paid",
  "overdue",
  "voided",
] as const;

export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const VALID_INVOICE_STATUS_TRANSITIONS: Record<
  InvoiceStatus,
  readonly InvoiceStatus[]
> = {
  draft: ["sent"],
  sent: ["paid"],
  paid: [],
  overdue: ["paid"],
  voided: [],
};

export function isInvoiceStatus(value: unknown): value is InvoiceStatus {
  return (
    typeof value === "string" &&
    INVOICE_STATUSES.includes(value as InvoiceStatus)
  );
}
