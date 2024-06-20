import { executeGraphql } from "./graphql";

import { CollectionsGetListDocument, CollectionsGetSlugsDocument } from "@/gql/graphql";

export const getCollectionsSlugList = async () => {
	const graphQlResponse = await executeGraphql({
		query: CollectionsGetSlugsDocument,
	});

	return graphQlResponse.collections;
};

export const getCollectionsList = async () => {
	const graphQlResponse = await executeGraphql({
		query: CollectionsGetListDocument,
	});

	return graphQlResponse.collections;
};
