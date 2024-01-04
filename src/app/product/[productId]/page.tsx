import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById, getProductList } from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { Typography } from "@/ui/atoms/Typography";

import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleImage } from "@/ui/atoms/ProductSingleImage";

export async function generateStaticParams() {
	const products = await getProductList();
	return products.map((product) => ({
		productId: product.id,
	}));
}

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: `${product.name}`,
			description: product.description,
			images: [
				{
					url: product.coverImage.src,
				},
			],
		},
	};
};

export default async function SingleProductPage({
	params,
	// searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// const product = await getProductById(params.productId);
	// const referral = searchParams?.referral?.toString();
	const product = await getProductById(params.productId);

	return (
		<>
			<section className="flex gap-10">
				<ProductSingleImage coverImage={product.coverImage} />
				<ProductSingleDescription product={product} />
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
