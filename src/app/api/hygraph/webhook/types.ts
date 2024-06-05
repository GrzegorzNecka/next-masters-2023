export type WebhookProductData = {
	operation: string;
	data: {
		__typename: "Product";
		categories: Array<{
			__typename: string;
			id: string;
		}>;
		collections: Array<unknown>;
		createdAt: string;
		createdBy: null;
		id: string;
		images: Array<{
			__typename: string;
			id: string;
		}>;
		localizations: Array<{
			description: string;
			locale: string;
			name: string;
			price: number;
			slug: string;
		}>;
		orderItems: Array<{
			__typename: string;
			id: string;
		}>;
		publishedAt: string;
		publishedBy: {
			__typename: string;
			id: string;
		};
		reviews: Array<{
			__typename: string;
			id: string;
		}>;
		scheduledIn: Array<unknown>;
		stage: string;
		updatedAt: string;
		updatedBy: {
			__typename: string;
			id: string;
		};
		variants: Array<{
			__typename: string;
			id: string;
		}>;
	};
};
