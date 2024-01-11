import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "strona główna",
};

export default async function HomePage() {
	return (
		<>
			<header>
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
					<p>sklep</p>
				</h1>
			</header>
		</>
	);
}
