import { type WebhookProductData } from "@/app/api/hygraph/webhook/types";

export type WebhookMethod = (webhookData: WebhookProductData) => boolean;

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
