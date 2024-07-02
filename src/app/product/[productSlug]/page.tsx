import { Suspense } from "react";

import { revalidateTag } from "next/cache";

import {
	getProductBySlug,
	getProductsSlugList,
	// getVariantProductByProductId,
} from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
// import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";
import { ProductVariantsList } from "@/ui/atoms/ProductVariantsList";

import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import { getOrCreateCart, addProductToCart } from "@/api/cart";

import { Reviews } from "@/ui/molecules/Reviews";
import { Input } from "@/components/ui/input";
import { isValidDefined, isValidNonEmptyArray } from "@/validator/methods";
import { Typography } from "@/ui/atoms/Typography";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";

// import { type ProductVariants } from "@/gql/graphql";

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
	searchParams,
}: {
	params: { productSlug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const product = await getProductBySlug(params.productSlug);

	if (!product) {
		return <p>produkt chwilowo niedostępny</p>;
	}

	console.log(product);
	const host = process.env.NEXT_PUBLIC_HOST;

	if (typeof host !== "string") {
		throw new Error("NEXT_PUBLIC_HOST is required");
	}

	// const variants = await getVariantProductByProductId(product.id);

	async function addProductToCartAction(formData: FormData) {
		"use server";

		const quantity = formData.get("quantity") as string;
		if (!product?.id || !quantity) {
			return;
		}

		const cart = await getOrCreateCart();

		//todo - dodaj + i -
		//todo jeśl jest variant i query string  jest === product.variant to productid = varaint

		await addProductToCart({
			orderId: cart.id,
			productId: product.id,
			quantity: parseInt(quantity),
			variantId: searchParams?.variant?.toString() || undefined,
		});
		// await sleep(1000);

		revalidateTag("cart");
	}

	const variants = product.productVariants;
	const variant = variants?.find((variant) => variant.id === searchParams?.variant?.toString());

	return (
		<>
			<section className="flex gap-10">
				<ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
				<div>
					<Typography className="mb-4" isUppercase={true} as="h1">
						{product.name}
					</Typography>

					<ProductVariantsList
						searchParams={searchParams}
						variants={product.productVariants}
						url={`${host}/product/${product.slug}` as const}
					/>

					<ProductSingleDescription
						isVariant={Boolean(variants?.length)}
						product={product}
						variant={variant}
					/>

					<form action={addProductToCartAction}>
						<input type="hidden" name="productId" value={product.id} />
						<Input
							type="number"
							distances={"xs"}
							name="quantity"
							min={1}
							max={10}
							defaultValue="1"
						/>

						<AddToCartButton
							isDisable={isValidNonEmptyArray(variants) && !isValidDefined(searchParams?.variant)}
						/>
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
