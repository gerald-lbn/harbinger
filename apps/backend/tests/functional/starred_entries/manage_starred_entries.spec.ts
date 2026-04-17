import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { EntryFactory } from '#database/factories/entry_factory'

test.group('Manage starred entries', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 OK with array of inserted IDs when starring', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()
    const entry2 = await EntryFactory.merge({ feedId: feed.id }).create()

    const payload = {
      starred_entries: [entry1.id, entry2.id],
    }

    const response = await client.post('/api/v1/starred_entries').json(payload).loginAs(user)

    response.assertStatus(200)
    response.assertBody({ data: [{ entryId: entry1.id }, { entryId: entry2.id }] })
  })

  test('returns 204 No Content when unstarring', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    const entry1 = await EntryFactory.merge({ feedId: feed.id }).create()
    const entry2 = await EntryFactory.merge({ feedId: feed.id }).create()

    await user.related('starredEntries').createMany([{ entryId: entry1.id }, { entryId: entry2.id }])

    const payload = {
      starred_entries: [entry1.id],
    }

    const response = await client.delete('/api/v1/starred_entries').json(payload).loginAs(user)

    response.assertStatus(204)

    // Verify it was deleted
    const listResponse = await client.get('/api/v1/starred_entries').loginAs(user)
    listResponse.assertBody({ data: [{ entryId: entry2.id }] })
  })

  test('returns 422 Unprocessable Entity for invalid inputs', async ({ client }) => {
    const user = await UserFactory.create()

    const payload = {
      starred_entries: ['not-a-number'],
    }

    const response = await client.post('/api/v1/starred_entries').json(payload).loginAs(user)
    response.assertStatus(422)

    const deleteResponse = await client.delete('/api/v1/starred_entries').json(payload).loginAs(user)
    deleteResponse.assertStatus(422)
  })

  test('returns 401 Unauthorized if unauthenticated', async ({ client }) => {
    const response = await client.post('/api/v1/starred_entries').json({ starred_entries: [1] })
    response.assertStatus(401)

    const deleteResponse = await client.delete('/api/v1/starred_entries').json({ starred_entries: [1] })
    deleteResponse.assertStatus(401)
  })
})