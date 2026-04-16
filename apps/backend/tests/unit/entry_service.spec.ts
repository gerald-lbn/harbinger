import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { EntryFactory } from '#database/factories/entry_factory'
import { EntryService } from '#services/entry_service'
import { DateTime } from 'luxon'

test.group('Entry service', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns an empty array if the user is not subscribed to the feed', async ({ assert }) => {
    const service = new EntryService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await EntryFactory.merge({ feedId: feed.id }).create()

    const entries = await service.getFeedEntries(user, feed.id)

    assert.isEmpty(entries)
  })

  test('returns entries ordered by created_at desc', async ({ assert }) => {
    const service = new EntryService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await user.related('subscriptions').create({ feedId: feed.id, title: 'My Feed' })

    const olderEntry = await EntryFactory.merge({
      feedId: feed.id,
      createdAt: DateTime.now().minus({ days: 2 })
    }).create()

    const newerEntry = await EntryFactory.merge({
      feedId: feed.id,
      createdAt: DateTime.now().minus({ days: 1 })
    }).create()

    const entries = await service.getFeedEntries(user, feed.id)

    assert.lengthOf(entries, 2)
    assert.equal(entries[0].id, newerEntry.id)
    assert.equal(entries[1].id, olderEntry.id)
  })

  test('filters entries created after since parameter', async ({ assert }) => {
    const service = new EntryService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await user.related('subscriptions').create({ feedId: feed.id, title: 'My Feed' })

    const oldDate = DateTime.now().minus({ days: 10 })
    const cutoffDate = DateTime.now().minus({ days: 5 })
    const newDate = DateTime.now().minus({ days: 1 })

    await EntryFactory.merge({ feedId: feed.id, createdAt: oldDate }).create()
    const newerEntry = await EntryFactory.merge({ feedId: feed.id, createdAt: newDate }).create()

    const entries = await service.getFeedEntries(user, feed.id, {
      since: cutoffDate.toJSDate()
    })

    assert.lengthOf(entries, 1)
    assert.equal(entries[0].id, newerEntry.id)
  })

  test('paginates the entries correctly', async ({ assert }) => {
    const service = new EntryService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await user.related('subscriptions').create({ feedId: feed.id, title: 'My Feed' })

    await EntryFactory.merge({ feedId: feed.id }).createMany(5)

    const entries = await service.getFeedEntries(user, feed.id, {
      page: 2,
      perPage: 2
    })

    assert.lengthOf(entries, 2)
  })
})
