"use client";

export default function ErrorPage({
	error,
}: {
	error: Error & { digest: string };
	reset: () => void;
}) {
	return <div> ERROR {error.digest}</div>;
}
