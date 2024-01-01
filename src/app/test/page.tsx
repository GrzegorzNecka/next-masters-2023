import Link from "next/link";
import { ProductCounter } from "@/ui/atoms/ProductCounter";

export default async function Page() {
	return (
		<div>
			<Link href={{ pathname: "/" }} className="hover:underline">
				przejdź do strony głównej
			</Link>
			<ProductCounter> {"children"}</ProductCounter>
		</div>
	);
}

// 14:59
