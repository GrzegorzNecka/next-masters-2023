import { type Route } from "next";
import { redirect } from "next/navigation";
import { ActiveLink } from "./ActiveLink";
import type { ProductSingleGetBySlugQuery } from "@/gql/graphql";
import { type SearchParams } from "@/types";
import { isValidDefined, isValidNonEmptyArray } from "@/validator/methods";

type ProductVariantListProps = {
	variants: ProductSingleGetBySlugQuery["products"][0]["productVariantList"];
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

	const variant = variants.find((v) => v.id === searchParams?.variant?.toString());

	if (isValidNonEmptyArray(variant?.sizes) && !isValidDefined(searchParams?.size)) {
		// Redirect to the URL with the first size
		redirect(`${url}?variant=${variant?.id}&size=${variant?.sizes[0]?.id}`);
	}

	return (
		<article>
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

			{variant?.sizes && (
				<ul className="flex flex-wrap gap-3">
					{Array.isArray(variant?.sizes) &&
						variant.sizes.map((size) => {
							return (
								<li key={size.id}>
									<ActiveLink
										isActiveRule={size.id === searchParams?.size?.toString()}
										href={`${url}?variant=${variant.id}&size=${size.id}` as Route}
									>
										{size.size}
									</ActiveLink>
								</li>
							);
						})}
				</ul>
			)}
		</article>
	);
};
