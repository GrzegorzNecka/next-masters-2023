import { getCategoriesSlugList } from "@/api/categories";

export async function generateStaticParams() {
	const categories = await getCategoriesSlugList();

	return categories.map((category) => {
		return { category: category.slug };
	});
}

export default function CategoryProductLAyout({ children }: { children: React.ReactNode }) {
	return children;
}
