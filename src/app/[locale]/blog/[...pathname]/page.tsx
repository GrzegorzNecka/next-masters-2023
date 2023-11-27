export default async function BlogPage({ params }: { params: { pathname: string[] } }) {
	const pathname = params.pathname?.join("/");

	return (
		<div>
			<h1>Blog page</h1>
			<p> pathname: {pathname}</p>
		</div>
	);
}
