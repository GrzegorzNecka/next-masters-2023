import clsx from "clsx";
import { type Route } from "next";
// import { redirect } from "next/navigation";
import { redirect } from "next/navigation";
import { ActiveLink } from "./ActiveLink";
import { getVariantProductByProductId } from "@/api/products";

type ProductVariantListProps = {
	searchParams: { [key: string]: string | string[] | undefined };
	product: {
		id: string;
		slug: string;
	};
};

export const ProductVariantsList = async ({ searchParams, product }: ProductVariantListProps) => {
	const host = process.env.NEXT_PUBLIC_HOST;

	if (typeof host !== "string") {
		throw new Error("NEXT_PUBLIC_HOST is required");
	}

	const searchParamVariant = searchParams?.variant;
	const variants = await getVariantProductByProductId(product.id);
	const productURL = `${host}/product/${product.slug}` as const;

	if (variants?.length && !searchParamVariant) {
		redirect(`${product.slug}?variant=${encodeURIComponent(`${variants.at(0)?.name}`)}`);
	}

	return (
		<ul>
			{Array.isArray(variants) &&
				variants.map((variant) => {
					return (
						<li key={variant.id}>
							<ActiveLink
								className={clsx("pr-3", {
									"cursor-default text-red-700": variant.name === searchParamVariant?.toString(),
								})}
								href={`${productURL}?variant=${encodeURIComponent(variant.name)}` as Route}
							>
								{variant.name}
							</ActiveLink>
						</li>
					);
				})}
		</ul>
	);
};
