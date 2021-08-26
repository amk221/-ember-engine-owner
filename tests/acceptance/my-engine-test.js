import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Service from '@ember/service';

module('Acceptance | my-engine', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /my-engine', async function (assert) {
    assert.expect(2);

    await visit('/my-engine');

    assert.dom(this.element).containsText('Engine local service: <engine>');
    assert.dom(this.element).containsText('Engine common service: <common>');
  });

  test('mocking local service', async function (assert) {
    assert.expect(1);

    class MockLocalService extends Service {
      value = 'mock';
    }

    this.owner.register('service:local-service', MockLocalService);

    await visit('/my-engine');

    assert.dom(this.element).containsText('Engine local service: <mock>');
  });

  test('mocking common service', async function (assert) {
    assert.expect(1);

    class MockCommonService extends Service {
      value = 'mock';
    }

    this.owner.register('service:common-service', MockCommonService);

    await visit('/my-engine');

    assert.dom(this.element).containsText('Engine common service: <mock>');
  });
});
