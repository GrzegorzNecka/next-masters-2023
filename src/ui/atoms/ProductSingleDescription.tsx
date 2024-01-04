import { type ProductItemType } from "../types";
import { Article } from "./Article";
import { Typography } from "./Typography";
import { formatMoney } from "@/utils/product";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductSingleDescription = ({
	product: { name, category, price },
}: ProductListItemDescriptionProps) => {
	return (
		<Article className="mt-2 flex flex-col">
			<Typography className="mb-4" isUppercase={true} as="h1">
				{name}
			</Typography>
			<Typography as="p">
				<Typography as="span">Kategoria: </Typography>
				<Typography as="span">{category}</Typography>
			</Typography>
			<Typography as="p">
				<Typography as="span">Cena: </Typography>
				<Typography as="span">{formatMoney(price / 100)}</Typography>
			</Typography>
		</Article>
	);
};
