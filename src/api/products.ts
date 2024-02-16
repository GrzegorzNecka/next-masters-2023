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
} from "@/gql/graphql";

export const getProductList = async () => {
	const graphQlResponse = await executeGraphql(ProductGetListDocument, {});

	return graphQlResponse.products;
};

export const getProductsByCategorySlug = async (slug: string) => {
	const graphQlResponse = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug: slug,
	});
	return graphQlResponse.categories.at(0)?.products;
};

export const getProductsByCollectionSlug = async (slug: string) => {
	const graphQlResponse = await executeGraphql(ProductsGetByCollectionSlugDocument, {
		slug: slug,
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
	const graphQlResponse = await executeGraphql(ProductsConnectionGetByCategorySlugDocument, {
		slug: slug,
		perPage: PRODUCTS_PER_PAGE,
		skipPages: (currentPage - 1) * PRODUCTS_PER_PAGE,
	});

	return graphQlResponse.productsConnection;
};

export const getProductsConnectionList = async ({ currentPage }: { currentPage: number }) => {
	const graphQlResponse = await executeGraphql(ProductsConnectionGetListDocument, {
		perPage: PRODUCTS_PER_PAGE,
		skipPages: (currentPage - 1) * PRODUCTS_PER_PAGE,
	});

	return graphQlResponse.productsConnection;
};

export const getProductsSlugList = async () => {
	const graphQlResponse = await executeGraphql(ProductsGetSlugsDocument, {});

	return graphQlResponse.products;
};

export const getProductBySlug = async (slug: string) => {
	const graphQlResponse = await executeGraphql(ProductSingleGetBySlugDocument, {
		slug: slug,
	});

	return graphQlResponse.products.at(0);
};

export const searchProductsByName = async (name: string) => {
	const graphQlResponse = await executeGraphql(ProductsSearchByNameDocument, {
		name: name,
	});

	return graphQlResponse.products;
};

export const getVariantProductByProductId = async (id: string) => {
	const graphQlResponse = await executeGraphql(ProductVariantGetByIdDocument, {
		id: id,
	});

	return graphQlResponse.product?.variants;
};

export const getProductListAggregate = async () => {
	const graphQlResponse = await executeGraphql(PorductListGetAggregateDocument, {});

	return graphQlResponse.productsConnection.aggregate.count;
};
