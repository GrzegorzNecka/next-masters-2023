/**
 *  hygraph webhook: https://hygraph.com/docs/api-reference/basics/webhooks
 *
 */

import { createHmac } from "crypto";

import { type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { type WebhookProductData } from "./types";
import { VALIDATOR_PRODUCT_WEBHOOKS } from "@/validator/methods";
import { validator } from "@/validator/validator";

export async function POST(request: NextRequest): Promise<Response> {
	const body = (await request.json()) as WebhookProductData;
	const signature = request.headers.get("gcms-signature");

	if (!verifySignature(body, signature)) {
		return new Response("Invalid signature", { status: 401 });
	}

	if (validator(VALIDATOR_PRODUCT_WEBHOOKS, body)) {
		body.data.localizations.forEach((localization) => {
			revalidatePath(`/product/${localization.slug}`);
		});

		revalidatePath(`/products`);

		return new Response("Product model revalidated successfully", { status: 200 });
	} else {
		return new Response(null, { status: 400 });
	}
}

function verifySignature(body: WebhookProductData, signature: string | null): boolean {
	if (!signature || !process.env.HYGRAPH_WEBHOOK_SECRET) {
		return false;
	}

	const secret = process.env.HYGRAPH_WEBHOOK_SECRET;
	const [rawSign, rawEnv, rawTimestamp] = signature.split(", ");

	const sign = rawSign?.replace("sign=", "");
	const EnvironmentName = rawEnv?.replace("env=", "");
	const TimeStamp = parseInt(rawTimestamp?.replace("t=", "") ?? "");

	const payload = JSON.stringify({
		Body: JSON.stringify(body),
		EnvironmentName,
		TimeStamp,
	});

	const hash = createHmac("sha256", secret).update(payload).digest("base64");

	return sign === hash;
}
