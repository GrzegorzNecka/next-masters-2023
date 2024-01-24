import { ActiveLink } from "../atoms/ActiveLink";

const navLinks = [
	{ href: "/" as const, label: "Home" },
	{ href: "/products" as const, label: "All" },
	{ href: "/products/t-shirts" as const, label: "T-shirts", exact: true },
	{ href: "/products/hoodies" as const, label: "Hoodies", exact: true },
	{ href: "/products/accessories" as const, label: "Accessories", exact: true },
	{ href: "/collections" as const, label: "Collections", exact: true },
];

export const NavBar = () => {
	return (
		<nav>
			<ul className="flex justify-center gap-4 p-4">
				{navLinks.map(({ href, label, exact }) => (
					<li key={href}>
						<ActiveLink exact={exact ? exact : false} href={href}>
							{label}
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
