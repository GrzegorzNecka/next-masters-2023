import { Suspense } from "react";
// import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { type Route } from "next";
import {
	getProductBySlug,
	getProductsSlugList,
	getVariantProductByProductId,
} from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { Typography } from "@/ui/atoms/Typography";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";
// import {
// 	type ProductColorVariant,
// 	type ProductSizeColorVariant,
// 	type ProductSizeVariant,
// } from "@/gql/graphql";

export async function generateStaticParams() {
	const products = await getProductsSlugList();

	return products.map((product) => {
		return { productSlug: product.slug };
	});
}

// export const generateMetadata = async ({
// 	params,
// }: {
// 	params: { productSlug: string };
// }): Promise<Metadata> => {
// 	const product = await getProductBySlug(params.productSlug);
// 	console.log("🚀 ~ product:", product);

// 	return {
// 		title: product?.name || "",
// 		description: product?.description || "",
// 		openGraph: {
// 			title: `${product?.name}`,
// 			description: product?.description || "",
// 			images: product?.images || "",
// 		},
// 	};
// };

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

	const variantQueryParam = searchParams?.variant?.toString();
	const variants = await getVariantProductByProductId(product.id);

	if (variants?.length && !searchParams?.variant) {
		console.log(variants);
		console.log(variants?.length && !searchParams.variant);
		revalidatePath(`/${product.slug}`); // Update cached posts
		redirect(`${product.slug}?variant=${12}`); // Navigate to the new post page
	}
	// variants.map((v) => v.name)
	// const variant = product?.variants as VariantsType;
	// const color = searchParams?.color?.toString();

	return (
		<>
			<p>
				<pre>{JSON.stringify(searchParams, null, 2)}</pre>
				<pre>{JSON.stringify(typeof searchParams, null, 2)}</pre>
				{variantQueryParam && variantQueryParam}
			</p>
			<section className="flex gap-10">
				<ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
				<div>
					<ProductSingleDescription product={product} />
					<ul>
						{Array.isArray(variants) &&
							variants.map((variant) => {
								return (
									<li key={variant.id}>
										{process.env.NEXT_PUBLIC_HOST && (
											<Link
												href={
													`${process.env.NEXT_PUBLIC_HOST}/product/${
														product.slug
													}?variant=${variant.name.toLowerCase()}` as Route
												}
											>
												{variant.name}
											</Link>
										)}

										{/* {variant.name} */}
									</li>
								);
							})}
					</ul>
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
