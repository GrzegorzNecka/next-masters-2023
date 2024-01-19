import { PRODUCTS_PER_PAGE } from "@/globalConsts";

const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(amount);
};

type PageNumbers = { pageNumber: string }[];

const countPages = (totalProducts: number): PageNumbers => {
	const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
	const pageNumbers: PageNumbers = [];

	for (let number = 1; number <= totalPages; number++) {
		pageNumbers.push({ pageNumber: number.toString() });
	}

	return pageNumbers;
};

export { formatMoney, countPages };
