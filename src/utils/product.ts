import { PRODUCTS_PER_PAGE } from "@/globalConsts";

const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(amount);
};
type PageNumbers = { pageNumber: string }[];

const countPages = (totalProducts: number): PageNumbers => {
	const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

	const pageNumbers: PageNumbers = [];

	let number = 1;

	while (number <= totalPages) {
		pageNumbers.push({ pageNumber: number.toString() });
		number++;
	}

	return pageNumbers;
};

export { formatMoney, countPages };
