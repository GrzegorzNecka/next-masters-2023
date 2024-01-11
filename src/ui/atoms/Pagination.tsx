"use client";

import { useSearchParams } from "next/navigation";

export function Pagination() {
	const searchParams = useSearchParams();

	const search = searchParams.get("search");

	// URL -> `/dashboard?search=my-project`
	// `search` -> 'my-project'
	return <>Search: {search}</>;
}
// take=20&offset=

//https://lms.hyperfunctor.com/courses/next13masters/next13-zadania-2
//https://relay.dev/docs/tutorial/connections-pagination/
//https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#adding-pagination
// /https://nextjs.org/docs/app/api-reference/functions/use-search-params
