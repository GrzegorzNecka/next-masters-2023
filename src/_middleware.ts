// // middleware.ts
// import { createI18nMiddleware } from "next-international/middleware";
// import { type NextRequest } from "next/server";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";
// import { i18n } from "./dictionaries/i18n-config";

// function getLocale(request: NextRequest): string | undefined {
// 	// Negotiator expects plain object so we need to transform headers
// 	const negotiatorHeaders: Record<string, string> = {};
// 	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

// 	const locales = i18n.locales;

// 	// Use negotiator and intl-localematcher to get best locale
// 	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
// 		locales as unknown as string[],
// 	);

// 	const locale = matchLocale(languages, locales, i18n.defaultLocale);

// 	return locale;
// }

// export function middleware(request: NextRequest) {
// 	const localeFromHeader = getLocale(request); // pl

// 	// Match local from header
// 	const localByHeader = i18n.locales.find((locale) => locale === localeFromHeader);

// 	const I18nMiddleware = createI18nMiddleware({
// 		locales: i18n.locales,
// 		defaultLocale: localByHeader ? localByHeader : i18n.defaultLocale,
// 	});

// 	return I18nMiddleware(request);
// }

// export const config = {
// 	matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
// };
