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
	const cart = await getCartByIdFromCookies();
	if (cart) {
		return cart;
	}

	const { createOrder: newCart } = await executeGraphql(CartCreateDocument, {});

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id, {
		httpOnly: true,
		sameSite: "lax",
		// secure: true
	});

	return newCart;
}

export async function getCartByIdFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await executeGraphql(CartGetByIdDocument, { id: cartId });

		// if (cart.order) {
		// 	return cart.order;
		// }

		return cart.order;
	}
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
