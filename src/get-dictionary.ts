/* eslint-disable import/no-unresolved */
import "server-only";
import type { Locale } from "./i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
	en: () => import("./dictionaries/en.json").then((module) => module.default),
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
	pl: () => import("./dictionaries/pl.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
	dictionaries[locale]?.() ?? dictionaries.en();
