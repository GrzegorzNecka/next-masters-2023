import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import { type ProductItemType } from "../types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<article className="cursor-pointer">
				<ProductListItemCoverImage coverImage={product.coverImage} />
				<ProductListItemDescription product={product} />
			</article>
		</li>
	);
};
