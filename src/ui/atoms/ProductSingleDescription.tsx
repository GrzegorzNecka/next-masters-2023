import { Article } from "./Article";
import { Typography } from "./Typography";
import { type ProductVariantGetByIdQuery, type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/product";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
	isVariant?: boolean;
	variant: NonNullable<ProductVariantGetByIdQuery["product"]>["variants"][number];
};

export const ProductSingleDescription = ({
	product,
	isVariant,
	variant,
}: ProductListItemDescriptionProps) => {
	return (
		<>
			{isVariant ? (
				<Article className="mt-2 flex flex-col">
					<Typography as="p">
						<Typography as="span">Kategoria: </Typography>
						<Typography as="span">{product.categories.at(0)?.name}</Typography>
					</Typography>
					<Typography as="p">
						<Typography as="span">Cena: </Typography>
						<Typography as="span">
							{variant?.price ? formatMoney(variant.price / 100) : ""}
						</Typography>
					</Typography>
					<Typography as="p">
						<Typography as="span">Stan: </Typography>
						<Typography as="span">{variant?.total}</Typography>
					</Typography>
				</Article>
			) : (
				<Article className="mt-2 flex flex-col">
					<Typography as="p">
						<Typography as="span">Kategoria: </Typography>
						<Typography as="span">{product.categories.at(0)?.name}</Typography>
					</Typography>
					<Typography as="p">
						<Typography as="span">Cena: </Typography>
						<Typography as="span">{formatMoney(product.price / 100)}</Typography>
					</Typography>
				</Article>
			)}
		</>
	);
};
