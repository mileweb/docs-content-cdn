import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

import {
  applyCatalog,
  emptyCatalog,
  entryKey,
  readCatalog,
  serializeCatalog,
  updateCatalog,
} from '../scripts/lib/catalog.js';
import { TAG_CONTEXT } from '../scripts/lib/strings.js';

const spec = (description) => ({
  openapi: '3.0.0',
  info: { title: 'API' },
  tags: [{ name: 'Webhooks' }],
  paths: {
    '/cdn/webhooks': {
      get: {
        tags: ['Webhooks'],
        operationId: 'listWebhooks',
        summary: 'List webhooks',
        description,
      },
    },
  },
});

const translate = (catalog, msgid, msgstr, msgctxt = '') => {
  catalog.entries.get(entryKey(msgctxt, msgid)).msgstr = msgstr;
};

function roundTrip(catalog) {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'apispec-')), 'translations.po');
  fs.writeFileSync(file, serializeCatalog(catalog));
  return readCatalog(file, catalog.language);
}

test('an empty catalog leaves the spec unchanged', () => {
  const doc = spec('Get every webhook of the customer.');
  const catalog = updateCatalog(emptyCatalog('zh'), doc);
  const out = applyCatalog(structuredClone(doc), catalog);
  assert.deepEqual(out, doc);
});

test('translations are applied, tag names go to x-displayName, anchors are untouched', () => {
  const doc = spec('Get every webhook of the customer.');
  const catalog = updateCatalog(emptyCatalog('zh'), doc);
  translate(catalog, 'List webhooks', '列出 webhook');
  translate(catalog, 'Webhooks', 'Webhook 管理', TAG_CONTEXT);

  const out = applyCatalog(structuredClone(doc), roundTrip(catalog));
  const op = out.paths['/cdn/webhooks'].get;
  assert.equal(op.summary, '列出 webhook');
  assert.equal(op.description, 'Get every webhook of the customer.');
  assert.equal(op.operationId, 'listWebhooks');
  assert.deepEqual(op.tags, ['Webhooks']);
  assert.deepEqual(out.tags, [{ name: 'Webhooks', 'x-displayName': 'Webhook 管理' }]);
});

test('changed English text becomes fuzzy and is not used until reviewed', () => {
  const v1 = spec('Get every webhook of the customer.');
  const catalog = updateCatalog(emptyCatalog('zh'), v1);
  translate(catalog, 'Get every webhook of the customer.', '获取客户的所有 webhook。');

  const v2 = spec('Get every webhook of this customer.');
  const updated = roundTrip(updateCatalog(roundTrip(catalog), v2));
  const entry = updated.entries.get(entryKey('', 'Get every webhook of this customer.'));
  assert.equal(entry.fuzzy, true);
  assert.equal(entry.msgstr, '获取客户的所有 webhook。');
  assert.equal(entry.previous, 'msgid "Get every webhook of the customer."');

  const out = applyCatalog(structuredClone(v2), updated);
  assert.equal(out.paths['/cdn/webhooks'].get.description, 'Get every webhook of this customer.');

  assert.ok(updated.obsolete.has(entryKey('', 'Get every webhook of the customer.')));
});

test('unrelated new text starts untranslated', () => {
  const catalog = updateCatalog(emptyCatalog('zh'), spec('Get every webhook of the customer.'));
  translate(catalog, 'Get every webhook of the customer.', '获取客户的所有 webhook。');
  const updated = updateCatalog(catalog, spec('Deprecated. Use the new endpoint instead.'));
  const entry = updated.entries.get(entryKey('', 'Deprecated. Use the new endpoint instead.'));
  assert.equal(entry.msgstr, '');
  assert.equal(entry.fuzzy, false);
});

test('text that comes back gets its old translation back, not fuzzy', () => {
  const v1 = spec('Get every webhook of the customer.');
  const catalog = updateCatalog(emptyCatalog('zh'), v1);
  translate(catalog, 'Get every webhook of the customer.', '获取客户的所有 webhook。');

  const removed = roundTrip(updateCatalog(catalog, spec('Something else entirely, nothing alike.')));
  const restored = updateCatalog(removed, v1);
  const entry = restored.entries.get(entryKey('', 'Get every webhook of the customer.'));
  assert.equal(entry.msgstr, '获取客户的所有 webhook。');
  assert.equal(entry.fuzzy, false);
  assert.equal(restored.obsolete.size, 0);
});

test('serializing is deterministic and survives a parse round trip', () => {
  const doc = spec('Line one.\nLine "two" with \\ backslash.');
  const catalog = updateCatalog(emptyCatalog('zh'), doc);
  translate(catalog, 'Line one.\nLine "two" with \\ backslash.', '第一行。\n第"二"行，含 \\ 反斜杠。');
  const text = serializeCatalog(catalog);
  assert.equal(serializeCatalog(updateCatalog(roundTrip(catalog), doc)), text);
  assert.equal(
    roundTrip(catalog).entries.get(entryKey('', 'Line one.\nLine "two" with \\ backslash.')).msgstr,
    '第一行。\n第"二"行，含 \\ 反斜杠。',
  );
});
