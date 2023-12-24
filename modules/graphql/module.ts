import { type CodegenConfig, generate } from '@graphql-codegen/cli';
import { addTypeTemplate, createResolver, defineNuxtModule } from 'nuxt/kit';

export default defineNuxtModule({
  meta: {
    compatibility: {
      nuxt: '>=3.8.0',
    },
    name: 'gql-types',
  },
  async setup(_, nuxt) {
    // eslint-disable-next-line no-console
    console.log('[gql-types]: Generating graphql schema for [default] client...');

    const { resolve } = createResolver(import.meta.url);

    try {
      const config: CodegenConfig = {
        generates: {
          'gql.ts': {
            config: {
              avoidOptionals: false,
              documentMode: 'graphql-tag',
              immutableTypes: true,
              maybeValue: 'T | null',
              useTypeImports: true,
              withResultType: true,
            },
            plugins: ['typescript', 'typescript-operations'],
          },
        },
        ignoreNoDocuments: true,
        schema: process.env.NUXT_PUBLIC_API_ORIGIN,
      };

      const schemaGenerated = await generate(config, false);

      let gqlTypes = '';

      addTypeTemplate({
        filename: './types/gql-types.d.ts',
        getContents: () => {
          gqlTypes +=
            '\n' +
            `
              declare module '#gql/types' {
                export namespace ClientDefault {
                  ${schemaGenerated[0].content}
                }
              }
          `;

          if (!gqlTypes.includes('export type GQLResponse')) {
            gqlTypes +=
              '\n' +
              `
                declare module '#gql/types' {
                  export type GraphQLError = {
                    extensions?: {
                      [key: string]: string | string[] | number | number[] | boolean | boolean[] | null;
                    };
                    locations?: {
                      column: number;
                      line: number;
                    }[];
                    message: string;
                    path?: string[];
                  };
                  
                  export type GQLResponse<T extends string, V, E = unknown> = { data: { [K in T]: V }; errors?: GraphQLError };
                }
            `;
          }

          return gqlTypes;
        },
      });

      nuxt.options.alias['#gql/types'] = resolve(nuxt.options.buildDir, 'types/gql-types');

      // eslint-disable-next-line no-console
      console.log('[gql/types]: Successfully generated graphql schema for [default] client');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[gql/types]: Failed to generate graphql schema for [default] client');
    }
  },
});
