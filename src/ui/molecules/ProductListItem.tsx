import { type UrlObject } from "url";
import Link from "next/link";

import { ProductListItemCoverImage } from "../atoms/ProductListItemCoverImage";
import { ProductListItemDescription } from "../atoms/ProductListItemDescription";
import { type ProductItemType } from "../types";

type ProductListItemProps = {
	product: ProductItemType;
};
//https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
export const ProductListItem = ({ product }: ProductListItemProps) => {
	const href: UrlObject = { pathname: `/product/${product.id}` };

	return (
		<li>
			<Link href={href}>
				<article className="cursor-pointer">
					<ProductListItemCoverImage coverImage={product.coverImage} />
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
