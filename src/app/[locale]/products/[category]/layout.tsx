export async function generateStaticParams() {
	return [
		{ category: "shirts" },
		{ category: "boots" },
		{ category: "pants" },
		{ category: "shoes" },
		{ category: "jackets" },
	];
}

export default function CategoryProductLAyout({ children }: { children: React.ReactNode }) {
	return children;
}
