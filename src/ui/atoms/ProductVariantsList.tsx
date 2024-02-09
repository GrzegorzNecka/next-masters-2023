import { type Route } from "next";

import { ActiveLink } from "./ActiveLink";
import { getVariantProductByProductId } from "@/api/products";
import { type SearchParams } from "@/types";

type ProductVariantListProps = {
	searchParams: SearchParams;
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

	const variants = await getVariantProductByProductId(product.id);
	const url = `${host}/product/${product.slug}` as const;

	return (
		<ul className="flex flex-wrap gap-3">
			{Array.isArray(variants) &&
				variants.map((variant) => {
					return (
						<li key={variant.id}>
							<ActiveLink
								isActiveRule={variant.id === searchParams?.variant?.toString()}
								href={`${url}?variant=${variant.id}` as Route}
							>
								{variant.name}
							</ActiveLink>
						</li>
					);
				})}
		</ul>
	);
};
