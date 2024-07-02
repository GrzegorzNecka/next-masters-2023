import { Article } from "./Article";
import { Typography } from "./Typography";
import { type ProductSingleGetBySlugQuery, type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/product";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
	isVariant?: boolean;
	variant?: ProductSingleGetBySlugQuery["products"][0]["productVariants"][number];
};

export const ProductSingleDescription = ({
	product,
	isVariant = false,
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
						{/* <Typography as="span">{variant?.sizes.at(0)?.total}</Typography> */}
					</Typography>

					{/* <p>size: {variant?.productType?.size}</p> */}
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
