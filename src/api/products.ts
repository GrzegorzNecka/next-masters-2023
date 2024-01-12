import { ProductGetListDocument, type TypedDocumentString } from "@/gql/graphql";
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

const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("env GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		throw TypeError(`GraphQL Error`, { cause: graphqlResponse.errors });
	}

	return graphqlResponse.data;
};

export const getProductList = async (): Promise<ProductItemType[]> => {
	const graphQlResponse = await executeGraphql(ProductGetListDocument, {});

	return graphQlResponse.products.map((p) => {
		return {
			id: p.id,
			category: p.categories[0]?.name || "",
			name: p.name,
			price: p.price,
			coverImage: p.images[0] && { alt: "", src: "" },
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
