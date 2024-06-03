// import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 10;
export const fetchCache = "force-cache";

export async function GET(_request: Request): Promise<Response> {
	// return NextResponse.json("Joł Joł");
	return new Response(JSON.stringify("Hello World"), {
		headers: { "content-type": "application/json" },
		status: 200,
	});
}
