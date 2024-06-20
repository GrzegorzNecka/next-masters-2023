import { executeGraphql } from "./graphql";

import { CategoriesGetAggregateDocument, CategoriesGetSlugsDocument } from "@/gql/graphql";

export const getCategoriesSlugList = async () => {
	const graphQlResponse = await executeGraphql({
		query: CategoriesGetSlugsDocument,
	});

	return graphQlResponse.categories;
};

export const getCategoriesAggregate = async (slug: string) => {
	const graphQlResponse = await executeGraphql({
		query: CategoriesGetAggregateDocument,
		variables: { slug: slug },
	});

	return graphQlResponse.productsConnection.aggregate.count;
};
