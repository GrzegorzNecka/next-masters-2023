import { type ProductItemType } from "../types/types";
import { formatMoney } from "@/utils/product";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { name, category, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between">
			<h3 className="text-sm font-semibold text-gray-700">{name}</h3>
			<p className="text-sm text-gray-500">
				<span className="sr-only">Kategoria</span> {category}
			</p>
			<p className="text-sm font-medium text-gray-900">
				<span className="sr-only">Cena:</span> {formatMoney(price / 100)}
			</p>
		</div>
	);
};
