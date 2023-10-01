import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import { type ProductItemType } from "../types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<article>
				<ProductListItemCoverImage coverImage={product.coverImage} />
				<ProductListItemDescription product={product} />
			</article>
		</li>
	);
};
