import { type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/product";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { name, categories, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between">
			<h3 className="text-sm font-semibold text-gray-700">{name}</h3>
			{categories?.at(0) && (
				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria</span> {categories.at(0)?.name}
				</p>
			)}
			<p className="text-sm font-medium text-gray-900">
				<span className="sr-only">Cena:</span> {formatMoney(price / 100)}
			</p>
		</div>
	);
};
