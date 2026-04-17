import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { EntryFactory } from '#database/factories/entry_factory'

test.group('List recently read entries', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 with an empty array if there are no records', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.get('/api/v1/recently_read_entries').loginAs(user)

    response.assertStatus(200)
    response.assertBody({ data: [] })
  })

  test('returns 200 with array of integers descending', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()
    const entry2 = await EntryFactory.merge({ feedId: feed.id }).create()

    await user.related('recentlyReadEntries').create({ entryId: entry1.id })
    await user.related('recentlyReadEntries').create({ entryId: entry2.id })

    const response = await client.get('/api/v1/recently_read_entries').loginAs(user)

    response.assertStatus(200)
    response.assertBody({ data: [{ entryId: entry2.id }, { entryId: entry1.id }] })
  })

  test('returns 401 if user is not authenticated', async ({ client }) => {
    const response = await client.get('/api/v1/recently_read_entries')

    response.assertStatus(401)
  })
})
