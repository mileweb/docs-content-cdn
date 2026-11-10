import $RefParser from '@apidevtools/json-schema-ref-parser';

/**
 * Resolves every internal ("#/...") and external ("./models/...") $ref in the YAML entry
 * file and returns the result as the JSON text that is published. x-* fields are kept.
 */
export async function bundleSpec(inputFile) {
  const schema = await $RefParser.dereference(inputFile, {
    dereference: {
      circular: true, // keep $ref at the cycle point instead of failing
    },
  });

  if (!schema || typeof schema !== 'object' || !schema.openapi || !schema.paths) {
    throw new Error('Dereferenced result does not look like an OpenAPI document (missing "openapi" or "paths").');
  }

  const json = `${JSON.stringify(schema, null, 2)}\n`;

  const leftover = json.match(/"\$ref"\s*:\s*"\.[^"]*"/g);
  if (leftover) {
    throw new Error(`${leftover.length} file-relative $ref(s) remain unresolved, e.g. ${leftover.slice(0, 5).join(', ')}`);
  }

  return json;
}
