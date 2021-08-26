import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Service from '@ember/service';

module('Acceptance | my-engine', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /my-engine', async function (assert) {
    assert.expect(1);

    await visit('/my-engine');

    assert
      .dom(this.element)
      .containsText('My Engine: Common Service default value');
  });

  test('mocking service', async function (assert) {
    assert.expect(1);

    class MockCommonService extends Service {
      value = 'Common Service mock value';
    }

    this.owner.register('service:common-service', MockCommonService);

    await visit('/my-engine');

    assert
      .dom(this.element)
      .containsText('My Engine: Common Service mock value');
  });
});
