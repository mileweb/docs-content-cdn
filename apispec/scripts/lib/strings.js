/**
 * Finds the human-readable strings of an OpenAPI document, i.e. the ones that are translated.
 *
 * Only `description`, `summary` and `title` fields of OpenAPI objects count. Sample data must
 * stay untouched even when it has a field with one of those names (example payloads contain
 * e.g. `"description": "validPropertyVersionAllFields_PropertySteps"`), so `example`,
 * `examples` arrays, `default`, `enum`, `const`, an Example's `value` and every `x-*` field are
 * skipped. In maps whose keys are names (`properties`, `responses`, ...) the keys are not field
 * names, so a property called `example` or `value` is still a schema to walk into.
 *
 * Tag names are also collected (context TAG_CONTEXT). They are not replaced, because Redoc
 * builds `#tag/<name>` anchors from them; the translation goes into `x-displayName` instead.
 */

export const TAG_CONTEXT = 'tag';

const PROSE_FIELDS = new Set(['description', 'summary', 'title']);
const DATA_FIELDS = new Set(['example', 'default', 'enum', 'const', 'value', 'externalValue']);
const NAME_MAPS = new Set([
  'properties',
  'patternProperties',
  'definitions',
  '$defs',
  'paths',
  'responses',
  'headers',
  'content',
  'encoding',
  'schemas',
  'parameters',
  'requestBodies',
  'securitySchemes',
  'links',
  'callbacks',
  'variables',
  'examples',
]);

function escapePointerToken(token) {
  return String(token).replace(/~/g, '~0').replace(/\//g, '~1');
}

/**
 * Calls visit({ node, field, pointer, msgid, msgctxt }) for every translatable string, in
 * document order. `node[field]` is where the string lives.
 */
export function forEachTranslatable(doc, visit) {
  (doc.tags || []).forEach((tag, i) => {
    if (tag && typeof tag.name === 'string' && tag.name) {
      visit({ node: tag, field: 'name', pointer: `/tags/${i}/name`, msgid: tag.name, msgctxt: TAG_CONTEXT });
    }
  });

  walk(doc, '', false, visit);
}

function walk(node, pointer, isNameMap, visit) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, `${pointer}/${i}`, false, visit));
    return;
  }
  if (!node || typeof node !== 'object') return;

  for (const [key, value] of Object.entries(node)) {
    const childPointer = `${pointer}/${escapePointerToken(key)}`;

    if (isNameMap) {
      walk(value, childPointer, false, visit);
      continue;
    }
    if (key.startsWith('x-') || DATA_FIELDS.has(key)) continue;
    if (key === 'examples' && Array.isArray(value)) continue;

    if (typeof value === 'string') {
      if (PROSE_FIELDS.has(key) && value.trim()) {
        visit({ node, field: key, pointer: childPointer, msgid: value, msgctxt: '' });
      }
      continue;
    }

    walk(value, childPointer, NAME_MAPS.has(key) && !Array.isArray(value), visit);
  }
}
