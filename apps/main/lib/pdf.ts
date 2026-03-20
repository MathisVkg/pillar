import React from "react";
import {
	Document,
	Page,
	View,
	Text,
	StyleSheet,
	renderToBuffer,
} from "@react-pdf/renderer";

// ─── Sender identity (from env) ───────────────────────────────────────────────

const SENDER = {
	name:    process.env.INVOICE_COMPANY_NAME ?? "Pillar",
	address: process.env.INVOICE_ADDRESS       ?? "",
	city:    process.env.INVOICE_CITY          ?? "",
	vat:     process.env.INVOICE_VAT_NUMBER    ?? "",
	email:   process.env.INVOICE_EMAIL         ?? "",
	iban:    process.env.INVOICE_IBAN          ?? "",
};

// ─── Colours ──────────────────────────────────────────────────────────────────

const C = {
	navy:    "#0F172A",
	blue:    "#2563EB",
	text:    "#1E293B",
	muted:   "#64748B",
	subtle:  "#94A3B8",
	border:  "#E2E8F0",
	altRow:  "#F8FAFC",
	white:   "#FFFFFF",
};

// ─── Typography ───────────────────────────────────────────────────────────────

const F = {
	// react-pdf built-in families
	sans:  "Helvetica",
	bold:  "Helvetica-Bold",
	mono:  "Courier",
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
	page: {
		fontFamily: F.sans,
		fontSize: 9,
		color: C.text,
		paddingBottom: 60,
	},

	// Header
	header: {
		backgroundColor: C.navy,
		paddingHorizontal: 32,
		paddingVertical: 22,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	wordmark: {
		fontFamily: F.bold,
		fontSize: 20,
		color: C.white,
		letterSpacing: 2,
	},
	headerInvoiceNo: {
		fontFamily: F.mono,
		fontSize: 11,
		color: C.white,
		letterSpacing: 1,
	},

	// Body padding
	body: {
		paddingHorizontal: 32,
		paddingTop: 24,
	},

	// Sender / recipient row
	addressRow: {
		flexDirection: "row",
		marginBottom: 24,
		gap: 24,
	},
	addressBlock: {
		flex: 1,
	},
	addressLabel: {
		fontFamily: F.bold,
		fontSize: 7,
		color: C.subtle,
		letterSpacing: 1.2,
		textTransform: "uppercase",
		marginBottom: 5,
	},
	addressName: {
		fontFamily: F.bold,
		fontSize: 10,
		color: C.text,
		marginBottom: 2,
	},
	addressLine: {
		fontSize: 9,
		color: C.muted,
		marginBottom: 1,
	},

	// Meta grid
	metaRow: {
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: C.border,
		borderBottomWidth: 1,
		borderBottomColor: C.border,
		paddingVertical: 10,
		marginBottom: 20,
		gap: 0,
	},
	metaCell: {
		flex: 1,
		paddingHorizontal: 4,
	},
	metaCellBordered: {
		flex: 1,
		paddingHorizontal: 12,
		borderLeftWidth: 1,
		borderLeftColor: C.border,
	},
	metaLabel: {
		fontSize: 7,
		color: C.subtle,
		letterSpacing: 0.8,
		textTransform: "uppercase",
		marginBottom: 3,
	},
	metaValue: {
		fontFamily: F.bold,
		fontSize: 9,
		color: C.text,
	},

	// Table
	table: {
		marginBottom: 8,
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: C.navy,
		paddingVertical: 6,
		paddingHorizontal: 8,
	},
	tableHeaderCell: {
		fontFamily: F.bold,
		fontSize: 7,
		color: C.white,
		letterSpacing: 0.8,
		textTransform: "uppercase",
	},
	tableRow: {
		flexDirection: "row",
		paddingVertical: 7,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
		borderBottomColor: C.border,
	},
	tableRowAlt: {
		backgroundColor: C.altRow,
	},
	cellDesc:   { flex: 5 },
	cellHours:  { flex: 1.2, textAlign: "right" },
	cellRate:   { flex: 1.5, textAlign: "right" },
	cellAmount: { flex: 1.5, textAlign: "right" },
	cellText: {
		fontSize: 9,
		color: C.text,
	},
	cellTextMuted: {
		fontSize: 9,
		color: C.muted,
	},
	cellTextMono: {
		fontFamily: F.mono,
		fontSize: 9,
		color: C.text,
	},
	cellTextMonoBold: {
		fontFamily: F.mono,
		fontSize: 9,
		color: C.text,
	},

	// Totals
	totalsBlock: {
		alignItems: "flex-end",
		paddingTop: 8,
		paddingRight: 8,
		marginBottom: 24,
	},
	totalsRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginBottom: 3,
		gap: 24,
	},
	totalsLabel: {
		fontSize: 9,
		color: C.muted,
		width: 110,
		textAlign: "right",
	},
	totalsValue: {
		fontFamily: F.mono,
		fontSize: 9,
		color: C.text,
		width: 70,
		textAlign: "right",
	},
	totalsDivider: {
		width: 204,
		borderTopWidth: 1,
		borderTopColor: C.border,
		marginVertical: 5,
	},
	totalsBigLabel: {
		fontFamily: F.bold,
		fontSize: 10,
		color: C.text,
		width: 110,
		textAlign: "right",
	},
	totalsBigValue: {
		fontFamily: F.mono,
		fontSize: 14,
		color: C.blue,
		width: 70,
		textAlign: "right",
	},

	// Notes
	notesBlock: {
		marginBottom: 24,
		padding: 10,
		backgroundColor: C.altRow,
		borderLeftWidth: 2,
		borderLeftColor: C.blue,
	},
	notesLabel: {
		fontFamily: F.bold,
		fontSize: 7,
		color: C.subtle,
		letterSpacing: 0.8,
		textTransform: "uppercase",
		marginBottom: 4,
	},
	notesText: {
		fontSize: 9,
		color: C.muted,
		lineHeight: 1.5,
	},

	// Footer
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: C.navy,
		paddingHorizontal: 32,
		paddingVertical: 14,
	},
	footerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	footerText: {
		fontSize: 7.5,
		color: "#94A3B8",
	},
	footerTextBold: {
		fontFamily: F.bold,
		fontSize: 7.5,
		color: "#CBD5E1",
	},
	footerIban: {
		fontFamily: F.mono,
		fontSize: 8,
		color: "#E2E8F0",
		marginTop: 2,
	},
	footerThank: {
		fontSize: 8,
		color: "#64748B",
		textAlign: "right",
		fontStyle: "italic",
	},
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type PdfTimeEntry = {
	id: string;
	description: string;
	durationMinutes: number;
	hourlyRate: number;
	loggedAt: string;
	ticket: { reference: string } | null;
};

