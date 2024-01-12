import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

// dev: https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clihaom3j03ep01te1dg24yp5/master

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.GRAPHQL_URL,
	documents: "src/graphql/*.graphql",
	ignoreNoDocuments: true,
	generates: {
		"src/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMAsking: { unmaskFunctionName: "getFragmentData" },
			},
			config: {
				useTypeImports: true,
				skipTypename: true,
				documentMode: "string",
				defaultScalarType: "unknown",
				enumAsTypes: true,
			},
			plugins: [],
		},
	},
};

export default config;
