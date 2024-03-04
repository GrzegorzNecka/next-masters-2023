import { executeGraphql } from "./graphql";
// import { throttleFetch } from "@/utils/common";
import { CollectionsGetListDocument, CollectionsGetSlugsDocument } from "@/gql/graphql";

export const getCollectionsSlugList = async () => {
	const graphQlResponse = await executeGraphql({
		query: CollectionsGetSlugsDocument,
	});

	// const graphQlResponse = await throttleFetch(async () => {
	// 	const graphQlResponse = await executeGraphql({
	// 		query: CollectionsGetSlugsDocument,
	// 	});
	// 	return graphQlResponse;
	// })();

	return graphQlResponse.collections;
};

export const getCollectionsList = async () => {
	const graphQlResponse = await executeGraphql({
		query: CollectionsGetListDocument,
	});

	// const graphQlResponse = await throttleFetch(async () => {
	// 	const graphQlResponse = await executeGraphql({
	// 		query: CollectionsGetListDocument,
	// 	});
	// 	return graphQlResponse;
	// })();

	return graphQlResponse.collections;
};
