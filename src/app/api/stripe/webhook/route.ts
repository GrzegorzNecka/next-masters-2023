/// <reference types="stripe-event-types" />
import { type NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest): Promise<Response> {
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret) {
		return new Response("No webhook secret", { status: 500 });
	}
	if (!process.env.STRIPE_SECRET_KEY) {
		return new Response("No Stripe secret key", { status: 500 });
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const signature = request.headers.get("stripe-signature");

	if (!signature) {
		return new Response("No signature", { status: 400 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		webhookSecret,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case "payment_intent.created": {
			event.data.object.metadata.cartId;
			// console.log("payment_intent.created", event.data.object);
		}
		case "checkout.session.completed": {
			event.data.object;
			console.log("checkout.session.completed", event.data.object);
		}
		case "checkout.session.expired": {
			event.data.object;
			// console.log("checkout.session.expired", event.data.object);
		}

		case "checkout.session.async_payment_failed": {
			event.data.object;
			// console.log("checkout.session.async_payment_failed", event.data.object);
		}
		case "checkout.session.async_payment_succeeded": {
			event.data.object;
			// console.log("checkout.session.async_payment_succeeded", event.data.object);
		}
	}

	return new Response(null, { status: 204 });
}
