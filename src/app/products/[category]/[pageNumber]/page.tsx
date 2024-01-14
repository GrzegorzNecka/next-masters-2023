import { notFound } from "next/navigation";

import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";

export const generateStaticParams = async ({ params }: { params: { category: string } }) => {
	//tu powinienem zapytać api o page number categorie
	if (params.category === "shirts") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else if (params.category === "boots") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }];
	}
};

export default async function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	const products = await getProductsByCategorySlug(params.pageNumber);

	console.log(products);

	if (!products) {
		notFound();
	}

	return (
		<>
			<h1>Category: {params.category}</h1>
			<p>page: {params.pageNumber}</p>
			<ProductList products={products} />
		</>
	);
}

//https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
//https://relay.dev/docs/tutorial/connections-pagination/

//http://localhost:3000/products/shirts/1
