import { type WebhookProductData } from "@/app/api/hygraph/webhook/types";

export type ValidationMethod = <T>(input: T | T[] | undefined) => boolean;
export type WebhookMethod = (webhookData: WebhookProductData) => boolean;

export const isValidObject: WebhookMethod = (value) => typeof value === "object";
export const isValidString: ValidationMethod = (value) => typeof value === "string";
export const isValidDefined: ValidationMethod = (value) => typeof value !== "undefined";
export const isValidUndefined: ValidationMethod = (value) => typeof value === "undefined";
export const isValidNonEmptyArray: ValidationMethod = (value) =>
	Array.isArray(value) && value.length > 0;
export const isValidInteger: ValidationMethod = (value) => Number.isInteger(Number(value));

// SPECIFIC HYGRAPH WEBHOOK METHODS

const isWebhookDataObject: WebhookMethod = (webhookData) => typeof webhookData === "object";
const isWebhookProductModel: WebhookMethod = (webhookData) =>
	webhookData.data.__typename === "Product";
const hasValidProductLocalizations: WebhookMethod = (webhookData) =>
	webhookData.data.localizations.some((localization) => localization.slug);

export const VALIDATOR_PRODUCT_WEBHOOKS = [
	isWebhookDataObject,
	isWebhookProductModel,
	hasValidProductLocalizations,
];
