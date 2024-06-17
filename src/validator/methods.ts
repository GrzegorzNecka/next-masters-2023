import { type WebhookProductData } from "@/app/api/hygraph/webhook/types";

// WEBHOOK VALIDATORS

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

// NUMBER VALIDATORS

export type NumericValidationMethod = (input:string) => boolean;


export const isValidInteger: NumericValidationMethod = (
	value: string
  ): boolean => {
	return Number.isInteger(Number(value));
  };

  export const NUMBER_VALIDATORS: NumericValidationMethod[] = [
	isValidInteger
  ];

 // STRING VALIDATORS

export type StringValidationMethod = (input: string) => boolean;

export const isValidString: StringValidationMethod = (value) => typeof value === "string";

export const STRING_VALIDATORS:StringValidationMethod[] = [
	isValidString
  ];