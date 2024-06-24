import { Suspense } from "react";

import { revalidateTag } from "next/cache";
import { getProductBySlug, getProductsSlugList } from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";
// import { ProductVariantsList } from "@/ui/atoms/ProductVariantsList";

import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import { getOrCreateCart, addProductToCart } from "@/api/cart";

import { Reviews } from "@/ui/molecules/Reviews";
// import { ReviewList } from "@/ui/molecules/ReviewList";

// import { sleep } from "@/utils/common";

export async function generateMetadata({ params }: { params: { productSlug: string } }) {
	const product = await getProductBySlug(params.productSlug);

	return {
		title: product?.name,
		description: product?.description,
		openGraph: {
			title: product?.name,
			description: product?.description,
		},
	};
}

export async function generateStaticParams() {
	const products = await getProductsSlugList();

	return products.map((product) => {
		return { productSlug: product.slug };
	});
}

export default async function SingleProductPage({
	params,
	// searchParams,
}: {
	params: { productSlug: string };
	// searchParams: { [key: string]: string | string[] | undefined };
}) {
	const product = await getProductBySlug(params.productSlug);

	if (!product) {
		return <p>produkt chwilowo niedostępny</p>;
	}

	async function addProductToCartAction(formData: FormData) {
		"use server";

		const quantity = formData.get("quantity") as string;
		if (!product?.id || !quantity) {
			return;
		}

		const cart = await getOrCreateCart();

		//todo - dodaj + i -

		await addProductToCart({
			orderId: cart.id,
			productId: product.id,
			quantity: parseInt(quantity),
		});
		// await sleep(1000);

		revalidateTag("cart");
	}

	return (
		<>
			<section className="flex gap-10">
				<ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
				<div>
					<ProductSingleDescription product={product} />
					{/* <ProductVariantsList searchParams={searchParams} product={product} /> */}
					<p className="ml-1 text-sm font-semibold text-slate-500">in stock - zostało ... </p>
					<form action={addProductToCartAction}>
						<input type="hidden" name="productId" value={product.id} />
						<input type="number" name="quantity" min={1} max={10} />
						<AddToCartButton />
					</form>
				</div>
			</section>

			<section>
				<hr className="my-10" />
				<Reviews productId={product.id} />
			</section>

			<aside>
				<hr className="my-10" />

				<Suspense fallback={"ładownienie"}>
					<SugestedProductsList />
				</Suspense>
			</aside>
		</>
	);
}
