// import { notFound } from "next/navigation";

import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCategorySlug, getProductsConnectionByCategorySlug } from "@/api/products";
import { getCategoriesAggregate } from "@/api/categories";
import { countPages } from "@/utils/product";

export const generateStaticParams = async ({ params }: { params: { category: string } }) => {
	const totalProducts = await getCategoriesAggregate(params.category);
	return countPages(totalProducts);
};

export default async function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	const products = await getProductsByCategorySlug(params.category);

	const connections = await getProductsConnectionByCategorySlug({
		currentPage: params.pageNumber,
		slug: params.category,
	});

	// console.log(products);

	// if (!products) {
	// 	notFound();
	// }

	return (
		<>
			<h1>Category: {params.category}</h1>
			<p>page: {params.pageNumber}</p>
			<pre>{JSON.stringify(connections, null, 2)}</pre>
			{products && <ProductList products={products} />}
		</>
	);
}

//https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
//https://relay.dev/docs/tutorial/connections-pagination/

//http://localhost:3000/products/shirts/1
