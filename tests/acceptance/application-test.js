import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Service from '@ember/service';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    assert.expect(2);

    await visit('/');

    assert.dom(this.element).containsText('Host local service: <host>');
    assert.dom(this.element).containsText('Host common service: <common>');
  });

  test('mocking local service', async function (assert) {
    assert.expect(1);

    class MockLocalService extends Service {
      value = 'mocked';
    }

    this.owner.register('service:local-service', MockLocalService);

    await visit('/');

    assert.dom(this.element).containsText('Host local service: <mocked>');
  });

  test('mocking common service', async function (assert) {
    assert.expect(1);

    class MockCommonService extends Service {
      value = 'mocked';
    }

    this.owner.register('service:common-service', MockCommonService);

    await visit('/');

    assert.dom(this.element).containsText('Host common service: <mocked>');
  });
});
