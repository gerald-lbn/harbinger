import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import Subscription from '#models/subscription'

test.group('Update subscription', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 and updates title for a subscription owned by the user', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const subscription = await user.related('subscriptions').query().firstOrFail()
    const newTitle = 'Updated Subscription Title'

    const response = await client
      .patch(`/api/v1/subscriptions/${subscription.id}`)
      .loginAs(user)
      .json({ title: newTitle })

    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        id: subscription.id,
        title: newTitle,
      },
    })

    const updatedSubscription = await Subscription.findOrFail(subscription.id)
    assert.equal(updatedSubscription.title, newTitle)
  })

  test('returns 404 when trying to update a subscription belonging to another user', async ({
    client,
    assert,
  }) => {
    const user1 = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const user2 = await UserFactory.create()
    const subscription = await user1.related('subscriptions').query().firstOrFail()
    const oldTitle = subscription.title

    const response = await client
      .patch(`/api/v1/subscriptions/${subscription.id}`)
      .loginAs(user2)
      .json({ title: 'New Title' })

    response.assertStatus(404)
    const refreshedSubscription = await Subscription.findOrFail(subscription.id)
    assert.equal(refreshedSubscription.title, oldTitle)
  })

  test('returns 422 when providing an invalid title', async ({ client }) => {
    const user = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const subscription = await user.related('subscriptions').query().firstOrFail()

    const response = await client
      .patch(`/api/v1/subscriptions/${subscription.id}`)
      .loginAs(user)
      .json({ title: '' })

    response.assertStatus(422)
  })

  test('returns 422 when not providing a title', async ({ client }) => {
    const user = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const subscription = await user.related('subscriptions').query().firstOrFail()

    const response = await client
      .patch(`/api/v1/subscriptions/${subscription.id}`)
      .loginAs(user)
      .json({})

    response.assertStatus(422)
  })

  test('returns 404 when providing an invalid ID (non-numeric)', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client
      .patch('/api/v1/subscriptions/invalid-id')
      .loginAs(user)
      .json({ title: 'New Title' })

    response.assertStatus(404)
  })

  test('returns 401 when user is not authenticated', async ({ client }) => {
    const response = await client.patch('/api/v1/subscriptions/1').json({ title: 'New Title' })
    response.assertStatus(401)
  })
})
