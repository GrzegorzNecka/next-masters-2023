import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
	title: "Sklep",
	description: "Generated by create next app",
};

export default function PageLayoutTest({ children }: { children: ReactNode }) {
	return (
		<div>
			Page layut test
			{children}
		</div>
	);
}
