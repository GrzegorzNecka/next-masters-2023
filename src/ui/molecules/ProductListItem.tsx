import Link from "next/link";

import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";

import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	const image = product.images?.at(0);

	if (!image) {
		return null;
	}

	return (
		<li>
			<Link href={{ pathname: `/product/${product.slug}` }}>
				<article className="cursor-pointer">
					<ProductListItemCoverImage image={image} alt="" />
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
