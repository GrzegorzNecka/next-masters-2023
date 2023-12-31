import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NavigationTop } from "@/ui/molecules/NavigationTop";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sklep",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { lang: string };
}) {
	return (
		<html lang={params.lang}>
			<body className={inter.className}>
				<NavigationTop />
				<section className="sm :max-w-6xl mx-auto max-w-md p-12 sm:max-w-7xl ">{children}</section>

				<footer>
					<p className="text-center text-sm text-gray-500">© {new Date().getFullYear()} Sklep</p>
				</footer>
			</body>
		</html>
	);
}
