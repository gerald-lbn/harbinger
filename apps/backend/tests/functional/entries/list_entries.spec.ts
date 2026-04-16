import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { FeedFactory } from '#database/factories/feed_factory'
import { EntryFactory } from '#database/factories/entry_factory'
import { DateTime } from 'luxon'

test.group('List feed entries', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('returns 200 with an empty list if user is not subscribed', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await EntryFactory.merge({ feedId: feed.id }).create()

    const response = await client.get(`/api/v1/feeds/${feed.id}/entries`).loginAs(user)

    response.assertStatus(200)
    response.assertBody([])
  })

  test('returns 200 with entries ordered by created_at desc', async ({ client }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await user.related('subscriptions').create({ feedId: feed.id, title: 'Test Feed' })

    const olderEntry = await EntryFactory.merge({
      feedId: feed.id,
      createdAt: DateTime.now().minus({ days: 2 })
    }).create()

    const newerEntry = await EntryFactory.merge({
      feedId: feed.id,
      createdAt: DateTime.now().minus({ days: 1 })
    }).create()

    const response = await client.get(`/api/v1/feeds/${feed.id}/entries`).loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains([
      { id: newerEntry.id },
      { id: olderEntry.id },
    ])
  })

  test('returns 200 and correctly filters by since parameter', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await user.related('subscriptions').create({ feedId: feed.id, title: 'Test Feed' })

    const oldDate = DateTime.now().minus({ days: 10 })
    const cutoffDate = DateTime.now().minus({ days: 5 })
    const newDate = DateTime.now().minus({ days: 1 })

    await EntryFactory.merge({ feedId: feed.id, createdAt: oldDate }).create()
    const newerEntry = await EntryFactory.merge({ feedId: feed.id, createdAt: newDate }).create()

    const response = await client
      .get(`/api/v1/feeds/${feed.id}/entries`)
      .qs({ since: cutoffDate.toISO() })
      .loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains([
      { id: newerEntry.id }
    ])

    assert.lengthOf(response.body(), 1)
  })

  test('returns 200 and respects pagination parameters', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const feed = await FeedFactory.create()

    await user.related('subscriptions').create({ feedId: feed.id, title: 'Test Feed' })

    await EntryFactory.merge({ feedId: feed.id }).createMany(5)

    const response = await client
      .get(`/api/v1/feeds/${feed.id}/entries`)
      .qs({ page: 2, per_page: 2 })
      .loginAs(user)

    response.assertStatus(200)

    assert.lengthOf(response.body(), 2)
  })

  test('returns 422 tracking validation errors on empty feed_id', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.get(`/api/v1/feeds/abc/entries`).loginAs(user)

    response.assertStatus(422)
  })

  test('returns 401 when the user is not authenticated', async ({ client }) => {
    const response = await client.get(`/api/v1/feeds/1/entries`)

    response.assertStatus(401)
  })
})
