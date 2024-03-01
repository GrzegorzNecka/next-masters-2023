import { ActiveLink } from "../atoms/ActiveLink";
import { ProductSearchInput } from "../atoms/ProductSearchInput";

const navLinks = [
	{ href: "/" as const, label: "Home" },
	{ href: "/products" as const, label: "All" },
	{ href: "/products/t-shirts" as const, label: "T-shirts", exact: true },
	{ href: "/products/hoodies" as const, label: "Hoodies", exact: true },
	{ href: "/products/accessories" as const, label: "Accessories", exact: true },
	{ href: "/collections" as const, label: "Collections", exact: true },
	{ href: "/cart" as const, label: "Cart", exact: true },
];

export const NavBar = () => {
	return (
		<nav>
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
		</nav>
	);
};
