import { Suspense } from "react";

import { cookies } from "next/headers";
import { getProductBySlug, getProductsSlugList } from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { Typography } from "@/ui/atoms/Typography";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";
import { ProductVariantsList } from "@/ui/atoms/ProductVariantsList";
import { executeGraphql } from "@/api/graphql";
import { CartCreateDocument, type CartFragment, CartGetByIdDocument } from "@/gql/graphql";

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

	async function addToCartAction(formData: FormData) {
		"use server";

		const cart = await getOrCreateCart();
		cookies().set("cartId", cart.id);

		// await addToCart(cart.id, params.productId);

		console.log(formData);
	}

	return (
		<>
			<section className="flex gap-10">
				<ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
				<div>
					<ProductSingleDescription product={product} />
					<ProductVariantsList searchParams={searchParams} product={product} />
					<p className="ml-1 text-sm font-semibold text-slate-500">in stock</p>
					<form action={addToCartAction}>
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
		const cart = await getCartById(cartId);
		if (cart.order) {
			return cart.order;
		}
	}
	const cart = await createCart();

	if (!cart.createOrder) {
		throw new Error("Failed to create cart");
	}

	return cart.createOrder;
}
function getCartById(cartId: string) {
	return executeGraphql(CartGetByIdDocument, { id: cartId });
}
function createCart() {
	return executeGraphql(CartCreateDocument, {});
}
// function addToCart(orderId: string, productId: any) {
// 	throw new Error("Function not implemented.");
// }

//4.2  - 14.14
