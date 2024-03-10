import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function cartSuccessPage({
	searchParams,
}: {
	searchParams: { session_id?: string };
}) {
	if (!searchParams.session_id) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);

	return (
		<>
			<div>Session ID: {session.id}</div>
			<div>Payment Status: {session.payment_status}</div>
		</>
	);
}
