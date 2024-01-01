import { Suspense } from "react";
import { type Metadata } from "next";
import { getProductById, getProductList } from "@/api/products";
import { ProductListItemCoverImage } from "@/ui/atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";

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
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// const product = await getProductById(params.productId);
	const referral = searchParams?.referral?.toString();
	const product = await getProductById(params.productId);

	return (
		<>
			<div>
				<h1>Single product page</h1>
				<article className="w-1/3 ">
					<ProductListItemCoverImage coverImage={product.coverImage} />
					<ProductListItemDescription product={product} />
				</article>

				{params.productId}
				<p>Referral: {referral}</p>
			</div>

			<aside>
				sugerowane
				<Suspense fallback={"ładownienie"}>
					<SugestedProductsList />
				</Suspense>
			</aside>
		</>
	);
}
