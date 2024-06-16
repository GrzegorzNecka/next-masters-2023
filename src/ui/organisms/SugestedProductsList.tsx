import { Typography } from "../atoms/Typography";
import { ProductList } from "./ProductList";
import { getProductList } from "@/api/products";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SugestedProductsList = async () => {
	const products = await getProductList();

	// await sleep(5000);

	return (
		<>
			<Typography className="mb-10 mt-4 text-xl font-semibold" isUppercase={true} as="h2">
				sugerowane
			</Typography>
			<ProductList products={products.slice(-4)} />;
		</>
	);
};
