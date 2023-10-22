import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest } from "next/server";
import { i18n } from "./i18n-config";

export function middleware(request: NextRequest) {
	const I18nMiddleware = createI18nMiddleware({
		locales: i18n.locales,
		defaultLocale: i18n.defaultLocale,
	});

	return I18nMiddleware(request);
}

export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
