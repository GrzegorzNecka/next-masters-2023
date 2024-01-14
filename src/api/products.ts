import { executeGraphql } from "./graphql";
import {
	ProductGetListDocument,
	type ProductListItemFragment,
	ProductsGetByCategorySlugDocument,
} from "@/gql/graphql";

export const getProductList = async () => {
	const graphQlResponse = await executeGraphql(ProductGetListDocument, {});
	// ProductListItemFragment
	return graphQlResponse.products;
	// return graphQlResponse.products.map((p) => {
	// 	return {
	// 		id: p.id,
	// 		category: p.categories[0]?.name || "",
	// 		name: p.name,
	// 		price: p.price,
	// 		coverImage: { alt: "", src: p.images[0]?.url || "" },
	// 		description: "ff",
	// 	};
	// });
};

export const getProductsByCategorySlug = async (slug: string) => {
	const graphQlResponse = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug: slug,
	});
	return graphQlResponse.categories.at(0)?.products;
};

// export const getProductList = async () => {
// 	const res = await fetch("https://naszsklep-api.vercel.app/api/products?take=20");
// 	const productsResponse = (await res.json()) as ProductResponseItem[];

// 	const products = productsResponse.map(productResponseItemToProductItemType);

// 	return products;
// };

export const getProductById = async (_id: ProductListItemFragment["id"]) => {
	//TODO: graphQl

	throw new Error("Not implemented");
	// const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	// const productResponse = (await res.json()) as ProductResponseItem;
	// return productResponseItemToProductItemType(productResponse);
};
