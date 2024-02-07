import { Suspense } from "react";

import { getProductBySlug, getProductsSlugList } from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { Typography } from "@/ui/atoms/Typography";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";
import { ProductVariantsList } from "@/ui/atoms/ProductVariantsList";

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

	return (
		<>
			<section className="flex gap-10">
				<ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
				<div>
					<ProductSingleDescription product={product} />
					<Suspense fallback={"ładownienie"}>
						<ProductVariantsList searchParams={searchParams} product={product} />
					</Suspense>
				</div>
			</section>

			<aside>
				<hr className="my-10" />
				<Typography className="mb-10 text-xl font-semibold" isUppercase={true} as="h2">
					sugerowane
				</Typography>

				<Suspense fallback={"ładownienie"}>
					<SugestedProductsList />
				</Suspense>
			</aside>
		</>
	);
}
