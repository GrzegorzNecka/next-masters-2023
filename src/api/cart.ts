import { cookies } from "next/headers";

import { executeGraphql } from "./graphql";
import {
	CartCreateDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	type CartFragment,
	CartItemGetIdByProductIdDocument,
	CartAddOrUpdateItemDocument,
} from "@/gql/graphql";

export async function getCartByIdFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		return;
	}

	const cart = await executeGraphql({
		query: CartGetByIdDocument,
		variables: { id: cartId },
		cache: "no-store",
		next: { tags: ["cart"] },
	});

	return cart.order;
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
		throw new Error("unexpected failed to create cart");
		//TODO - inna forma powiadomienia
	}

	cookies().set("cartId", cart.id, {
		httpOnly: true,
		sameSite: "lax",
		// secure: true
	});

	return cart;
}

export async function addProductToCart({
	orderId,
	productId,
	quantity,
	variantId,
}: {
	orderId: string;
	productId: string;
	quantity: number;
	variantId?: string;
}) {
	const { product } = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id: productId },
		cache: "no-cache",
	});

	console.log("variantId - co z tym dalej zrobić", variantId);
	//todo sprawdźcz ywariant istnieje w bazie danych

	if (!product) {
		throw new Error(`Product with id ${productId} not found`);
	}

	//todo prześlij id variantu

	const cartItemId = await executeGraphql({
		query: CartItemGetIdByProductIdDocument,
		variables: { orderId: orderId, productId: productId },
		cache: "no-cache",
	});

	const orderItem = cartItemId.order?.orderItems?.at(0);
	const currentQuantity = orderItem?.quantity ? orderItem?.quantity + quantity : quantity;

	await executeGraphql({
		query: CartAddOrUpdateItemDocument,
		variables: {
			orderItemId: orderItem?.id,
			orderId: orderId,
			productId: productId,
			total: product.price * currentQuantity,
			quantity: currentQuantity,
		},
		cache: "no-store",
	});
}
