export const generateStaticParams = async ({ params }: { params: { category: string } }) => {
	if (params.category === "shirts") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	}

	return [];
};

export default function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	return (
		<>
			<h1>Category: {params.category}</h1>
			<p>page: {params.pageNumber}</p>
		</>
	);
}
