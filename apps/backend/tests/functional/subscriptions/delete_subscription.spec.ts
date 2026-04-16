import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import Subscription from '#models/subscription'

test.group('Delete subscription', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 204 when subscription is successfully deleted', async ({ client, assert }) => {
    const user = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const subscription = await user.related('subscriptions').query().firstOrFail()

    const response = await client.delete(`/api/v1/subscriptions/${subscription.id}`).loginAs(user)

    response.assertStatus(204)

    const deletedSubscription = await Subscription.find(subscription.id)
    assert.isNull(deletedSubscription)
  })

  test('returns 404 when trying to delete a subscription belonging to another user', async ({
    client,
    assert,
  }) => {
    const user1 = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const user2 = await UserFactory.create()
    const subscription = await user1.related('subscriptions').query().firstOrFail()

    const response = await client.delete(`/api/v1/subscriptions/${subscription.id}`).loginAs(user2)

    response.assertStatus(404)

    const stillExists = await Subscription.find(subscription.id)
    assert.isNotNull(stillExists)
  })

  test('returns 404 when trying to delete a non-existent subscription', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.delete('/api/v1/subscriptions/9999').loginAs(user)

    response.assertStatus(404)
  })

  test('returns 422 when sending an invalid ID (non-numeric)', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.delete('/api/v1/subscriptions/invalid-id').loginAs(user)

    response.assertStatus(422)
  })

  test('returns 401 when user is not authenticated', async ({ client }) => {
    const response = await client.delete('/api/v1/subscriptions/1')
    response.assertStatus(401)
  })
})
