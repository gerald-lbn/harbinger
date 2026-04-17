import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { EntryFactory } from '#database/factories/entry_factory'

test.group('Create recently read entries', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 OK with array of inserted IDs', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()
    const entry2 = await EntryFactory.merge({ feedId: feed.id }).create()

    const payload = {
      recently_read_entries: [entry1.id, entry2.id],
    }

    const response = await client.post('/api/v1/recently_read_entries').json(payload).loginAs(user)

    response.assertStatus(200)
    response.assertBody({ data: [{ entryId: entry1.id }, { entryId: entry2.id }] })
  })

  test('returns 422 Unprocessable Entity for invalid inputs', async ({ client }) => {
    const user = await UserFactory.create()

    const payload = {
      recently_read_entries: ['not-a-number', -1, 0, 1],
    }

    const response = await client.post('/api/v1/recently_read_entries').json(payload).loginAs(user)

    response.assertStatus(422)
  })

  test('handles duplicates safely and returns 200 OK', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()

    await user.related('recentlyReadEntries').create({ entryId: entry1.id })

    const payload = {
      recently_read_entries: [entry1.id, entry1.id],
    }

    const response = await client.post('/api/v1/recently_read_entries').json(payload).loginAs(user)

    response.assertStatus(200)
    response.assertBody({ data: [{ entryId: entry1.id }, { entryId: entry1.id }] })
  })

  test('returns 401 Unauthorized if unauthenticated', async ({ client }) => {
    const payload = {
      recently_read_entries: [1, 2],
    }

    const response = await client.post('/api/v1/recently_read_entries').json(payload)

    response.assertStatus(401)
  })
})
