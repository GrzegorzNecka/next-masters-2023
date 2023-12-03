// locales/client.ts
"use client";
import { createI18nClient } from "next-international/client";

const dictionaries = {
	en: () => import("./en"),
	pl: () => import("./pl"),
};

export const dictionariesName = Object.keys(dictionaries);

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient(dictionaries);
