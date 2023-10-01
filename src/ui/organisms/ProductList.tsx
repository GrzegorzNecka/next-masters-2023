import { type ProductItemType } from "../types";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

export const ProductList = ({ products }: { products: ProductItemType[] }) => {
	return (
		<ul className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-2">
			{products.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
