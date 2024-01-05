import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

export const NavigationTop = () => {
	return (
		<nav>
			<ul className="flex justify-center gap-4 p-4">
				<li>
					<ActiveLink href={`/` as Route<"/">}>home</ActiveLink>
				</li>
				<li>
					<ActiveLink href={`/products`}>all</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
