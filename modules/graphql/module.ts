import { type CodegenConfig, generate } from '@graphql-codegen/cli';
import { addTypeTemplate, createResolver, defineNuxtModule, useLogger } from 'nuxt/kit';

export default defineNuxtModule({
  meta: {
    compatibility: {
      nuxt: '>=3.8.0',
    },
    name: 'gql-types',
  },
  async setup(_, nuxt) {
    const logger = useLogger('gql-types');
    const { resolve } = createResolver(import.meta.url);

    logger.info('Generating graphql schema...');

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
        silent: true,
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

      logger.info('Successfully generated graphql schema');
    } catch (error) {
      logger.error('Failed to generate graphql schema');
    }
  },
});