export type PdfClient = {
	name: string;
	contractType: string;
	hourlyRate: number;
	retainerHours: number | null;
	retainerFee: number | null;
	vatNumber: string | null;
	address: string | null;
	city: string | null;
	language: string;
};

export type PdfInvoiceData = {
	number: string;
	status: string;
	periodStart: string;
	periodEnd: string;
	subtotal: number;
	vatRate: number;
	vatAmount: number;
	total: number;
	dueDate: string;
	paidAt: string | null;
	notes: string | null;
	createdAt: string;
	client: PdfClient;
	timeEntries: PdfTimeEntry[];
};

// ─── Locale helpers ───────────────────────────────────────────────────────────

function fmtDate(iso: string, lang: string): string {
	const locale = lang === "fr" ? "fr-BE" : lang === "nl" ? "nl-BE" : "en-GB";
	return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

function fmtPeriod(start: string, end: string, lang: string): string {
	const locale = lang === "fr" ? "fr-BE" : lang === "nl" ? "nl-BE" : "en-GB";
	const s = new Date(start);
	const e = new Date(end);
	if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
		return s.toLocaleDateString(locale, { month: "long", year: "numeric" });
	}
	return `${s.toLocaleDateString(locale, { day: "numeric", month: "short" })} – ${e.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}`;
}

