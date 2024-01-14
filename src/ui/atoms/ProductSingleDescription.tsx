import { Article } from "../neutrons/Article";
import { Typography } from "../neutrons/Typography";
import { type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/product";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductSingleDescription = ({
	product: { name, categories, price },
}: ProductListItemDescriptionProps) => {
	return (
		<Article className="mt-2 flex flex-col">
			<Typography className="mb-4" isUppercase={true} as="h1">
				{name}
			</Typography>
			<Typography as="p">
				<Typography as="span">Kategoria: </Typography>
				<Typography as="span">{categories.at(0)?.name}</Typography>
			</Typography>
			<Typography as="p">
				<Typography as="span">Cena: </Typography>
				<Typography as="span">{formatMoney(price / 100)}</Typography>
			</Typography>
		</Article>
	);
};
