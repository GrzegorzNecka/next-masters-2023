import { Suspense } from "react";
// import { type Metadata } from "next";
// import Link from "next/link";
import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
import { type Route } from "next";
import clsx from "clsx";
import {
	getProductBySlug,
	getProductsSlugList,
	getVariantProductByProductId,
} from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { Typography } from "@/ui/atoms/Typography";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
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
	const variantsFromDataBase = await getVariantProductByProductId(product.id);

	const productURL = `${process.env.NEXT_PUBLIC_HOST}/product/${product.slug}` as const;

	if (variantsFromDataBase?.length && !searchParams?.variant) {
		// revalidatePath(`/${product.slug}`);
		redirect(
			`${product.slug}?variant=${encodeURIComponent(`${variantsFromDataBase.at(0)?.name}`)}`,
		);
	}

	return (
		<>
			<p>
				{/* <pre>{JSON.stringify(searchParams, null, 2)}</pre>
				<pre>{JSON.stringify(typeof searchParams, null, 2)}</pre> */}
				{variantQueryParam && variantQueryParam}
			</p>
			<section className="flex gap-10">
				<ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
				<div>
					<ProductSingleDescription product={product} />
					<ul>
						{Array.isArray(variantsFromDataBase) &&
							variantsFromDataBase.map((variant) => {
								return (
									<li key={variant.id}>
										{process.env.NEXT_PUBLIC_HOST && (
											<ActiveLink
												className={clsx("pr-3", {
													"cursor-default text-red-700": variant.name === variantQueryParam,
												})}
												href={`${productURL}?variant=${encodeURIComponent(variant.name)}` as Route}
											>
												{variant.name}
											</ActiveLink>
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
