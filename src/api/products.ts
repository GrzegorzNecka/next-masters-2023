import { executeGraphql } from "./graphql";
import {
	ProductGetListDocument,
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
