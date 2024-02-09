"use client";

import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const ProductSearchInput = ({ placeholder }: { placeholder: string }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const searchPagePathname = "/search";

	const handleSearch = useDebouncedCallback((input: string) => {
		const params = new URLSearchParams(searchParams);

		if (input) {
			params.set("query", input);
		} else {
			params.delete("query");
		}

		const query = `query=${params.get("query")}`;

		if (pathname === searchPagePathname) {
			router.replace(`${pathname}?${query}`);
		} else {
			router.push(`${searchPagePathname}?${query}`);
		}
	}, 500);

	return (
		<div className="relative flex flex-1 flex-shrink-0">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
			/>
		</div>
	);
};
