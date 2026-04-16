import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { SubscriptionService } from '#services/subscription_service'
import Subscription from '#models/subscription'
import { FeedFactory } from '#database/factories/feed_factory'

test.group('Subscription service', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('getUserSubscriptions returns all subscriptions for a user with preloaded feeds', async ({
    assert,
  }) => {
    const service = new SubscriptionService()
    const user = await UserFactory.with('subscriptions', 2, (sub) => sub.with('feed')).create()

    const subscriptions = await service.getUserSubscriptions(user)

    assert.lengthOf(subscriptions, 2)
    assert.isNotNull(subscriptions[0].feed)
    assert.isNotNull(subscriptions[1].feed)
  })

  test('getUserSubscriptionAndFeedById returns a specific subscription for a user', async ({
    assert,
  }) => {
    const service = new SubscriptionService()
    const user = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const subId = user.subscriptions[0].id

    const subscription = await service.getUserSubscriptionAndFeedById(user, subId)

    assert.isNotNull(subscription)
    assert.equal(subscription?.id, subId)
    assert.isNotNull(subscription?.feed)
  })

  test('updateUserSubscriptionTitle updates the title of a subscription', async ({ assert }) => {
    const service = new SubscriptionService()
    const user = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const subId = user.subscriptions[0].id
    const newTitle = 'Brand New Title'

    const updated = await service.updateUserSubscriptionTitle(user, subId, newTitle)

    assert.isNotNull(updated)
    assert.equal(updated?.title, newTitle)

    const refreshed = await Subscription.findOrFail(subId)
    assert.equal(refreshed.title, newTitle)
  })

  test('deleteUserSubscriptionById deletes a subscription and returns true', async ({ assert }) => {
    const service = new SubscriptionService()
    const user = await UserFactory.with('subscriptions', 1, (sub) => sub.with('feed')).create()
    const subId = user.subscriptions[0].id

    const result = await service.deleteUserSubscriptionById(user, subId)

    assert.isTrue(result)
    const deleted = await Subscription.find(subId)
    assert.isNull(deleted)
  })

  test('deleteUserSubscriptionById returns false for non-existent subscription', async ({
    assert,
  }) => {
    const service = new SubscriptionService()
    const user = await UserFactory.create()

    const result = await service.deleteUserSubscriptionById(user, 9999)

    assert.isFalse(result)
  })

  test('subscribe creates a new feed and subscription when none exist', async ({ assert }) => {
    const service = new SubscriptionService()
    const user = await UserFactory.create()
    const option = { feed_url: 'https://new.com/feed', title: 'New Feed' }

    const result = await service.subscribe(user, option)

    assert.equal(result.status, 201)
    if (result.status === 201) {
      assert.equal(result.subscription.title, 'New Feed')
      assert.equal(result.subscription.feed.url, 'https://new.com/feed')
    }
  })

  test('subscribe returns 302 if user is already subscribed', async ({ assert }) => {
    const service = new SubscriptionService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.merge({ url: 'https://existing.com/feed' }).create()
    await user.related('subscriptions').create({ feedId: feed.id, title: 'Existing' })

    const option = { feed_url: feed.url, title: 'Existing' }
    const result = await service.subscribe(user, option)

    assert.equal(result.status, 302)
    if (result.status === 302) {
      assert.equal(result.subscription.feedId, feed.id)
    }
  })
})
