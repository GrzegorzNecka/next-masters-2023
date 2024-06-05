import { type WebhookMethod } from "./methods";
import { type WebhookProductData } from "@/app/api/hygraph/webhook/types";

export const validator = <T extends WebhookMethod[]>(validators: T, value: WebhookProductData) => {
	const validateWebhook = validators.every((fn) => fn(value));

	return validateWebhook;
};
