import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsConnectionByCategorySlug } from "@/api/products";
import { getCategoriesAggregate } from "@/api/categories";
import { countPages } from "@/utils/product";
import { Pagination } from "@/ui/atoms/Pagination";
import { Typography } from "@/ui/atoms/Typography";

export const generateStaticParams = async ({ params }: { params: { category: string } }) => {
	const aggregateCount = await getCategoriesAggregate(params.category);
	return countPages(aggregateCount);
};

export default async function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	if (isNaN(Number(params.pageNumber)) || Number(params.pageNumber) <= 0) {
		notFound();
	}

	const currentPage = Number(params.pageNumber);

	const { edges, aggregate, pageInfo } = await getProductsConnectionByCategorySlug({
		currentPage: currentPage,
		slug: params.category,
	});

	const products = edges.map(({ node }) => node);

	if (!products.length) {
		notFound();
	}

	return (
		<>
			<div className="min-h-[500px]">
				<Typography className="pb-10" as="h1">
					Category: {params.category}
				</Typography>

				<ProductList products={products} />
			</div>

			<Pagination
				pageInfo={pageInfo}
				aggregate={aggregate}
				params={{ ...params, pageNumber: currentPage }}
			/>
		</>
	);
}
