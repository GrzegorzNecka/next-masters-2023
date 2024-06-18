import { executeGraphql } from "./graphql";
import { PRODUCTS_PER_PAGE } from "@/globalConsts";
import {
	PorductListGetAggregateDocument,
	ProductGetListDocument,
	ProductsConnectionGetByCategorySlugDocument,
	ProductsConnectionGetListDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetSlugsDocument,
	ProductSingleGetBySlugDocument,
	ProductsSearchByNameDocument,
	ProductVariantGetByIdDocument,
	ReviewCreateByProductIdDocument,
	type ReviewCreateByProductIdMutationVariables,
	ReviewsGetByProductIdDocument,
	ReviewPublishByIdDocument,
	type ReviewPublishByIdMutationVariables,
} from "@/gql/graphql";

export const getProductList = async () => {
	const graphQlResponse = await executeGraphql({
		query: ProductGetListDocument,
		next: { revalidate: 15 },
	});

	return graphQlResponse.products;
};

export const getProductsByCategorySlug = async (slug: string) => {
	const graphQlResponse = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug: slug,
		},
	});
	return graphQlResponse.categories.at(0)?.products;
};

export const getProductsByCollectionSlug = async (slug: string) => {
	const graphQlResponse = await executeGraphql({
		query: ProductsGetByCollectionSlugDocument,
		variables: {
			slug: slug,
		},
	});
	return {
		collectionName: graphQlResponse.collections.at(0)?.name,
		products: graphQlResponse.collections.at(0)?.products,
	};
};

export const getProductsConnectionByCategorySlug = async ({
	slug,
	currentPage,
}: {
	slug: string;
	currentPage: number;
}) => {
	const graphQlResponse = await executeGraphql({
		query: ProductsConnectionGetByCategorySlugDocument,
		variables: {
			slug: slug,
			perPage: PRODUCTS_PER_PAGE,
			skipPages: (currentPage - 1) * PRODUCTS_PER_PAGE,
		},
	});

	return graphQlResponse.productsConnection;
};

export const getProductsConnectionList = async ({ currentPage }: { currentPage: number }) => {
	const graphQlResponse = await executeGraphql({
		query: ProductsConnectionGetListDocument,
		variables: {
			perPage: PRODUCTS_PER_PAGE,
			skipPages: (currentPage - 1) * PRODUCTS_PER_PAGE,
		},
	});

	return graphQlResponse.productsConnection;
};

export const getProductsSlugList = async () => {
	const graphQlResponse = await executeGraphql({ query: ProductsGetSlugsDocument });

	return graphQlResponse.products;
};

export const getProductBySlug = async (slug: string) => {
	const graphQlResponse = await executeGraphql({
		query: ProductSingleGetBySlugDocument,
		variables: {
			slug: slug,
		},
		next: { revalidate: 1 },
	});

	return graphQlResponse.products.at(0);
};

export const searchProductsByName = async (name: string) => {
	const graphQlResponse = await executeGraphql({
		query: ProductsSearchByNameDocument,
		variables: {
			name: name,
		},
	});

	return graphQlResponse.products;
};

export const getVariantProductByProductId = async (id: string) => {
	const graphQlResponse = await executeGraphql({
		query: ProductVariantGetByIdDocument,
		variables: {
			id: id,
		},
		next: { revalidate: 1 },
	});

	return graphQlResponse.product?.variants;
};

export const getProductListAggregate = async () => {
	const graphQlResponse = await executeGraphql({
		query: PorductListGetAggregateDocument,
	});

	return graphQlResponse.productsConnection.aggregate.count;
};

export const getReviesByProductId = async (id: string) => {
	const graphQlResponse = await executeGraphql({
		query: ReviewsGetByProductIdDocument,
		variables: {
			productId: id,
		},
		next: { tags: [`review-product-id-${id}`] },
	});

	return graphQlResponse.product?.reviews;
};

export const createReviewByProductId = async ({
	productId,
	name,
	email,
	headline,
	content,
	rating,
}: ReviewCreateByProductIdMutationVariables) => {
	const graphQlResponse = await executeGraphql({
		query: ReviewCreateByProductIdDocument,
		variables: {
			productId,
			name,
			email,
			headline,
			content,
			rating,
		},
		authToken: process.env.HYGRAPH_MUTATION_TOKEN,
	});

	return graphQlResponse.createReview?.id;
};

export const publishReviewById = async ({ id }: ReviewPublishByIdMutationVariables) => {
	const graphQlResponse = await executeGraphql({
		query: ReviewPublishByIdDocument,
		variables: {
			id,
		},
		authToken: process.env.HYGRAPH_MUTATION_TOKEN,
	});

	return graphQlResponse.publishReview;
};
