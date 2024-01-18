import { executeGraphql } from "./graphql";
import { PRODUCTS_PER_PAGE } from "@/globalConsts";
import {
	ProductGetListDocument,
	ProductsConnectionGetByCategorySlugDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetSlugsDocument,
	ProductSingleGetBySlugDocument,
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

export const getProductsConnectionByCategorySlug = async ({
	slug,
	currentPage,
}: {
	slug: string;
	currentPage: string;
}) => {
	if (isNaN(Number(currentPage))) {
		throw TypeError("currentPage should be able to convert to a number type");
	}

	const graphQlResponse = await executeGraphql(ProductsConnectionGetByCategorySlugDocument, {
		slug: slug,
		perPage: PRODUCTS_PER_PAGE,
		skipPages: (Number(currentPage) - 1) * PRODUCTS_PER_PAGE,
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
