import pThrottle from "p-throttle";

export const convertCountIntoArray = (count: number): number[] => {
	return Array.from(Array(count).keys()).map((i) => i + 1);
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const throttleFetch = pThrottle({ limit: 5, interval: 1000 });
