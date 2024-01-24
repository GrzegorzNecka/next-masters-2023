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
    "query CategoriesGetAggregate($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.CategoriesGetAggregateDocument,
    "query CategoriesGetSlugs {\n  categories(first: 10) {\n    id\n    slug\n  }\n}": types.CategoriesGetSlugsDocument,
    "query CollectionsGetList {\n  collections {\n    id\n    name\n    slug\n    description\n    image {\n      url\n      height\n      width\n    }\n  }\n}": types.CollectionsGetListDocument,
    "query CollectionsGetSlugs {\n  collections(first: 10) {\n    id\n    slug\n  }\n}": types.CollectionsGetSlugsDocument,
    "fragment ProductListItem on Product {\n  id\n  slug\n  name\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n}": types.ProductListItemFragmentDoc,
    "query ProductSingleGetBySlug($slug: String!) {\n  products(where: {slug: $slug}, first: 1) {\n    ...ProductListItem\n    description\n  }\n}": types.ProductSingleGetBySlugDocument,
    "query ProductsConnectionGetByCategorySlug($perPage: Int!, $skipPages: Int!, $slug: String!) {\n  productsConnection(\n    where: {categories_some: {slug: $slug}}\n    first: $perPage\n    skip: $skipPages\n    orderBy: publishedAt_ASC\n  ) {\n    edges {\n      cursor\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsConnectionGetByCategorySlugDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 10) {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    name\n    products {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductGetList {\n  products(first: 10) {\n    ...ProductListItem\n  }\n}": types.ProductGetListDocument,
    "query ProductsGetSlugs {\n  products(first: 10) {\n    id\n    slug\n  }\n}": types.ProductsGetSlugsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetAggregate($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').CategoriesGetAggregateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetSlugs {\n  categories(first: 10) {\n    id\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetSlugsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    id\n    name\n    slug\n    description\n    image {\n      url\n      height\n      width\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetSlugs {\n  collections(first: 10) {\n    id\n    slug\n  }\n}"): typeof import('./graphql').CollectionsGetSlugsDocument;
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
export function graphql(source: "query ProductsConnectionGetByCategorySlug($perPage: Int!, $skipPages: Int!, $slug: String!) {\n  productsConnection(\n    where: {categories_some: {slug: $slug}}\n    first: $perPage\n    skip: $skipPages\n    orderBy: publishedAt_ASC\n  ) {\n    edges {\n      cursor\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsConnectionGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 10) {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
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
export function graphql(source: "query ProductsGetSlugs {\n  products(first: 10) {\n    id\n    slug\n  }\n}"): typeof import('./graphql').ProductsGetSlugsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