function toHours(min: number): string {
	const h = min / 60;
	return `${h % 1 === 0 ? h.toFixed(0) : h.toFixed(2)}h`;
}

function thankYou(lang: string): string {
	if (lang === "fr") return "Merci pour votre confiance.";
	if (lang === "nl") return "Bedankt voor uw vertrouwen.";
	return "Thank you for your trust.";
}

function paymentInstruction(lang: string): string {
	if (lang === "fr") return "Veuillez virer le montant dû vers l'IBAN ci-dessous dans les 30 jours.";
	if (lang === "nl") return "Gelieve het verschuldigde bedrag over te schrijven naar onderstaand IBAN binnen 30 dagen.";
	return "Please transfer the amount due to the IBAN below within 30 days.";
}

function labelInvoiceDate(lang: string): string {
	return lang === "fr" ? "Date de facture" : lang === "nl" ? "Factuurdatum" : "Invoice date";
}
function labelDueDate(lang: string): string {
	return lang === "fr" ? "Échéance" : lang === "nl" ? "Vervaldatum" : "Due date";
}
function labelPeriod(lang: string): string {
	return lang === "fr" ? "Période" : lang === "nl" ? "Periode" : "Period";
}
function labelFrom(lang: string): string {
	return lang === "fr" ? "De" : lang === "nl" ? "Van" : "From";
}
function labelTo(lang: string): string {
	return lang === "fr" ? "À" : lang === "nl" ? "Aan" : "To";
}
function labelDescription(lang: string): string {
	return lang === "fr" ? "Description" : lang === "nl" ? "Beschrijving" : "Description";
}
function labelHours(lang: string): string {
	return lang === "fr" ? "Heures" : lang === "nl" ? "Uren" : "Hours";
}
function labelRate(lang: string): string {
	return lang === "fr" ? "Taux" : lang === "nl" ? "Tarief" : "Rate";
}
function labelAmount(lang: string): string {
	return lang === "fr" ? "Montant" : lang === "nl" ? "Bedrag" : "Amount";
}
function labelSubtotal(lang: string): string {
	return lang === "fr" ? "Sous-total" : lang === "nl" ? "Subtotaal" : "Subtotal";
}
function labelVat(lang: string): string {
	return lang === "fr" ? "TVA 21 %" : lang === "nl" ? "BTW 21 %" : "VAT 21%";
}
function labelTotal(lang: string): string {
	return lang === "fr" ? "Total TTC" : lang === "nl" ? "Totaal incl. BTW" : "Total incl. VAT";
}
function labelRetainerLine(lang: string, hours: number): string {
	if (lang === "fr") return `Forfait mensuel — ${hours}h incluses`;
	if (lang === "nl") return `Maandelijks abonnement — ${hours}u inbegrepen`;
	return `Monthly retainer — ${hours}h included`;
}
function labelExtraHours(lang: string, hours: string, rate: string): string {
	if (lang === "fr") return `Heures supplémentaires (${hours} × €${rate}/h)`;
	if (lang === "nl") return `Extra uren (${hours} × €${rate}/u)`;
	return `Extra hours (${hours} × €${rate}/h)`;
}

// ─── Build line items ─────────────────────────────────────────────────────────

type LineItem = {
	description: string;
	hours: string;
	rate: string;
	amount: number;
};

