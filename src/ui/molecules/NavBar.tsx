import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

// type NavLinks = {
// 	 href: Route<string> | UrlObjectWithNextRoute<string>;
// 	label: string;
// };

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/products", label: "All" },
	{ href: "/products/category/t-shirts", label: "T-shirts" },
	{ href: "/products/category/hoodies", label: "Hoodies" },
	{ href: "/products/category/accessories", label: "Accessories" },
];

export const NavBar = () => {
	//TODO: do naprawy -> href={link.href}
	return (
		<nav>
			<ul className="flex justify-center gap-4 p-4">
				{navLinks.map(({ href, label }) => (
					<li key={href}>
						<ActiveLink href={href as Route}>{label}</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
