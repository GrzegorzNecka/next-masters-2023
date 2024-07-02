import { type Route } from "next";

import { ActiveLink } from "./ActiveLink";
import type { ProductSingleGetBySlugQuery } from "@/gql/graphql";
import { type SearchParams } from "@/types";
import { isValidDefined, isValidString } from "@/validator/methods";

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

	const groupedByColor = variants.reduce(
		(acc, variant) => {
			const color = variant.productType?.color;
			if (!color) return acc;

			return {
				...acc,
				[color]: [...(acc[color] || []), variant],
			};
		},
		{} as Record<string, typeof variants>,
	);

	const searchParamColor = Array.isArray(searchParams.color)
		? searchParams.color[0]
		: searchParams.color;

	return (
		<>
			<nav>
				<ul className="flex flex-wrap gap-3">
					{Object.keys(groupedByColor).map((color) => (
						<>
							{/* {JSON.stringify(groupedByColor[color])} */}

							<li key={color}>
								<ActiveLink
									isActiveRule={color === searchParams?.color}
									href={`${url}?color=${color}` as Route}
								>
									{color}
								</ActiveLink>
							</li>
						</>
					))}

					{/* {groupedByColor &&
						groupedByColor.map((variant) => {
							{
								JSON.stringify(variant);
							}
						})} */}
				</ul>

				{isValidString(searchParams.color) &&
					isValidDefined(groupedByColor[`${searchParamColor}`]) && (
						<ul className="flex flex-wrap gap-3">
							{groupedByColor[`${searchParamColor}`]?.map((variant) => (
								<li key={variant.id}>
									<ActiveLink
										isActiveRule={variant.id === searchParams?.variant?.toString()}
										href={`${url}?color=${searchParamColor}&variant=${variant.id}` as Route}
									>
										{variant.productType?.size ?? "brak zdefiniowanego rozmiaru"}
									</ActiveLink>
								</li>
							))}
						</ul>
					)}
			</nav>
		</>
	);
};