function buildLineItems(data: PdfInvoiceData): LineItem[] {
	const { client, timeEntries } = data;
	const isRetainer =
		client.contractType === "retainer" &&
		client.retainerFee != null &&
		client.retainerHours != null;

	if (isRetainer) {
		const totalMinutes = timeEntries.reduce((s, e) => s + e.durationMinutes, 0);
		const totalHours = totalMinutes / 60;
		const includedHours = client.retainerHours!;
		const extraHours = Math.max(totalHours - includedHours, 0);
		const lang = client.language;

		const items: LineItem[] = [
			{
				description: labelRetainerLine(lang, includedHours),
				hours: `${includedHours}h`,
				rate: "—",
				amount: client.retainerFee!,
			},
		];

		if (extraHours > 0) {
			items.push({
				description: labelExtraHours(lang, toHours(extraHours * 60), client.hourlyRate.toFixed(2)),
				hours: toHours(extraHours * 60),
				rate: `€${client.hourlyRate.toFixed(2)}/h`,
				amount: extraHours * client.hourlyRate,
			});
		}
		return items;
	}

	// Ad hoc: one row per entry
	return timeEntries.map((e) => ({
		description: e.ticket
			? `[${e.ticket.reference}] ${e.description}`
			: e.description,
		hours: toHours(e.durationMinutes),
		rate: `€${e.hourlyRate.toFixed(2)}/h`,
		amount: (e.durationMinutes / 60) * e.hourlyRate,
	}));
}

// ─── PDF Document component ───────────────────────────────────────────────────

