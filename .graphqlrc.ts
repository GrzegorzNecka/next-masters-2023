import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

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
