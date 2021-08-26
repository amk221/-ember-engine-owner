import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Service from '@ember/service';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    assert.expect(1);

    await visit('/');

    assert
      .dom(this.element)
      .containsText('Host App: Common Service default value');
  });

  test('mocking service', async function (assert) {
    assert.expect(1);

    class MockCommonService extends Service {
      value = 'Common Service mock value';
    }

    this.owner.register('service:common-service', MockCommonService);

    await visit('/');

    assert
      .dom(this.element)
      .containsText('Host App: Common Service mock value');
  });
});
