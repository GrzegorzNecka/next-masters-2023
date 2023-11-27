export default async function BlogPage({ params }: { params: { date: string; slug: string } }) {
	return (
		<div>
			<h1>Blog page</h1>
			<p>
				Blog {params.date} / {params.slug}
			</p>
		</div>
	);
}
