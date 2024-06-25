import { type Route } from "next";

import { ActiveLink } from "./ActiveLink";
import { type ProductVariantGetByIdQuery } from "@/gql/graphql";
import { type SearchParams } from "@/types";

type ProductVariantListProps = {
	variants: NonNullable<ProductVariantGetByIdQuery["product"]>["variants"] | undefined;
	searchParams: SearchParams;
	url: string;
};

export const ProductVariantsList = async ({
	variants,
	url,
	searchParams,
}: ProductVariantListProps) => {
	if (!variants) {
		return;
	}

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
