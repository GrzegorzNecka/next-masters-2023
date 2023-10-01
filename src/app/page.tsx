import { ProductList } from "@/ui/organisms/ProductList";
import { type ProductItemType } from "@/ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "buty",
		name: "adidasy",
		price: 123,
		coverImage: {
			alt: "buty",
			src: "./product_1.png",
		},
	},
	{
		id: "2",
		category: "buty",
		name: "ecco",
		price: 124,
		coverImage: {
			alt: "buty",
			src: "./product_2.png",
		},
	},
	{
		id: "3",
		category: "buty",
		name: "camper",
		price: 143,
		coverImage: {
			alt: "buty",
			src: "./product_1.png",
		},
	},
];

export default function Home() {
	return (
		<section className="p12 sm:py mx-auto max-w-md sm:max-w-2xl ">
			<ProductList products={products} />
		</section>
	);
}
