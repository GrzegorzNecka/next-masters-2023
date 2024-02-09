import { type Metadata } from "next/types";

import { Suspense } from "react";
import { ProductList } from "@/ui/organisms/ProductList";

import { getProductList } from "@/api/products";

export const metadata: Metadata = {
	title: "produkty",
	description: "produkty opis",
};

export default async function ProductsPage() {
	const products = await getProductList();

	return (
		<>
			<header>
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
					<p>sklep</p>
				</h1>
			</header>
			<Suspense fallback={"ładownienie"}>
				<ProductList products={products} />
			</Suspense>
		</>
	);
}
