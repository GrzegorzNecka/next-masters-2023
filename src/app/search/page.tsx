import { type Metadata } from "next/types";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";

import { searchProductsByName } from "@/api/products";
import { type SearchParams } from "@/types";

export const metadata: Metadata = {
	title: "produkty",
	description: "produkty opis",
};

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
	if (!searchParams?.query) {
		notFound();
	}

	const query = `${searchParams.query.toString()}`;
	const products = await searchProductsByName(query);

	if (!products.length) {
		return <p>Nothing found</p>;
	}

	return (
		<>
			<p>Search results for: {query}</p>
			<Suspense fallback={"ładownienie"}>
				<ProductList products={products} />
			</Suspense>
		</>
	);
}