function InvoicePdf({ data }: { data: PdfInvoiceData }) {
	const lang = data.client.language;
	const lineItems = buildLineItems(data);

	return (
		React.createElement(Document, { title: data.number, author: SENDER.name },
			React.createElement(Page, { size: "A4", style: S.page },

				// ── HEADER ─────────────────────────────────────────────────────
				React.createElement(View, { style: S.header },
					React.createElement(Text, { style: S.wordmark }, SENDER.name.toUpperCase()),
					React.createElement(Text, { style: S.headerInvoiceNo }, data.number),
				),

				// ── BODY ───────────────────────────────────────────────────────
				React.createElement(View, { style: S.body },

					// ── Sender / Recipient row ────────────────────────────────
					React.createElement(View, { style: S.addressRow },

						// Sender
						React.createElement(View, { style: S.addressBlock },
							React.createElement(Text, { style: S.addressLabel }, labelFrom(lang)),
							React.createElement(Text, { style: S.addressName }, SENDER.name),
							SENDER.address && React.createElement(Text, { style: S.addressLine }, SENDER.address),
							SENDER.city    && React.createElement(Text, { style: S.addressLine }, SENDER.city),
							SENDER.vat     && React.createElement(Text, { style: S.addressLine }, `TVA/BTW: ${SENDER.vat}`),
							SENDER.email   && React.createElement(Text, { style: S.addressLine }, SENDER.email),
						),

						// Recipient
						React.createElement(View, { style: S.addressBlock },
							React.createElement(Text, { style: S.addressLabel }, labelTo(lang)),
							React.createElement(Text, { style: S.addressName }, data.client.name),
							data.client.address && React.createElement(Text, { style: S.addressLine }, data.client.address),
							data.client.city    && React.createElement(Text, { style: S.addressLine }, data.client.city),
							data.client.vatNumber && React.createElement(Text, { style: S.addressLine }, `TVA/BTW: ${data.client.vatNumber}`),
						),
					),

					// ── Invoice meta ──────────────────────────────────────────
					React.createElement(View, { style: S.metaRow },
						React.createElement(View, { style: S.metaCell },
							React.createElement(Text, { style: S.metaLabel }, labelInvoiceDate(lang)),
							React.createElement(Text, { style: S.metaValue }, fmtDate(data.createdAt, lang)),
						),
						React.createElement(View, { style: S.metaCellBordered },
							React.createElement(Text, { style: S.metaLabel }, labelDueDate(lang)),
							React.createElement(Text, { style: S.metaValue }, fmtDate(data.dueDate, lang)),
						),
						React.createElement(View, { style: S.metaCellBordered },
							React.createElement(Text, { style: S.metaLabel }, labelPeriod(lang)),
							React.createElement(Text, { style: S.metaValue }, fmtPeriod(data.periodStart, data.periodEnd, lang)),
						),
					),

					// ── Line items table ──────────────────────────────────────
					React.createElement(View, { style: S.table },

						// Table header
						React.createElement(View, { style: S.tableHeader },
							React.createElement(View, { style: S.cellDesc },
								React.createElement(Text, { style: S.tableHeaderCell }, labelDescription(lang)),
							),
							React.createElement(View, { style: S.cellHours },
								React.createElement(Text, { style: [S.tableHeaderCell, { textAlign: "right" }] }, labelHours(lang)),
							),
							React.createElement(View, { style: S.cellRate },
								React.createElement(Text, { style: [S.tableHeaderCell, { textAlign: "right" }] }, labelRate(lang)),
							),
							React.createElement(View, { style: S.cellAmount },
								React.createElement(Text, { style: [S.tableHeaderCell, { textAlign: "right" }] }, labelAmount(lang)),
							),
						),

						// Table rows
						...lineItems.map((item, i) =>
							React.createElement(View, {
								key: String(i),
								style: [S.tableRow, ...(i % 2 === 1 ? [S.tableRowAlt] : [])],
							},
								React.createElement(View, { style: S.cellDesc },
									React.createElement(Text, { style: S.cellText }, item.description),
								),
								React.createElement(View, { style: S.cellHours },
									React.createElement(Text, { style: [S.cellTextMuted, { textAlign: "right" }] }, item.hours),
								),
								React.createElement(View, { style: S.cellRate },
									React.createElement(Text, { style: [S.cellTextMuted, { textAlign: "right" }] }, item.rate),
								),
								React.createElement(View, { style: S.cellAmount },
									React.createElement(Text, { style: [S.cellTextMonoBold, { textAlign: "right" }] }, `€${item.amount.toFixed(2)}`),
								),
							)
						),
					),

					// ── Totals ────────────────────────────────────────────────
					React.createElement(View, { style: S.totalsBlock },
						// Subtotal
						React.createElement(View, { style: S.totalsRow },
							React.createElement(Text, { style: S.totalsLabel }, labelSubtotal(lang)),
							React.createElement(Text, { style: S.totalsValue }, `€${data.subtotal.toFixed(2)}`),
						),
						// VAT
						React.createElement(View, { style: S.totalsRow },
							React.createElement(Text, { style: S.totalsLabel }, labelVat(lang)),
							React.createElement(Text, { style: S.totalsValue }, `€${data.vatAmount.toFixed(2)}`),
						),
						// Divider
						React.createElement(View, { style: S.totalsDivider }),
						// Total
						React.createElement(View, { style: S.totalsRow },
							React.createElement(Text, { style: S.totalsBigLabel }, labelTotal(lang)),
							React.createElement(Text, { style: S.totalsBigValue }, `€${data.total.toFixed(2)}`),
						),
					),

					// ── Notes ─────────────────────────────────────────────────
					data.notes ? React.createElement(View, { style: S.notesBlock },
						React.createElement(Text, { style: S.notesLabel }, "Notes"),
						React.createElement(Text, { style: S.notesText }, data.notes),
					) : null,
				),

				// ── FOOTER ─────────────────────────────────────────────────────
				React.createElement(View, { style: S.footer },
					React.createElement(View, { style: S.footerRow },
						React.createElement(View, null,
							React.createElement(Text, { style: S.footerText }, paymentInstruction(lang)),
							React.createElement(Text, { style: S.footerIban }, `IBAN: ${SENDER.iban}`),
							React.createElement(Text, { style: [S.footerText, { marginTop: 2 }] }, `TVA/BTW: ${SENDER.vat}`),
						),
						React.createElement(Text, { style: S.footerThank }, thankYou(lang)),
					),
				),
			)
		)
	);
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function generateInvoicePdf(data: PdfInvoiceData): Promise<Buffer> {
	const element = React.createElement(InvoicePdf, { data });
	return renderToBuffer(element);
}
