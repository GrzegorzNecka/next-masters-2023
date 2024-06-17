
import type {  WebhookMethod,  StringValidationMethod,  NumericValidationMethod } from "./methods";
import { type WebhookProductData } from "@/app/api/hygraph/webhook/types";

export const validateWebhook = <T extends Array<WebhookMethod>>(validators: T, input: WebhookProductData ): boolean => {
    const validateWebhook = validators.every((fn) => fn(input));
    return validateWebhook;
};

export function validate(
	input: string | Array<string>,
	validators: StringValidationMethod[] | NumericValidationMethod[]
  ): boolean {


	if(Array.isArray(input)) {
		return input.every((item) => validators.every((fn) => fn(item)));
	}

   return validators.every((fn) => fn(input));
  }
  
