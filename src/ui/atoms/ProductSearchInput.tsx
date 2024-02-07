"use client";

import { useDebouncedCallback } from "use-debounce";
import { type Route } from "next";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const ProductSearchInput = ({ placeholder }: { placeholder: string }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set("search", term);
		} else {
			params.delete("search");
		}

		router.replace(`${pathname}?${params.toString()}` as Route);
	}, 500);

	if (pathname !== "/products") {
		return null;
	}

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
