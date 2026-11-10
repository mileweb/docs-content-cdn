import assert from 'node:assert/strict';
import { test } from 'node:test';

import { TAG_CONTEXT, forEachTranslatable } from '../scripts/lib/strings.js';

function collect(doc) {
  const found = [];
  forEachTranslatable(doc, ({ pointer, msgid, msgctxt }) => found.push({ pointer, msgid, msgctxt }));
  return found;
}

const doc = {
  info: { title: 'API', description: 'About the API' },
  tags: [{ name: 'Property Management', description: 'Manage properties' }],
  paths: {
    '/cdn/properties': {
      post: {
        summary: 'Create a property',
        tags: ['Property Management'],
        'x-codeSamples': [{ lang: 'bash', label: 'bash', source: 'curl', description: 'not prose' }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                description: 'The property',
                properties: {
                  description: { type: 'string', description: 'Free text about the property' },
                  value: { type: 'integer', description: 'A property named value' },
                  example: { type: 'string', description: 'A property named example' },
                  configs: {
                    type: 'object',
                    default: { description: 'default data' },
                    example: { description: 'example data' },
                    enum: [{ description: 'enum data' }],
                    'x-examples': { one: { description: 'extension data' } },
                  },
                },
                examples: [{ description: 'array examples are data' }],
              },
              examples: {
                'example-1': {
                  summary: 'An example summary',
                  value: { description: 'example payload' },
                },
              },
            },
          },
        },
        responses: {
          description: { description: 'A response map entry named description' },
        },
      },
    },
  },
};

test('collects prose fields and skips sample data', () => {
  const msgids = collect(doc).map((f) => f.msgid);
  assert.deepEqual(msgids, [
    'Property Management',
    'API',
    'About the API',
    'Manage properties',
    'Create a property',
    'The property',
    'Free text about the property',
    'A property named value',
    'A property named example',
    'An example summary',
    'A response map entry named description',
  ]);
});

test('tag names are collected in the tag context, operation tag references are not', () => {
  const tags = collect(doc).filter((f) => f.msgctxt === TAG_CONTEXT);
  assert.deepEqual(tags, [{ pointer: '/tags/0/name', msgid: 'Property Management', msgctxt: TAG_CONTEXT }]);
});

test('pointers escape "/" in path keys', () => {
  const found = collect(doc).find((f) => f.msgid === 'Create a property');
  assert.equal(found.pointer, '/paths/~1cdn~1properties/post/summary');
});
