export const convertCountIntoArray = (count: number): number[] => {
	return Array.from(Array(count).keys()).map((i) => i + 1);
};
