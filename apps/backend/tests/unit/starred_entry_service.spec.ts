import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { EntryFactory } from '#database/factories/entry_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { StarredEntryService } from '#services/starred_entry_service'

test.group('Starred entry service', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns an empty array when the user has no starred entries', async ({ assert }) => {
    const service = new StarredEntryService()
    const user = await UserFactory.create()

    const entries = await service.getStarredEntries(user)

    assert.isEmpty(entries)
  })

  test('returns starred entries ordered by id descending', async ({ assert }) => {
    const service = new StarredEntryService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()
    const entry2 = await EntryFactory.merge({ feedId: feed.id }).create()

    await user.related('starredEntries').create({ entryId: entry1.id })
    await user.related('starredEntries').create({ entryId: entry2.id })

    const entries = await service.getStarredEntries(user)

    assert.lengthOf(entries, 2)
    assert.equal(entries[0].entryId, entry2.id)
    assert.equal(entries[1].entryId, entry1.id)
  })

  test('properly stars entries', async ({ assert }) => {
    const service = new StarredEntryService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()
    const entry2 = await EntryFactory.merge({ feedId: feed.id }).create()

    const inserted = await service.star(user, [entry1.id, entry2.id])
    assert.lengthOf(inserted, 2)

    const entries = await service.getStarredEntries(user)
    assert.lengthOf(entries, 2)
  })

  test('gracefully handles duplicate stars', async ({ assert }) => {
    const service = new StarredEntryService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()

    await service.star(user, [entry1.id])
    await service.star(user, [entry1.id, entry1.id])

    const entries = await service.getStarredEntries(user)

    assert.lengthOf(entries, 1)
  })

  test('properly unstars entries', async ({ assert }) => {
    const service = new StarredEntryService()
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()
    const entry2 = await EntryFactory.merge({ feedId: feed.id }).create()

    await user.related('starredEntries').createMany([{ entryId: entry1.id }, { entryId: entry2.id }])

    await service.unstar(user, [entry1.id])

    const entries = await service.getStarredEntries(user)
    assert.lengthOf(entries, 1)
    assert.equal(entries[0].entryId, entry2.id)
  })
})