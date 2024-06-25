/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddOrUpdateItem($orderId: ID!, $orderItemId: ID, $productId: ID!, $quantity: Int!, $total: Int!) {\n  upsertOrderItem(\n    where: {id: $orderItemId}\n    upsert: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}, update: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}}\n  ) {\n    id\n  }\n}": types.CartAddOrUpdateItemDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "query CartItemGetIdByProductId($orderId: ID!, $productId: ID!) {\n  order(where: {id: $orderId}, stage: DRAFT) {\n    orderItems(where: {product: {id: $productId}}, first: 1) {\n      id\n      quantity\n    }\n  }\n}": types.CartItemGetIdByProductIdDocument,
    "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    total\n    product {\n      id\n      name\n      price\n    }\n  }\n}": types.CartFragmentDoc,
    "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n    quantity\n  }\n}": types.CartSetProductQuantityDocument,
    "mutation CartUpsertItem($orderId: ID!, $total: Int!, $productId: ID!) {\n  upsertOrder(\n    where: {id: $orderId}\n    upsert: {create: {total: $total, orderItems: {create: {quantity: 1, total: 0, product: {connect: {id: $productId}}}}}, update: {total: $total, orderItems: {create: {quantity: 1, total: 0, product: {connect: {id: $productId}}}}}}\n  ) {\n    id\n    total\n    orderItems {\n      id\n    }\n  }\n}": types.CartUpsertItemDocument,
    "query CategoriesGetAggregate($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.CategoriesGetAggregateDocument,
    "query CategoriesGetSlugs {\n  categories(first: 4) {\n    id\n    slug\n  }\n}": types.CategoriesGetSlugsDocument,
    "query CollectionsGetList {\n  collections(first: 5) {\n    id\n    name\n    slug\n    description\n    image {\n      url\n      height\n      width\n    }\n  }\n}": types.CollectionsGetListDocument,
    "query CollectionsGetSlugs {\n  collections(first: 4) {\n    id\n    slug\n  }\n}": types.CollectionsGetSlugsDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    price\n  }\n}": types.ProductGetByIdDocument,
    "query PorductListGetAggregate {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.PorductListGetAggregateDocument,
    "fragment ProductListItem on Product {\n  id\n  slug\n  name\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}": types.ProductListItemFragmentDoc,
    "query ProductSingleGetBySlug($slug: String!) {\n  products(where: {slug: $slug}, first: 1) {\n    ...ProductListItem\n    description\n  }\n}": types.ProductSingleGetBySlugDocument,
    "query ProductVariantGetById($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductSizeColorVariant {\n        id\n        name\n        color\n        size\n        price\n        total\n      }\n      ... on ProductColorVariant {\n        id\n        name\n        color\n      }\n      ... on ProductSizeVariant {\n        id\n        name\n        size\n      }\n    }\n  }\n}": types.ProductVariantGetByIdDocument,
    "fragment ProductVariants on Product {\n  id\n  variants {\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n      product {\n        ...ProductListItem\n      }\n    }\n    ... on ProductColorVariant {\n      id\n      name\n      color\n      product {\n        ...ProductListItem\n      }\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n      product {\n        ...ProductListItem\n      }\n    }\n  }\n}": types.ProductVariantsFragmentDoc,
    "query ProductsConnectionGetByCategorySlug($perPage: Int!, $skipPages: Int!, $slug: String!) {\n  productsConnection(\n    where: {categories_some: {slug: $slug}}\n    first: $perPage\n    skip: $skipPages\n    orderBy: publishedAt_ASC\n  ) {\n    edges {\n      cursor\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsConnectionGetByCategorySlugDocument,
    "query ProductsConnectionGetList($perPage: Int!, $skipPages: Int!) {\n  productsConnection(first: $perPage, skip: $skipPages, orderBy: publishedAt_ASC) {\n    edges {\n      cursor\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsConnectionGetListDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 4) {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    name\n    products {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductGetList {\n  products(first: 10) {\n    ...ProductListItem\n  }\n}": types.ProductGetListDocument,
    "query ProductsGetSlugs {\n  products(first: 4) {\n    id\n    slug\n  }\n}": types.ProductsGetSlugsDocument,
    "query ProductsSearchByName($name: String!) {\n  products(where: {name_contains: $name}) {\n    ...ProductListItem\n  }\n}": types.ProductsSearchByNameDocument,
    "mutation ReviewCreateByProductId($productId: ID!, $name: String!, $email: String!, $headline: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {product: {connect: {id: $productId}}, name: $name, email: $email, headline: $headline, content: $content, rating: $rating}\n  ) {\n    id\n  }\n}": types.ReviewCreateByProductIdDocument,
    "fragment ReviewFragment on Review {\n  id\n  name\n  rating\n  content\n  email\n  headline\n}": types.ReviewFragmentFragmentDoc,
    "mutation ReviewPublishById($id: ID!) {\n  publishReview(where: {id: $id}) {\n    ...ReviewFragment\n  }\n}": types.ReviewPublishByIdDocument,
    "query ReviewsGetByProductId($productId: ID!) {\n  product(where: {id: $productId}) {\n    reviews {\n      ...ReviewFragment\n    }\n  }\n}": types.ReviewsGetByProductIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddOrUpdateItem($orderId: ID!, $orderItemId: ID, $productId: ID!, $quantity: Int!, $total: Int!) {\n  upsertOrderItem(\n    where: {id: $orderItemId}\n    upsert: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}, update: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddOrUpdateItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartItemGetIdByProductId($orderId: ID!, $productId: ID!) {\n  order(where: {id: $orderId}, stage: DRAFT) {\n    orderItems(where: {product: {id: $productId}}, first: 1) {\n      id\n      quantity\n    }\n  }\n}"): typeof import('./graphql').CartItemGetIdByProductIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    total\n    product {\n      id\n      name\n      price\n    }\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n    quantity\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartUpsertItem($orderId: ID!, $total: Int!, $productId: ID!) {\n  upsertOrder(\n    where: {id: $orderId}\n    upsert: {create: {total: $total, orderItems: {create: {quantity: 1, total: 0, product: {connect: {id: $productId}}}}}, update: {total: $total, orderItems: {create: {quantity: 1, total: 0, product: {connect: {id: $productId}}}}}}\n  ) {\n    id\n    total\n    orderItems {\n      id\n    }\n  }\n}"): typeof import('./graphql').CartUpsertItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetAggregate($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').CategoriesGetAggregateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetSlugs {\n  categories(first: 4) {\n    id\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetSlugsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections(first: 5) {\n    id\n    name\n    slug\n    description\n    image {\n      url\n      height\n      width\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetSlugs {\n  collections(first: 4) {\n    id\n    slug\n  }\n}"): typeof import('./graphql').CollectionsGetSlugsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    price\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PorductListGetAggregate {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').PorductListGetAggregateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  slug\n  name\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductSingleGetBySlug($slug: String!) {\n  products(where: {slug: $slug}, first: 1) {\n    ...ProductListItem\n    description\n  }\n}"): typeof import('./graphql').ProductSingleGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductVariantGetById($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductSizeColorVariant {\n        id\n        name\n        color\n        size\n        price\n        total\n      }\n      ... on ProductColorVariant {\n        id\n        name\n        color\n      }\n      ... on ProductSizeVariant {\n        id\n        name\n        size\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductVariantGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductVariants on Product {\n  id\n  variants {\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n      product {\n        ...ProductListItem\n      }\n    }\n    ... on ProductColorVariant {\n      id\n      name\n      color\n      product {\n        ...ProductListItem\n      }\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n      product {\n        ...ProductListItem\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductVariantsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsConnectionGetByCategorySlug($perPage: Int!, $skipPages: Int!, $slug: String!) {\n  productsConnection(\n    where: {categories_some: {slug: $slug}}\n    first: $perPage\n    skip: $skipPages\n    orderBy: publishedAt_ASC\n  ) {\n    edges {\n      cursor\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsConnectionGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsConnectionGetList($perPage: Int!, $skipPages: Int!) {\n  productsConnection(first: $perPage, skip: $skipPages, orderBy: publishedAt_ASC) {\n    edges {\n      cursor\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsConnectionGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 4) {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    name\n    products {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetList {\n  products(first: 10) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetSlugs {\n  products(first: 4) {\n    id\n    slug\n  }\n}"): typeof import('./graphql').ProductsGetSlugsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsSearchByName($name: String!) {\n  products(where: {name_contains: $name}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsSearchByNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreateByProductId($productId: ID!, $name: String!, $email: String!, $headline: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {product: {connect: {id: $productId}}, name: $name, email: $email, headline: $headline, content: $content, rating: $rating}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewCreateByProductIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ReviewFragment on Review {\n  id\n  name\n  rating\n  content\n  email\n  headline\n}"): typeof import('./graphql').ReviewFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewPublishById($id: ID!) {\n  publishReview(where: {id: $id}) {\n    ...ReviewFragment\n  }\n}"): typeof import('./graphql').ReviewPublishByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewsGetByProductId($productId: ID!) {\n  product(where: {id: $productId}) {\n    reviews {\n      ...ReviewFragment\n    }\n  }\n}"): typeof import('./graphql').ReviewsGetByProductIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
