import { executeGraphql } from "./graphql";
import { ProductGetListDocument, ProductsGetByCategorySlugDocument } from "@/gql/graphql";
import { type ProductItemType } from "@/ui/types";

type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

export const getProductList = async (): Promise<ProductItemType[]> => {
	const graphQlResponse = await executeGraphql(ProductGetListDocument, {});

	return graphQlResponse.products.map((p) => {
		return {
			id: p.id,
			category: p.categories[0]?.name || "",
			name: p.name,
			price: p.price,
			coverImage: { alt: "", src: p.images[0]?.url || "" },
			description: p.description,
		};
	});
};

export const getProductsByCategorySlug = async (
	slug: string,
): Promise<ProductItemType[] | undefined> => {
	const data = await executeGraphql(ProductsGetByCategorySlugDocument, {
		slug: slug,
	});

	if (!data.categories[0]?.products) {
		return;
	}

	return data.categories[0]?.products?.map((p) => {
		return {
			id: p.id,
			category: p.categories[0]?.name || "",
			name: p.name,
			price: p.price,
			coverImage: { alt: "", src: p.images[0]?.url || "" },
			description: "",
		};
	});
};

// export const getProductList = async () => {
// 	const res = await fetch("https://naszsklep-api.vercel.app/api/products?take=20");
// 	const productsResponse = (await res.json()) as ProductResponseItem[];

// 	const products = productsResponse.map(productResponseItemToProductItemType);

// 	return products;
// };

export const getProductById = async (id: ProductResponseItem["id"]) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	const productResponse = (await res.json()) as ProductResponseItem;
	return productResponseItemToProductItemType(productResponse);
};

const productResponseItemToProductItemType = (product: ProductResponseItem): ProductItemType => ({
	category: product.category,
	id: product.id,
	name: product.title,
	description: product.description,
	coverImage: {
		alt: product.title,
		src: product.image,
	},
	price: product.price,
});
