import { notFound } from "next/navigation";
import { getCollectionsSlugList } from "@/api/collections";
import { getProductsByCollectionSlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { Typography } from "@/ui/atoms/Typography";

export async function generateStaticParams() {
	const collections = await getCollectionsSlugList();

	return collections.map((collection) => {
		return { collectionSlug: collection.slug };
	});
}

export default async function CollectionPage({ params }: { params: { collectionSlug: string } }) {
	const { products, collectionName } = await getProductsByCollectionSlug(params.collectionSlug);

	if (!products) {
		notFound();
	}

	return (
		<>
			<Typography className="pb-4" as="h1">
				{collectionName}
			</Typography>
			<ProductList products={products} />
		</>
	);
}
