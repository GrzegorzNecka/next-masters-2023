import { type Metadata } from "next/types";

import { ProductList } from "@/ui/organisms/ProductList";

import { getProductList, searchProductsByName } from "@/api/products";

export const metadata: Metadata = {
	title: "produkty",
	description: "produkty opis",
};

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	let products = await getProductList();

	if (searchParams?.search) {
		products = await searchProductsByName(`${searchParams.search.toString()}`);
	}

	return (
		<>
			<header>
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
					<p>sklep</p>
				</h1>
			</header>

			<ProductList products={products} />
		</>
	);
}
