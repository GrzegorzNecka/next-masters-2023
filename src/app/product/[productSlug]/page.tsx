import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductBySlug, getProductsSlugList } from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { Typography } from "@/ui/neutrons/Typography";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";

export async function generateStaticParams() {
	const products = await getProductsSlugList();

	return products.map((product) => {
		return { productSlug: product.slug };
	});
}

export const generateMetadata = async ({
	params,
}: {
	params: { productSlug: string };
}): Promise<Metadata> => {
	const product = await getProductBySlug(params.productSlug);

	return {
		title: product?.name,
		description: product?.description,
		openGraph: {
			title: `${product?.name}`,
			description: product?.description,
			images: product?.images,
		},
	};
};

export default async function SingleProductPage({
	params,
	// searchParams,
}: {
	params: { productSlug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	//  const product = await getProductById(params.productId);
	// const referral = searchParams?.referral?.toString();
	const product = await getProductBySlug(params.productSlug);

	if (!product) {
		return <p>produkt chwilowo niedostępny</p>;
	}

	return (
		<>
			<section className="flex gap-10">
				<ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
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
