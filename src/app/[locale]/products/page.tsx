import { getScopedI18n } from "@dictionaries/serwer";
import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "tkanina",
		name: "Maya",
		price: 12000,
		coverImage: {
			alt: "tkanina",
			src: "/images/product_1.jpg",
		},
	},
	{
		id: "2",
		category: "tkanina",
		name: "El Fuego",
		price: 9900,
		coverImage: {
			alt: "tkanina",
			src: "/images/product_2.jpg",
		},
	},
	{
		id: "3",
		category: "tkanina",
		name: "Pacyfik",
		price: 10000,
		coverImage: {
			alt: "tkanina",
			src: "/images/product_3.jpg",
		},
	},
	{
		id: "4",
		category: "tkanina",
		name: "La Noche",
		price: 20000,
		coverImage: {
			alt: "tkanina",
			src: "/images/product_4.jpg",
		},
	},
];

// export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
export default async function ProductsPage() {
	const t = await getScopedI18n("Home");
	// const scopedT = await getScopedI18n("hello");

	return (
		<>
			<header>
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
					<p>{t("header")}</p>
				</h1>
			</header>
			<ProductList products={products} />
		</>
	);
}
