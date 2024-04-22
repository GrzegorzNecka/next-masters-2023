import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ActiveLink } from "../atoms/ActiveLink";
import { ProductSearchInput } from "../atoms/ProductSearchInput";
import { getCartByIdFromCookies } from "@/api/cart";

const navLinks = [
	{ href: "/" as const, label: "Home" },
	{ href: "/products" as const, label: "All" },
	{ href: "/products/t-shirts" as const, label: "T-shirts", exact: true },
	{ href: "/products/hoodies" as const, label: "Hoodies", exact: true },
	{ href: "/products/accessories" as const, label: "Accessories", exact: true },
	{ href: "/collections" as const, label: "Collections", exact: true },
	{ href: "/cart" as const, label: "Cart", exact: true },
];

export const NavBar = async () => {
	const cart = await getCartByIdFromCookies();

	const quantity = cart?.orderItems.length ?? 0;
	//!TODO - każdy orderItems ma swoje quantity - do poprawy jak one są dodawane i mergowane w koszyku, każdy item ma wiele elementów danego typu

	return (
		<nav>
			<div className="mx-auto flex max-w-screen-xl items-center justify-between">
				<ul className="flex items-center justify-center gap-4 p-4">
					{navLinks.map(({ href, label, exact }) => (
						<li key={href}>
							<ActiveLink exact={exact ? exact : false} href={href}>
								{label}
							</ActiveLink>
						</li>
					))}
					<li>
						<ProductSearchInput placeholder="wyszukaj produkt" />
					</li>
				</ul>

				<div className="flex items-center gap-2">
					<span className="ml-2 text-sm font-medium">{quantity}</span>
					<span className="sr-only">items in cart, view bag</span>
					<Link href="/cart">
						<ShoppingBag />
					</Link>
				</div>
			</div>
		</nav>
	);
};
