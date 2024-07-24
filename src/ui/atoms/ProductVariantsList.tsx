import { type Route } from "next";

import { ActiveLink } from "./ActiveLink";
import type { ProductSingleGetBySlugQuery } from "@/gql/graphql";
import { type SearchParams } from "@/types";

type ProductVariantListProps = {
	variants: ProductSingleGetBySlugQuery["products"][0]["productVariants"];
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
		<>
			<nav>
				<ul className="flex flex-wrap gap-3">
					{variants.map((variant) => (
						<li key={variant.id}>
							<ActiveLink
								isActiveRule={variant.id === searchParams?.variant}
								href={`${url}?variant=${variant.id}` as Route}
							>
								{variant.name}
							</ActiveLink>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};
