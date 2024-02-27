import { Suspense } from "react";

import { cookies } from "next/headers";
import { getProductBySlug, getProductsSlugList } from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { Typography } from "@/ui/atoms/Typography";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";
import { ProductVariantsList } from "@/ui/atoms/ProductVariantsList";
import { executeGraphql } from "@/api/graphql";
import {
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	CartAddItemDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";

export async function generateStaticParams() {
	const products = await getProductsSlugList();

	return products.map((product) => {
		return { productSlug: product.slug };
	});
}

export default async function SingleProductPage({
	params,
	searchParams,
}: {
	params: { productSlug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const product = await getProductBySlug(params.productSlug);

	if (!product) {
		return <p>produkt chwilowo niedostępny</p>;
	}

	async function addProductToCartAction() {
		"use server";

		if (!product?.id) {
			return;
		}

		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, product.id);
	}

	return (
		<>
			<section className="flex gap-10">
				<ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
				<div>
					<ProductSingleDescription product={product} />
					<ProductVariantsList searchParams={searchParams} product={product} />
					<p className="ml-1 text-sm font-semibold text-slate-500">in stock</p>
					<form action={addProductToCartAction}>
						<input type="hidden" name="productId" value={product.id} />
						<button type="submit" className="rounded-sm border bg-slate-200 px-6 py-2 shadow-sm">
							Add to cart
						</button>
					</form>
				</div>
			</section>

			<aside>
				<hr className="my-10" />
				<Typography className="mb-10 mt-4 text-xl font-semibold" isUppercase={true} as="h2">
					sugerowane
				</Typography>

				<Suspense fallback={"ładownienie"}>
					<SugestedProductsList />
				</Suspense>
			</aside>
		</>
	);
}

async function getOrCreateCart(): Promise<CartFragment> {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const { order: cart } = await executeGraphql(CartGetByIdDocument, { id: cartId });

		if (cart) {
			return cart;
		}
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

async function addProductToCart(orderId: string, productId: string) {
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
