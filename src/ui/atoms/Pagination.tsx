import Link from "next/link";

import clsx from "clsx";
import { ActiveLink } from "./ActiveLink";
import { type AssetConnection } from "@/gql/graphql";
import { countPages } from "@/utils/product";
import { convertCountIntoArray } from "@/utils/common";

type PaginationProps = Omit<AssetConnection, "edges"> & {
	params: { category?: string; pageNumber: number };
};

export function Pagination({ pageInfo, aggregate, params }: PaginationProps) {
	const { hasNextPage, hasPreviousPage } = pageInfo;
	const pages = countPages(aggregate.count);
	const pageArray = convertCountIntoArray(pages.length);

	if (pages.length === 1) {
		return null;
	}

	return (
		<nav className="flesx- mt-20 flex w-full flex-row justify-center py-2">
			<ul className="flex flex-row items-center gap-3 ">
				<li>
					<Link
						className={clsx("pr-3", {
							"cursor-default text-slate-300": !hasPreviousPage,
						})}
						href={hasPreviousPage ? `/products/${params.category}/${params.pageNumber - 1}` : "#"}
					>
						prev
					</Link>
				</li>

				{pageArray.map((pageNumber) => (
					<li key={pageNumber}>
						<ActiveLink
							exact={true}
							className="px-2"
							href={`/products/${params.category}/${pageNumber}`}
						>
							{pageNumber}
						</ActiveLink>
					</li>
				))}

				<li>
					<Link
						className={clsx("pl-3", {
							"cursor-default text-slate-300 ": !hasNextPage,
						})}
						href={hasNextPage ? `/products/${params.category}/${params.pageNumber + 1}` : "#"}
					>
						next
					</Link>
				</li>
			</ul>
		</nav>
	);
}
