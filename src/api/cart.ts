import { cookies } from "next/headers";
import { executeGraphql } from "./graphql";
import {
	CartAddItemDocument,
	CartCreateDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	type CartFragment,
} from "@/gql/graphql";

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartByIdFromCookies();

	if (existingCart) {
		return existingCart;
	}

	const { createOrder: cart } = await executeGraphql(CartCreateDocument, {});

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
	const { product } = await executeGraphql(ProductGetByIdDocument, { id: productId });

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}
	await executeGraphql(CartAddItemDocument, {
		orderId: orderId,
		productId: productId,
		total: product.price,
	});
}

export async function getCartByIdFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await executeGraphql(CartGetByIdDocument, { id: cartId });

		return cart.order;
	}
}
