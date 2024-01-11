import { type Metadata } from "next/types";
import { ProductList } from "@/ui/organisms/ProductList";

import { getProductList } from "@/api/products";
import { Pagination } from "@/ui/atoms/Pagination";

export const metadata: Metadata = {
	title: "produkty",
	description: "produkty opis",
};

// export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
export default async function ProductsPage() {
	const products = await getProductList();

	return (
		<>
			<header>
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
					<p>sklep</p>
				</h1>
			</header>
			<ProductList products={products} />

			<Pagination />
		</>
	);
}
