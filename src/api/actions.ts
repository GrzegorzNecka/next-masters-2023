"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getCartByIdFromCookies } from "./cart";
import { createReviewByProductId, publishReviewById } from "./products";
import { executeGraphql } from "@/api/graphql";
import { CartRemoveProductDocument, CartSetProductQuantityDocument } from "@/gql/graphql";

export const removeItem = async (itemId: string) => {
	const res = await executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			itemId,
		},
	});
	revalidateTag("cart");
	return res;
};

export const changeItemQuantity = async (itemId: string, quantity: number) => {
	const res = await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});

	revalidateTag("cart");

	return res;
};

export const handlePaymentAction = async () => {
	"use server";
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY");
	}

	const cart = await getCartByIdFromCookies();

	if (!cart) {
		return;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "blik", "p24"],
		metadata: {
			orderId: cart.id,
		},
		line_items: cart.orderItems.map((item) => ({
			price_data: {
				currency: "pln",
				product_data: {
					name: item.product?.name || "",
				},
				unit_amount: item.product?.price || 0,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_HOST}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_HOST}/cart/cancel?session_id={CHECKOUT_SESSION_ID}`,
	});

	if (!checkoutSession.url) {
		throw new Error("Somethingwent wrong with checkoutSession");
	}

	cookies().set("cartId", "");
	redirect(checkoutSession.url);
};

export async function handleProductReviewSubmissionAction(payload: {
	productId: string;
	name: string;
	email: string;
	headline: string;
	content: string;
	rating: number;
}) {
	try {
		const { productId, name, email, headline, content, rating } = payload;

		if (
			typeof productId !== "string" ||
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof headline !== "string" ||
			typeof content !== "string" ||
			!Number.isInteger(Number(rating))
		) {
			throw new Error("Invalid form data");
		}

		const id = await createReviewByProductId({
			productId,
			name,
			email,
			content,
			rating: Number(rating),
			headline,
		});

		if (!id) {
			throw new Error("Invalid review id");
		}

		await publishReviewById({ id });
		revalidateTag(`review-product-id-${productId}`);
	} catch (error) {
		throw new Error("something went wrong with Hygraph connection");
	}
}
