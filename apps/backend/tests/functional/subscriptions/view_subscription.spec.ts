import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'

test.group('View subscription', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 and subscription data for a subscription owned by the user', async ({ client }) => {
    const user = await UserFactory
      .with('subscriptions', 1, (sub) => sub.with('feed'))
      .create()
    const subscription = await user.related('subscriptions').query().firstOrFail()

    const response = await client.get(`/api/v1/subscriptions/${subscription.id}`).loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        id: subscription.id,
        title: subscription.title,
      },
    })
  })

  test('returns 404 when trying to view a subscription belonging to another user', async ({ client }) => {
    const user1 = await UserFactory
      .with('subscriptions', 1, (sub) => sub.with('feed'))
      .create()
    const user2 = await UserFactory.create()
    const subscription = await user1.related('subscriptions').query().firstOrFail()

    const response = await client.get(`/api/v1/subscriptions/${subscription.id}`).loginAs(user2)

    response.assertStatus(404)
  })

  test('returns 404 when trying to view a non-existent subscription', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/subscriptions/9999').loginAs(user)

    response.assertStatus(404)
  })

  test('returns 404 when sending an invalid ID (non-numeric)', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/subscriptions/invalid-id').loginAs(user)

    response.assertStatus(404)
  })

  test('returns 401 when user is not authenticated', async ({ client }) => {
    const response = await client.get('/api/v1/subscriptions/1')
    response.assertStatus(401)
  })
})
