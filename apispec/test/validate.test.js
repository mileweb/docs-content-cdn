import assert from 'node:assert/strict';
import { test } from 'node:test';

import { validateTranslation } from '../scripts/lib/validate.js';

test('a faithful translation passes', () => {
  const msgid =
    'Get <b>{propertyId}</b> from https://ngapi.{{siteDomain}}. See [deployments](</docs/portal/deploy>) ' +
    'and <a href="#operation/getDeployment">this API</a>. Use `version` or <code>latest</code>.';
  const msgstr =
    '从 https://ngapi.{{siteDomain}} 获取 <b>{propertyId}</b>。参见[部署](</docs/portal/deploy>)' +
    '和<a href="#operation/getDeployment">此 API</a>。使用 `version` 或 <code>latest</code>。';
  assert.deepEqual(validateTranslation(msgid, msgstr), []);
});

test('reordering inline tags is allowed', () => {
  assert.deepEqual(validateTranslation('<b>A</b> then <i>B</i>', '<i>乙</i>然后<b>甲</b>'), []);
});

for (const [name, msgid, msgstr, expected] of [
  ['placeholder', 'Call ngapi.{{siteDomain}}', '调用 ngapi.{{域名}}', /missing placeholder: \{\{siteDomain\}\}/],
  ['path parameter', 'The {propertyId} field', '属性 ID 字段', /missing path parameter: \{propertyId\}/],
  ['HTML tag', '<p>One</p><p>Two</p>', '<p>一</p>二', /missing HTML tag: <p, <\/p/],
  ['href', '<a href="#tag/Webhooks">Webhooks</a>', '<a href="#tag/网络钩子">Webhook</a>', /missing href/],
  ['link target', 'See [here](</docs/faq>)', '见[此处](</zh/docs/faq>)', /missing markdown link target/],
  ['code', 'Set <code>enabled</code>', '设置 <code>启用</code>', /missing <code> content/],
  ['backtick code', 'Set `enabled`', '设置 `启用`', /missing backtick code/],
]) {
  test(`a changed ${name} fails`, () => {
    const problems = validateTranslation(msgid, msgstr);
    assert.ok(problems.some((p) => expected.test(p)), problems.join('; '));
  });
}
