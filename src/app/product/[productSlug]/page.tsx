import { Suspense } from "react";

import { revalidateTag } from "next/cache";
import {
    createReviewByProductId,
    getProductBySlug,
    getProductsSlugList,
    publishReviewById,
} from "@/api/products";
import { SugestedProductsList } from "@/ui/organisms/SugestedProductsList";
import { ProductSingleDescription } from "@/ui/atoms/ProductSingleDescription";
import { ProductSingleCoverImage } from "@/ui/atoms/ProductSingleCoverImage";
// import { ProductVariantsList } from "@/ui/atoms/ProductVariantsList";

import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import { getOrCreateCart, addProductToCart } from "@/api/cart";
import { ReviewList } from "@/ui/molecules/ReviewList";


// import { sleep } from "@/utils/common";

export async function generateMetadata({ params }: { params: { productSlug: string } }) {
    const product = await getProductBySlug(params.productSlug);

    return {
        title: product?.name,
        description: product?.description,
        openGraph: {
            title: product?.name,
            description: product?.description,
        },
    };
}

export async function generateStaticParams() {
    const products = await getProductsSlugList();

    return products.map((product) => {
        return { productSlug: product.slug };
    });
}

export default async function SingleProductPage({
    params,
    // searchParams,
}: {
    params: { productSlug: string };
    // searchParams: { [key: string]: string | string[] | undefined };
}) {
    const product = await getProductBySlug(params.productSlug);

    if (!product) {
        return <p>produkt chwilowo niedostępny</p>;
    }

    async function addProductToCartAction() {
        "use server";

        if (!product?.id) {
            return;
        }

        const cart = await getOrCreateCart();

        //todo - dodaj + i -

        await addProductToCart({
            orderId: cart.id,
            productId: product.id,
            quantity: 1,
        });
        // await sleep(1000);

        revalidateTag("cart");
    }

    async function addReviewAction(formData: FormData) {
        "use server";
		
        const {
            productId,
            name,
            email,
            headline,
            content,
            rating
        } = Object.fromEntries(formData.entries());

		
        if (
			typeof productId !== "string" ||
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof headline !== "string" ||
			typeof content !== "string" ||
			!Number.isInteger(Number(rating))
        ) {
            console.error("Invalid form data");
            return;
        }

        const reviewId = await createReviewByProductId({
            productId,
            name,
            email,
            content,
            rating: Number(rating),
            headline,
        });

        console.log("reviewId", reviewId);
		
        if (!reviewId) {
            console.error("Invalid review id");
            return;
        }

        const review = await publishReviewById({ id: reviewId });

        console.log("review", review);
    }

    return (
        <>
            <section className="flex gap-10">
                <ProductSingleCoverImage image={product.images.at(0)} alt={product.name} />
                <div>
                    <ProductSingleDescription product={product} />
                    {/* <ProductVariantsList searchParams={searchParams} product={product} /> */}
                    <p className="ml-1 text-sm font-semibold text-slate-500">in stock</p>
                    <form action={addProductToCartAction}>
                        <input type="hidden" name="productId" value={product.id} />
                        <AddToCartButton />
                    </form>
                </div>
            </section>

            <section>
                <hr className="my-10" />
                <Suspense fallback={"ładownienie"}>
                    <ReviewList productId={product.id} />
                </Suspense>
                <form action={addReviewAction}>
                    <input type="hidden" name="productId" value={product.id} required />
                    <input type="text" name="name" placeholder="imię" required />
                    <input type="email" name="email" placeholder="email" required />
                    <input type="text" name="headline" placeholder="tytuł" required />
                    <input type="text" name="content" placeholder="treść" required />
                    <input type="number" name="rating" placeholder="ocena" min="1" max="5" required />
                    <button
                        className="rounded-sm border bg-slate-100 px-6 py-2 shadow-sm disabled:cursor-wait disabled:bg-slate-800"
                        type="submit"
                    >
                        Dodaj do recenzję
                    </button>
                </form>
            </section>

            <aside>
                <hr className="my-10" />

                <Suspense fallback={"ładownienie"}>
                    <SugestedProductsList />
                </Suspense>
            </aside>
        </>
    );
}

