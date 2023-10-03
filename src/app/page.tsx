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
			src: "/product_1.jpg",
		},
	},
	{
		id: "2",
		category: "tkanina",
		name: "El Fuego",
		price: 9900,
		coverImage: {
			alt: "tkanina",
			src: "/product_2.jpg",
		},
	},
	{
		id: "3",
		category: "tkanina",
		name: "Pacyfik",
		price: 10000,
		coverImage: {
			alt: "tkanina",
			src: "/product_3.jpg",
		},
	},
	{
		id: "4",
		category: "tkanina",
		name: "La Noche",
		price: 20000,
		coverImage: {
			alt: "tkanina",
			src: "/product_4.jpg",
		},
	},
];

export default function Home() {
	return (
		<section className="sm :max-w-6xl mx-auto max-w-md p-12 sm:max-w-7xl ">
			<ProductList products={products} />
		</section>
	);
}
