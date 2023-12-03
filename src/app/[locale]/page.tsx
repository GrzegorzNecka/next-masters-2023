import { getScopedI18n } from "@dictionaries/serwer";

// export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
export default async function HomePAge() {
	const t = await getScopedI18n("Home");
	// const scopedT = await getScopedI18n("hello");

	return (
		<>
			<header>
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
					<p>{t("header")}</p>
				</h1>
			</header>
		</>
	);
}
