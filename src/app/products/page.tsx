import { type Metadata } from "next/types";
import { ProductList } from "@/ui/organisms/ProductList";

import { getProductList, searchProductsBySlug } from "@/api/products";
import { ProductSearchInput } from "@/ui/atoms/ProductSearchInput";

export const metadata: Metadata = {
	title: "produkty",
	description: "produkty opis",
};

// export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
export default async function ProductsPage() {
	const products = await getProductList();

	const searchProducts = await searchProductsBySlug("uni");

	return (
		<>
			<header>
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
					<p>sklep</p>
				</h1>
			</header>

			<ProductSearchInput placeholder="ss" />
			<pre>{JSON.stringify(searchProducts, null, 2)}</pre>
			<ProductList products={products} />
		</>
	);
}

//https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
