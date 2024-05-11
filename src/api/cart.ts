import { cookies } from "next/headers";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { executeGraphql } from "./graphql";
import {
	CartAddItemDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	type CartFragment,
} from "@/gql/graphql";

export async function getCartByIdFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: { id: cartId },
			cache: "no-store",
			next: { tags: ["cart"] },
		});

		return cart.order;
	}
}

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartByIdFromCookies();

	if (existingCart) {
		return existingCart;
	}

	const { createOrder: cart } = await executeGraphql({
		query: CartCreateDocument,
		cache: "no-cache",
	});

	if (!cart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", cart.id, {
		httpOnly: true,
		sameSite: "lax",
		// secure: true
	});

	return cart;
}

export async function addProductToCart(orderId: string, productId: string) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id: productId },
		cache: "no-cache",
	});

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}
	await executeGraphql({
		query: CartAddItemDocument,
		variables: {
			orderId: orderId,
			productId: productId,
			total: product.price,
		},
		cache: "no-store",
	});
}

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
